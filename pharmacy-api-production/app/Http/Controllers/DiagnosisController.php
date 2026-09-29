<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\RouteAttributes\Attributes\Delete;
use Spatie\RouteAttributes\Attributes\Get;
use Spatie\RouteAttributes\Attributes\Post;
use Spatie\RouteAttributes\Attributes\Prefix;
use Spatie\RouteAttributes\Attributes\Middleware;

/**
 * @OA\Tag(
 *     name="Diagnoses",
 *     description="Quản lý lịch sử chẩn đoán sức khỏe của AI Chatbot"
 * )
 */
#[Prefix(prefix: "v1/admin/diagnoses")]
#[Middleware(middleware: "jwt.auth")]
class DiagnosisController extends Controller
{
    #[Get(uri: "/", name: "admin.diagnoses.index")]
    /**
     * @OA\Get(
     *     path="/v1/admin/diagnoses",
     *     operationId="getDiagnosisList",
     *     tags={"Diagnoses"},
     *     summary="Lấy danh sách chẩn đoán",
     *     description="Trả về danh sách tất cả các chẩn đoán sức khỏe, hỗ trợ tìm kiếm và phân trang",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Từ khóa tìm kiếm theo triệu chứng (symptoms) hoặc tên chẩn đoán (diagnosis_name)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="Lọc theo ID người dùng",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Số lượng bản ghi trên mỗi trang",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(type="object")),
     *             @OA\Property(property="message", type="string", example="Lấy danh sách chẩn đoán thành công"),
     *             @OA\Property(property="status", type="integer", example=200)
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $userId = $request->query('user_id');
        $perPage = $request->query('per_page', 10);

        $query = Diagnosis::query();

        if ($userId) {
            $query->where('user_id', $userId);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('human.symptoms', 'like', "%{$search}%")
                  ->orWhere('ai.primary_diagnosis.diagnosis_name', 'like', "%{$search}%");
            });
        }

        $diagnoses = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return $this->json($diagnoses, 'Lấy danh sách chẩn đoán thành công');
    }

    #[Post(uri: "/", name: "admin.diagnoses.store")]
    /**
     * @OA\Post(
     *     path="/v1/admin/diagnoses",
     *     operationId="storeDiagnosis",
     *     tags={"Diagnoses"},
     *     summary="Lưu chẩn đoán mới",
     *     description="Lưu trữ kết quả chẩn đoán sức khỏe mới từ AI Chatbot",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "human", "ai"},
     *             @OA\Property(property="user_id", type="string", example="68431c3cc1f7e38b780d0dc6"),
     *             @OA\Property(property="human", type="object",
     *                 @OA\Property(property="symptoms", type="string", example="đau đầu"),
     *                 @OA\Property(property="patient_age", type="integer", example=25),
     *                 @OA\Property(property="patient_gender", type="string", example="Nam")
     *             ),
     *             @OA\Property(property="ai", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Đã tạo thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object"),
     *             @OA\Property(property="message", type="string", example="Lưu chẩn đoán thành công"),
     *             @OA\Property(property="status", type="integer", example=201)
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string',
            'human' => 'required|array',
            'human.symptoms' => 'required|string',
            'human.patient_age' => 'required|integer',
            'human.patient_gender' => 'required|string',
            'ai' => 'required|array',
            'ai.primary_diagnosis' => 'required|array',
            'ai.primary_diagnosis.diagnosis_name' => 'required|string',
            'ai.primary_diagnosis.confidence_percentage' => 'required',
            'ai.primary_diagnosis.description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->fail($validator->errors(), 'Dữ liệu không hợp lệ', 422);
        }

        $diagnosis = Diagnosis::create([
            'user_id' => $request->input('user_id'),
            'human' => $request->input('human'),
            'ai' => $request->input('ai'),
        ]);

        return $this->json($diagnosis, 'Lưu chẩn đoán thành công', 201);
    }

    #[Get(uri: "/{id}", name: "admin.diagnoses.show")]
    /**
     * @OA\Get(
     *     path="/v1/admin/diagnoses/{id}",
     *     operationId="getDiagnosisDetail",
     *     tags={"Diagnoses"},
     *     summary="Xem chi tiết chẩn đoán",
     *     description="Trả về thông tin chi tiết của một bản chẩn đoán theo ID",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID của chẩn đoán",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object"),
     *             @OA\Property(property="message", type="string", example="Lấy chi tiết chẩn đoán thành công"),
     *             @OA\Property(property="status", type="integer", example=200)
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Không tìm thấy",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Không tìm thấy bản chẩn đoán"),
     *             @OA\Property(property="status", type="integer", example=404)
     *         )
     *     )
     * )
     */
    public function show($id)
    {
        $diagnosis = Diagnosis::find($id);

        if (!$diagnosis) {
            return $this->fail(null, 'Không tìm thấy bản chẩn đoán', 404);
        }

        return $this->json($diagnosis, 'Lấy chi tiết chẩn đoán thành công');
    }

    #[Delete(uri: "/{id}", name: "admin.diagnoses.destroy")]
    /**
     * @OA\Delete(
     *     path="/v1/admin/diagnoses/{id}",
     *     operationId="deleteDiagnosis",
     *     tags={"Diagnoses"},
     *     summary="Xóa bản ghi chẩn đoán",
     *     description="Xóa mềm một bản ghi chẩn đoán sức khỏe theo ID",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID của chẩn đoán cần xóa",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Xóa bản chẩn đoán thành công"),
     *             @OA\Property(property="status", type="integer", example=200)
     *         )
     *     )
     * )
     */
    public function destroy($id)
    {
        $diagnosis = Diagnosis::find($id);

        if (!$diagnosis) {
            return $this->fail(null, 'Không tìm thấy bản chẩn đoán để xóa', 404);
        }

        $diagnosis->delete();

        return $this->json(null, 'Xóa bản chẩn đoán thành công');
    }
}
