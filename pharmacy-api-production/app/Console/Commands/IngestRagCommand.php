<?php

namespace App\Console\Commands;

use App\Models\KnowledgeBase;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class IngestRagCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:ingest-rag {--fresh : Xóa dữ liệu cũ trước khi nạp} {--mock : Giả lập vector embedding ngẫu nhiên}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Đọc các tài liệu y tế ở thư mục database/input, sinh vector embedding qua Gemini API và lưu vào MongoDB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiKey = env('GEMINI_API_KEY');
        if (!$this->option('mock') && !$apiKey) {
            $this->error('Lỗi: Chưa cấu hình GEMINI_API_KEY trong file .env');
            return Command::FAILURE;
        }

        if ($this->option('fresh')) {
            $this->info('Đang xóa dữ liệu cũ trong collection knowledge_base...');
            KnowledgeBase::truncate();
        }

        $inputPath = database_path('input');
        if (!File::isDirectory($inputPath)) {
            $this->error("Lỗi: Không tìm thấy thư mục đầu vào tại {$inputPath}");
            return Command::FAILURE;
        }

        $files = File::files($inputPath);
        $txtFiles = array_filter($files, function ($file) {
            return $file->getExtension() === 'txt';
        });

        $totalFiles = count($txtFiles);
        if ($totalFiles === 0) {
            $this->warn('Không tìm thấy tài liệu .txt nào trong thư mục database/input.');
            return Command::SUCCESS;
        }

        $this->info("Tìm thấy {$totalFiles} tài liệu y học. Bắt đầu sinh embedding và nạp vào database...");
        $bar = $this->output->createProgressBar($totalFiles);
        $bar->start();

        $successCount = 0;
        $failCount = 0;

        foreach ($txtFiles as $file) {
            $filename = $file->getFilename();
            $content = File::get($file->getRealPath());

            // Làm sạch khoảng trắng dư thừa
            $contentClean = trim(preg_replace('/\s+/', ' ', $content));

            if (empty($contentClean)) {
                $this->warn("\nBỏ qua file trống: {$filename}");
                $bar->advance();
                continue;
            }

            try {
                if ($this->option('mock')) {
                    $embedding = [];
                    for ($i = 0; $i < 768; $i++) {
                        $embedding[] = (rand(-1000, 1000) / 1000.0);
                    }

                    KnowledgeBase::create([
                        'filename' => $filename,
                        'content' => $contentClean,
                        'embedding' => $embedding,
                    ]);
                    $successCount++;
                    $bar->advance();
                    continue;
                }

                // Gọi Gemini Text Embedding API
                $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key={$apiKey}";
                $response = Http::timeout(15)
                    ->withHeaders(['Content-Type' => 'application/json'])
                    ->post($apiUrl, [
                        'model' => 'models/gemini-embedding-001',
                        'content' => [
                            'parts' => [
                                ['text' => $contentClean]
                            ]
                        ]
                    ]);

                if ($response->successful()) {
                    $embedding = $response->json('embedding.values');

                    if (is_array($embedding) && count($embedding) > 0) {
                        KnowledgeBase::create([
                            'filename' => $filename,
                            'content' => $contentClean,
                            'embedding' => $embedding,
                        ]);
                        $successCount++;
                    } else {
                        $failCount++;
                        \Log::error("Ingest RAG error: Response for {$filename} did not contain valid embedding structure.");
                    }
                } else {
                    $failCount++;
                    \Log::error("Ingest RAG API error for {$filename}: Status {$response->status()} - {$response->body()}");
                }
            } catch (\Exception $e) {
                $failCount++;
                \Log::error("Ingest RAG exception for {$filename}: " . $e->getMessage());
            }

            $bar->advance();
            // Delay nhỏ để tránh vượt quá rate limit của API Gemini
            usleep(150000); // 150ms
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("Hoàn tất nạp dữ liệu!");
        $this->comment("- Thành công: {$successCount}/{$totalFiles}");
        if ($failCount > 0) {
            $this->error("- Thất bại: {$failCount}/{$totalFiles} (Kiểm tra storage/logs/laravel.log để xem chi tiết)");
        }

        return Command::SUCCESS;
    }
}
