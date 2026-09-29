<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Supplier;
use App\Models\Medicine;
use App\Services\EmbeddingService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class MedicineSeeder extends Seeder
{
    private EmbeddingService $embeddingService;

    public function __construct()
    {
        $this->embeddingService = new EmbeddingService();
    }

    public function run(): void
    {
        // 1. Seed Suppliers
        $suppliers = [
            [
                'name' => 'Dược Hậu Giang (DHG)',
                'address' => '288 Nguyễn Văn Cừ, Quận Ninh Kiều, Cần Thơ',
                'contact_phone' => '02923891433',
                'contact_email' => 'dhgpharma@dhgpharma.com.vn',
            ],
            [
                'name' => 'Traphaco',
                'address' => '75 Yên Ninh, Quận Ba Đình, Hà Nội',
                'contact_phone' => '18006612',
                'contact_email' => 'info@traphaco.com.vn',
            ],
            [
                'name' => 'Sanofi Việt Nam',
                'address' => '10 Hàm Nghi, Quận 1, TP. Hồ Chí Minh',
                'contact_phone' => '02838298526',
                'contact_email' => 'vietnam.communication@sanofi.com',
            ],
            [
                'name' => 'AstraZeneca Việt Nam',
                'address' => 'Tòa nhà Ngôi Nhà Đức, 33 Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
                'contact_phone' => '02838276600',
                'contact_email' => 'contact@astrazeneca.com',
            ],
            [
                'name' => 'Dược phẩm OPC',
                'address' => '1017 Hồng Bàng, Quận 6, TP. Hồ Chí Minh',
                'contact_phone' => '1800555518',
                'contact_email' => 'info@opcpharma.com',
            ]
        ];

        $supplierIds = [];
        foreach ($suppliers as $sup) {
            $created = Supplier::create($sup);
            $supplierIds[$sup['name']] = $created->id;
        }

        // 2. Seed Categories
        $categories = [
            [
                'title' => 'Thuốc không kê đơn',
                'slug' => 'thuoc-khong-ke-don',
                'description' => 'Các loại thuốc có thể tự mua sử dụng không cần đơn thuốc của bác sĩ',
                'is_active' => true,
            ],
            [
                'title' => 'Thuốc kê đơn',
                'slug' => 'thuoc-ke-don',
                'description' => 'Các loại thuốc bắt buộc phải có đơn thuốc của bác sĩ chuyên khoa',
                'is_active' => true,
            ],
            [
                'title' => 'Thực phẩm chức năng',
                'slug' => 'thuc-pham-chuc-nang',
                'description' => 'Sản phẩm hỗ trợ sức khỏe, bổ sung dinh dưỡng và nâng cao đề kháng',
                'is_active' => true,
            ],
            [
                'title' => 'Dược mỹ phẩm',
                'slug' => 'duoc-my-pham',
                'description' => 'Sản phẩm chăm sóc da và cơ thể kết hợp tính dược lý trị liệu',
                'is_active' => true,
            ]
        ];

        $categoryIds = [];
        foreach ($categories as $cat) {
            $created = Category::create($cat);
            $categoryIds[$cat['title']] = $created->id;
        }

        // 3. Seed Medicines
        $medicines = [
            // Category: Thuốc không kê đơn
            [
                'name' => 'Panadol Extra với Optizorb',
                'description' => 'Giúp hạ sốt và giảm đau hiệu quả các cơn đau nhẹ đến trung bình như đau đầu, đau nửa đầu, đau cơ, đau răng, đau họng.',
                'category_name' => 'Thuốc không kê đơn',
                'supplier_name' => 'Dược Hậu Giang (DHG)',
                'price' => 135000,
                'unit' => 'Hộp',
                'ingredients' => 'Paracetamol 500mg, Caffeine 65mg',
                'usage' => ['Hạ sốt', 'Giảm đau đầu', 'Giảm đau cơ', 'Đau răng'],
                'origin' => 'Anh',
                'packaging' => 'Hộp 15 vỉ x 12 viên',
                'dosage_adult' => 'Uống 1-2 viên mỗi 4 đến 6 giờ khi cần thiết. Không dùng quá 8 viên một ngày.',
                'dosage_child' => 'Không dùng cho trẻ em dưới 12 tuổi.',
                'directions' => ['Uống sau khi ăn', 'Uống nhiều nước'],
                'precautions' => ['Không dùng chung với các thuốc chứa paracetamol khác', 'Không uống bia rượu trong thời gian dùng thuốc'],
            ],
            [
                'name' => 'Siro Ho Prospan',
                'description' => 'Siro ho thảo dược chiết xuất từ lá thường xuân, giúp long đờm, giãn phế quản, giảm ho hiệu quả cho trẻ em và người lớn.',
                'category_name' => 'Thuốc không kê đơn',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 85000,
                'unit' => 'Chai',
                'ingredients' => 'Chiết xuất khô lá thường xuân 0.7g/100ml',
                'usage' => ['Trị ho đờm', 'Viêm phế quản', 'Giảm ngứa họng'],
                'origin' => 'Đức',
                'packaging' => 'Chai 100ml',
                'dosage_adult' => 'Uống 5 - 7.5ml mỗi lần, ngày 3 lần.',
                'dosage_child' => 'Trẻ từ 6 - 11 tuổi: uống 5ml mỗi lần, ngày 2 lần. Trẻ từ 1 - 5 tuổi: uống 2.5ml mỗi lần, ngày 2 lần.',
                'directions' => ['Lắc kỹ chai trước khi dùng', 'Dùng cốc đong kèm theo để chia liều'],
                'precautions' => ['Chống chỉ định cho người mẫn cảm với lá thường xuân', 'Phụ nữ có thai cần tham khảo ý kiến bác sĩ'],
            ],
            [
                'name' => 'Hapacol 250 Hộp 24 gói',
                'description' => 'Thuốc bột sủi bọt hạ sốt nhanh, giảm đau hiệu quả cho trẻ em với hương cam thơm ngọt dễ uống.',
                'category_name' => 'Thuốc không kê đơn',
                'supplier_name' => 'Dược Hậu Giang (DHG)',
                'price' => 48000,
                'unit' => 'Hộp',
                'ingredients' => 'Paracetamol 250mg',
                'usage' => ['Hạ sốt trẻ em', 'Giảm đau mọc răng', 'Đau sau tiêm chủng'],
                'origin' => 'Việt Nam',
                'packaging' => 'Hộp 24 gói',
                'dosage_adult' => 'Không áp dụng cho người lớn.',
                'dosage_child' => 'Uống 1 gói/lần, khoảng cách giữa các lần uống từ 4-6 giờ. Liều lượng tính theo cân nặng của trẻ (10-15mg/kg).',
                'directions' => ['Hòa tan bột thuốc trong lượng nước vừa phải', 'Uống ngay sau khi sủi hết bọt'],
                'precautions' => ['Không dùng quá 5 lần/ngày cho trẻ', 'Thận trọng với trẻ suy thận nặng'],
            ],
            [
                'name' => 'Gaviscon Dual Action Hộp 24 gói',
                'description' => 'Hỗn dịch uống tác động kép giúp giảm nhanh các triệu chứng ợ nóng, ợ chua và trào ngược dạ dày thực quản.',
                'category_name' => 'Thuốc không kê đơn',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 180000,
                'unit' => 'Hộp',
                'ingredients' => 'Natri alginate 500mg, Natri bicarbonate 267mg, Calci carbonate 160mg',
                'usage' => ['Trào ngược dạ dày', 'Ợ nóng', 'Ợ chua', 'Khó tiêu'],
                'origin' => 'Anh',
                'packaging' => 'Hộp 24 gói x 10ml',
                'dosage_adult' => 'Uống 1-2 gói sau bữa ăn và trước khi đi ngủ, tối đa 4 lần/ngày.',
                'dosage_child' => 'Trẻ em từ 12 tuổi trở lên dùng liều như người lớn. Trẻ em dưới 12 tuổi cần có chỉ định của bác sĩ.',
                'directions' => ['Lắc đều gói thuốc trước khi uống', 'Uống trực tiếp từ gói'],
                'precautions' => ['Người ăn kiêng muối cần lưu ý hàm lượng Natri', 'Uống cách các thuốc khác khoảng 2 giờ'],
            ],
            [
                'name' => 'Decolgen Forte Hộp 100 viên',
                'description' => 'Thuốc giảm đau, hạ sốt, điều trị hiệu quả các triệu chứng cảm cúm, nghẹt mũi, sổ mũi, hắt hơi.',
                'category_name' => 'Thuốc không kê đơn',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 120000,
                'unit' => 'Hộp',
                'ingredients' => 'Paracetamol 500mg, Phenylephrine HCl 10mg, Chlorpheniramine maleate 2mg',
                'usage' => ['Trị cảm cúm', 'Giảm nghẹt mũi', 'Trị sổ mũi', 'Hắt hơi liên tục'],
                'origin' => 'Việt Nam',
                'packaging' => 'Hộp 25 vỉ x 4 viên',
                'dosage_adult' => 'Uống 1-2 viên/lần, ngày 3-4 lần.',
                'dosage_child' => 'Trẻ em 7-12 tuổi: uống 1/2 đến 1 viên/lần, ngày 3-4 lần.',
                'directions' => ['Uống sau bữa ăn với một cốc nước'],
                'precautions' => ['Thuốc gây buồn ngủ, không dùng khi lái xe hoặc vận hành máy móc', 'Tránh dùng chung rượu bia'],
            ],

            // Category: Thuốc kê đơn
            [
                'name' => 'Nexium Mups 20mg',
                'description' => 'Thuốc ức chế bơm proton giúp giảm tiết acid dịch vị dạ dày, điều trị trào ngược dạ dày thực quản (GERD), viêm loét dạ dày tá tràng.',
                'category_name' => 'Thuốc kê đơn',
                'supplier_name' => 'AstraZeneca Việt Nam',
                'price' => 360000,
                'unit' => 'Hộp',
                'ingredients' => 'Esomeprazole magnesium trihydrate 20mg',
                'usage' => ['Trào ngược dạ dày', 'Viêm loét dạ dày', 'Diệt vi khuẩn HP', 'Phòng ngừa loét dạ dày do NSAID'],
                'origin' => 'Thụy Điển',
                'packaging' => 'Hộp 2 vỉ x 7 viên',
                'dosage_adult' => 'Uống 1-2 viên/ngày tùy theo chỉ định điều trị của bác sĩ.',
                'dosage_child' => 'Cần có sự chỉ định và tính liều nghiêm ngặt từ bác sĩ nhi khoa.',
                'directions' => ['Nuốt nguyên viên thuốc với nước', 'Không nhai hoặc nghiền nát viên mups', 'Uống ít nhất 1 giờ trước bữa ăn'],
                'precautions' => ['Cần loại trừ khả năng ung thư dạ dày trước khi dùng', 'Dùng kéo dài có thể gây giảm hấp thu Magie và Vitamin B12'],
            ],
            [
                'name' => 'Augmentin 1g Hộp 14 viên',
                'description' => 'Kháng sinh phổ rộng điều trị các nhiễm khuẩn đường hô hấp trên và dưới, đường tiết niệu, da và mô mềm.',
                'category_name' => 'Thuốc kê đơn',
                'supplier_name' => 'AstraZeneca Việt Nam',
                'price' => 280000,
                'unit' => 'Hộp',
                'ingredients' => 'Amoxicillin 875mg, Clavulanic acid 125mg',
                'usage' => ['Viêm họng', 'Viêm tai giữa', 'Viêm xoang', 'Nhiễm trùng da'],
                'origin' => 'Pháp',
                'packaging' => 'Hộp 2 vỉ x 7 viên',
                'dosage_adult' => 'Uống 1 viên/lần, ngày 2 lần đối với nhiễm khuẩn nặng.',
                'dosage_child' => 'Không khuyên dùng cho trẻ em dưới 12 tuổi với hàm lượng này.',
                'directions' => ['Uống vào đầu bữa ăn để giảm thiểu tác dụng phụ trên tiêu hóa'],
                'precautions' => ['Chống chỉ định đối với người có tiền sử dị ứng kháng sinh nhóm Penicillin', 'Cần tuân thủ uống đủ liều bác sĩ kê đơn'],
            ],
            [
                'name' => 'Telfast HD 180mg Hộp 10 viên',
                'description' => 'Thuốc kháng histamin thế hệ mới, điều trị hiệu quả viêm mũi dị ứng, hắt hơi, chảy nước mũi và mề đay vô căn mãn tính ở người lớn.',
                'category_name' => 'Thuốc kê đơn',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 95000,
                'unit' => 'Hộp',
                'ingredients' => 'Fexofenadine hydrochloride 180mg',
                'usage' => ['Viêm mũi dị ứng', 'Trị mề đay', 'Giảm ngứa da', 'Giảm hắt hơi'],
                'origin' => 'Ý',
                'packaging' => 'Hộp 1 vỉ x 10 viên',
                'dosage_adult' => 'Uống 1 viên duy nhất mỗi ngày.',
                'dosage_child' => 'Không dùng cho trẻ em dưới 12 tuổi.',
                'directions' => ['Uống thuốc với nước lọc trước bữa ăn', 'Không uống chung với nước hoa quả'],
                'precautions' => ['Thận trọng với người suy thận hoặc người cao tuổi', 'Ngưng dùng thuốc trước khi làm test dị ứng ít nhất 48 giờ'],
            ],
            [
                'name' => 'Singulair 10mg Hộp 28 viên',
                'description' => 'Thuốc đối kháng thụ thể leukotriene giúp dự phòng và điều trị hen phế quản mạn tính, giảm triệu chứng viêm mũi dị ứng.',
                'category_name' => 'Thuốc kê đơn',
                'supplier_name' => 'AstraZeneca Việt Nam',
                'price' => 450000,
                'unit' => 'Hộp',
                'ingredients' => 'Montelukast sodium 10mg',
                'usage' => ['Dự phòng hen phế quản', 'Giảm viêm mũi dị ứng', 'Co thắt phế quản do gắng sức'],
                'origin' => 'Anh',
                'packaging' => 'Hộp 28 viên',
                'dosage_adult' => 'Uống 1 viên duy nhất vào buổi tối trước khi đi ngủ.',
                'dosage_child' => 'Dành cho trẻ trên 15 tuổi và người lớn. Trẻ em nhỏ hơn cần dùng dạng viên nhai 4mg hoặc 5mg.',
                'directions' => ['Uống thuốc vào một giờ cố định mỗi ngày, lúc no hoặc đói'],
                'precautions' => ['Không dùng để cắt cơn hen cấp tính', 'Cần theo dõi các biểu hiện tâm thần kinh hiếm gặp ở bệnh nhân'],
            ],

            // Category: Thực phẩm chức năng
            [
                'name' => 'Viên uống bổ gan Boganic Forte',
                'description' => 'Thực phẩm bảo vệ sức khỏe chiết xuất từ thảo dược giúp bổ gan, giải độc gan, tăng cường chức năng gan hiệu quả cho người uống bia rượu nhiều.',
                'category_name' => 'Thực phẩm chức năng',
                'supplier_name' => 'Traphaco',
                'price' => 95000,
                'unit' => 'Hộp',
                'ingredients' => 'Cao đặc Actisô 85mg, Cao đặc Rau đắng đất 75mg, Cao đặc Bìm bìm 8.5mg',
                'usage' => ['Bổ gan', 'Giải độc gan', 'Tăng cường chức năng gan', 'Trị mụn nhọt do nóng gan'],
                'origin' => 'Việt Nam',
                'packaging' => 'Hộp 5 vỉ x 10 viên nang mềm',
                'dosage_adult' => 'Uống 1 - 2 viên/lần, ngày 3 lần.',
                'dosage_child' => 'Trẻ em trên 8 tuổi: Uống 1 viên/lần, ngày 2 lần.',
                'directions' => ['Uống sau bữa ăn với nhiều nước'],
                'precautions' => ['Chống chỉ định đối với người tắc mật, phụ nữ có thai', 'Sản phẩm này không phải là thuốc và không thay thế thuốc chữa bệnh'],
            ],
            [
                'name' => 'Hoạt Huyết Dưỡng Não Traphaco',
                'description' => 'Hỗ trợ điều trị suy giảm trí nhớ, đau đầu, chóng mặt, mất ngủ, tê bì chân tay do thiểu năng tuần hoàn não.',
                'category_name' => 'Thực phẩm chức năng',
                'supplier_name' => 'Traphaco',
                'price' => 98000,
                'unit' => 'Hộp',
                'ingredients' => 'Cao đặc rễ Đinh lăng 150mg, Cao khô lá Bạch quả 20mg',
                'usage' => ['Tăng tuần hoàn não', 'Trị đau đầu chóng mặt', 'Hỗ trợ giấc ngủ', 'Cải thiện trí nhớ'],
                'origin' => 'Việt Nam',
                'packaging' => 'Hộp 5 vỉ x 20 viên bao đường',
                'dosage_adult' => 'Uống 2-3 viên/lần, ngày 2-3 lần.',
                'dosage_child' => 'Trẻ em: Uống 1 viên/lần, ngày 2-3 lần.',
                'directions' => ['Uống thuốc sau bữa ăn'],
                'precautions' => ['Người rối loạn đông máu, đang chảy máu cấp tính không tự ý sử dụng', 'Không dùng cho phụ nữ có thai'],
            ],
            [
                'name' => 'Viên sủi Berocca Performance',
                'description' => 'Viên sủi bổ sung các vitamin nhóm B, Vitamin C, Canxi, Magie và Kẽm giúp giảm mệt mỏi, tỉnh táo tinh thần và tăng cường đề kháng.',
                'category_name' => 'Thực phẩm chức năng',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 82000,
                'unit' => 'Tuýp',
                'ingredients' => 'Vitamin C 500mg, Vitamin nhóm B, Canxi 100mg, Magie 100mg, Kẽm 10mg',
                'usage' => ['Bổ sung vitamin', 'Giảm mệt mỏi thể chất', 'Tăng tỉnh táo tinh thần', 'Tăng đề kháng'],
                'origin' => 'Indonesia',
                'packaging' => 'Tuýp 10 viên sủi vị cam',
                'dosage_adult' => 'Uống 1 viên/ngày.',
                'dosage_child' => 'Không khuyên dùng cho trẻ em dưới 12 tuổi trừ khi có hướng dẫn của y tế.',
                'directions' => ['Hòa tan viên sủi trong một cốc nước lọc (khoảng 200ml)', 'Uống ngay sau khi tan hết'],
                'precautions' => ['Không dùng cho người suy thận nặng hoặc sỏi thận', 'Hạn chế uống vào buổi tối để tránh gây khó ngủ'],
            ],
            [
                'name' => 'Dầu tỏi đen tía đông trùng hạ thảo OPC',
                'description' => 'Hỗ trợ tăng cường sức đề kháng, giảm nguy cơ viêm đường hô hấp trên do đề kháng kém, giảm cholesterol máu.',
                'category_name' => 'Thực phẩm chức năng',
                'supplier_name' => 'Dược phẩm OPC',
                'price' => 150000,
                'unit' => 'Hộp',
                'ingredients' => 'Dầu tỏi tía 100mg, Tỏi đen 50mg, Đông trùng hạ thảo 10mg',
                'usage' => ['Tăng đề kháng', 'Giảm đầy hơi trướng bụng', 'Giảm mỡ máu'],
                'origin' => 'Việt Nam',
                'packaging' => 'Hộp 60 viên nang mềm',
                'dosage_adult' => 'Uống 2 viên/lần, ngày 2 lần.',
                'dosage_child' => 'Trẻ em trên 6 tuổi: Uống 1 viên/lần, ngày 2 lần.',
                'directions' => ['Uống trước hoặc trong bữa ăn'],
                'precautions' => ['Không dùng cho người chuẩn bị phẫu thuật', 'Ngưng dùng nếu gặp hiện tượng kích ứng dạ dày'],
            ],

            // Category: Dược mỹ phẩm
            [
                'name' => 'Sữa rửa mặt Cetaphil Gentle Skin Cleanser',
                'description' => 'Sữa rửa mặt dịu nhẹ, lành tính, không chứa xà phòng hay hương liệu, bảo vệ độ ẩm tự nhiên của da, phù hợp cho da nhạy cảm nhất.',
                'category_name' => 'Dược mỹ phẩm',
                'supplier_name' => 'Sanofi Việt Nam',
                'price' => 310000,
                'unit' => 'Chai',
                'ingredients' => 'Nước tinh khiết, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate, Stearyl Alcohol',
                'usage' => ['Làm sạch da mặt', 'Dưỡng ẩm nhẹ nhàng', 'Làm dịu da mẩn đỏ'],
                'origin' => 'Canada',
                'packaging' => 'Chai 500ml',
                'dosage_adult' => 'Sử dụng hàng ngày vào buổi sáng và tối.',
                'dosage_child' => 'Có thể dùng làm sạch da dịu nhẹ cho em bé.',
                'directions' => ['Cách dùng khô: Thoa lên da và massage nhẹ sau đó lau sạch bằng bông tẩy trang', 'Cách dùng với nước: Thoa lên da, massage nhẹ rồi rửa lại sạch bằng nước ấm'],
                'precautions' => ['Tránh tiếp xúc trực tiếp vào mắt'],
            ]
        ];

        // Create medicines in database
        foreach ($medicines as $med) {
            $catId = $categoryIds[$med['category_name']];
            $supId = $supplierIds[$med['supplier_name']];
            $slug = Str::slug($med['name']);

            $newMed = Medicine::create([
                'category_id' => $catId,
                'supplier_id' => $supId,
                'name' => $med['name'],
                'slug' => $slug,
                'thumbnail' => [
                    'url' => 'https://res.cloudinary.com/dqcgz2r2u/image/upload/v1700000000/pharmacity/' . $slug . '.jpg',
                    'public_id' => 'pharmacity/' . $slug,
                ],
                'description' => $med['description'],
                'variants' => [
                    'price' => $med['price'],
                    'original_price' => $med['price'],
                    'discount_percent' => 0,
                    'quantity' => 100,
                    'limit_quantity' => 5,
                    'stock_status' => 'IN-STOCK',
                    'is_featured' => true,
                    'is_active' => true,
                    'unit' => $med['unit'],
                ],
                'ratings' => [
                    'star' => 4.8,
                    'review_count' => 5,
                    'liked' => 12,
                ],
                'details' => [
                    'ingredients' => $med['ingredients'],
                    'usage' => $med['usage'],
                    'paramaters' => [
                        'origin' => $med['origin'],
                        'packaging' => $med['packaging'],
                    ],
                ],
                'usageguide' => [
                    'dosage' => [
                        'adult' => $med['dosage_adult'],
                        'child' => $med['dosage_child'],
                    ],
                    'directions' => $med['directions'],
                    'precautions' => $med['precautions'],
                ],
            ]);

            // Embed medicine (calls Python embedding service API)
            Log::info("Triggering embedding call for seeded medicine: " . $newMed->name);
            $this->embeddingService->embedMedicine($newMed->id);
        }
    }
}
