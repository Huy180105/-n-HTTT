# 💊 Long Châu Pharmacy Management & AI Consultation System
> **Hệ thống Quản lý Nhà thuốc & Tư vấn Dược phẩm AI Trực tuyến**

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-47A248.svg)](https://www.mongodb.com/)
[![Milvus](https://img.shields.io/badge/Milvus-Vector_DB-00A4E4.svg)](https://milvus.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

---

## 📌 Giới thiệu dự án

Dự án **Hệ thống Quản lý Nhà thuốc Long Châu** kết hợp **Trợ lý AI Tư vấn Dược phẩm** là giải pháp toàn diện bao gồm thương mại điện tử dược phẩm, quản trị nhà thuốc đạt chuẩn GPP và hệ thống AI RAG (Retrieval-Augmented Generation) giúp tư vấn sử dụng thuốc an toàn, tra cứu liều dùng và tác dụng phụ chính xác dựa trên cơ sở dữ liệu y tế.

---

## 🏗️ Kiến trúc Hệ thống (System Architecture)

```text
                               ┌─────────────────────────┐
                               │     Khách hàng / User   │
                               └────────────┬────────────┘
                                            │
                               ┌────────────▼────────────┐
                               │     pharmacy-store      │  (Port 8082 / 5173)
                               │   (React / Vite Store)  │
                               └────────────┬────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           │                                │                                │
┌──────────▼──────────┐          ┌──────────▼──────────┐          ┌──────────▼──────────┐
│    pharmacy-api     │          │     pharmacy-ai     │          │    n8n Workflows    │
│  (Backend API Service)│          │ (FastAPI / RAG Core)│          │ (Automated Pipelines│
└──────────┬──────────┘          └──────────┬──────────┘          └──────────┬──────────┘
           │                                │                                │
┌──────────▼──────────┐          ┌──────────▼──────────┐                     │
│       MongoDB       │          │  Milvus Vector DB   │◄────────────────────┘
│ (User/Order Data)   │          │(Medicine Embeddings)│
└─────────────────────┘          └─────────────────────┘
```

---

## 🚀 Các Phân hệ & Thư mục Dự án

| Thư mục | Phân hệ | Công nghệ | Chức năng chính |
| :--- | :--- | :--- | :--- |
| `pharmacy-store/` | **Giao diện Khách hàng** | React, Vite, Tailwind CSS, Shadcn UI | Đặt mua thuốc, xem thông tin dược phẩm, tra cứu giỏ hàng, tư vấn AI. |
| `pharmacy-admin/` | **Trang Quản trị Nhà thuốc** | React, Next.js / Vite, TypeScript | Quản lý kho thuốc, duyệt đơn thuốc kê đơn (Rx), nhà cung cấp, báo cáo doanh thu. |
| `pharmacy-ai/` | **AI Backend Service** | Python, FastAPI, Milvus, Groq, Gemini | Xử lý RAG, Vector Search, tư vấn dược phẩm tự động, kiểm tra tương tác thuốc. |
| `n8n-workflows/` | **Tự động hóa Quy trình** | n8n, Gemini API | Tự động ingest dữ liệu thuốc, trích xuất embedding và đồng bộ vector DB. |
| `data/` | **Dữ liệu Dược phẩm** | CSV, JSON, Vector Embeddings | Chứa bộ dữ liệu chuẩn hóa thuốc Long Châu và các vector nhúng (embeddings). |

---

## ✨ Tính năng Nổi bật

### 🛒 1. Khách hàng (Pharmacy Store)
- **Tìm kiếm & Lọc thuốc:** Tra cứu dược phẩm theo tên, danh mục, công dụng hoặc đối tượng sử dụng.
- **Giỏ hàng & Đặt hàng:** Đặt hàng trực tuyến, áp dụng mã giảm giá, lựa chọn hình thức giao hàng và thanh toán (COD/Chuyển khoản).
- **Tải đơn thuốc kê đơn:** Tải ảnh chụp đơn thuốc bác sĩ để Dược sĩ nhà thuốc duyệt và chuẩn bị đơn hàng.

### 🤖 2. Trợ lý AI Tư vấn Dược phẩm (AI Pharmacist RAG)
- **Tư vấn Liều dùng & Công dụng:** Trả lời tự động các thắc mắc về cách dùng thuốc, chống chỉ định dựa trên dữ liệu y khoa chuẩn.
- **RAG & Vector Search:** Tìm kiếm ngữ nghĩa bằng Milvus Vector DB kết hợp LLM (Groq / Gemini) cho phản hồi chính xác, không hallucinate.

### 📋 3. Quản trị Nhà thuốc (Pharma Admin)
- **Thẩm định Đơn thuốc:** Dược sĩ chuyên môn xem ảnh đơn thuốc và phê duyệt/từ chối trước khi xuất kho.
- **Quản lý Kho & Hạn dùng:** Theo dõi số lượng tồn, số lô sản xuất và cảnh báo thuốc sắp hết hạn sử dụng.
- **Quản lý Nhà cung cấp:** Lưu trữ hồ sơ đối tác, mã số thuế, giấy phép GPP/GDP.
- **Báo cáo Doanh thu:** Thống kê doanh số theo ngày/tháng, sản phẩm bán chạy, xuất báo cáo Excel/PDF.

---

## 🛠️ Hướng dẫn Cài đặt & Chạy Dự án

### 📋 Yêu cầu hệ thống:
- **Node.js** (v18 trở lên)
- **Python** (v3.10 trở lên)
- **Docker & Docker Compose**

---

### 1️⃣ Clone Dự án & Cấu hình Môi trường

```bash
git clone https://github.com/Huy180105/-n-HTTT.git
cd -n-HTTT
```

Tạo file `.env` từ file mẫu `.env.example`:

```bash
cp .env.example .env
```

Điền các API Key của bạn vào file `.env`:
```env
MONGODB_DATABASE=pharmacy_api_v2
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
COHERE_API_KEY=your_cohere_api_key_here
MILVUS_URI=http://localhost:19530
```

---

### 2️⃣ Khởi chạy bằng Docker Compose (Khuyên dùng)

Chạy tất cả các dịch vụ (MongoDB, AI Service, Store, Admin, n8n) chỉ với 1 câu lệnh:

```bash
docker-compose up -d
```

Sau khi khởi chạy thành công, truy cập các địa chỉ tương ứng:

- 🛒 **Cửa hàng Thuốc (Pharmacy Store):** `http://localhost:8082` (hoặc `http://localhost:5173`)
- ⚙️ **Trang Quản trị (Pharmacy Admin):** `http://localhost:8081`
- 🤖 **AI Backend API (FastAPI Docs):** `http://localhost:5001/docs`
- ⚡ **n8n Automation:** `http://localhost:5678`
- 🍃 **MongoDB Database:** `mongodb://localhost:27017`

---

### 3️⃣ Chạy từng phân hệ thủ công (Local Development)

#### 🔹 1. Chạy AI Backend (`pharmacy-ai`):
```bash
cd pharmacy-ai
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --port 5001
```

#### 🔹 2. Chạy Cửa hàng Frontend (`pharmacy-store`):
```bash
cd pharmacy-store
npm install
npm run dev
```

#### 🔹 3. Chạy Trang Quản trị (`pharmacy-admin`):
```bash
cd pharmacy-admin
npm install
npm run dev
```

---

## 📄 Giấy phép & Tác giả

- **Đồ án môn học / Dự án:** Hệ thống Thông tin Quản lý Nhà thuốc Long Châu
- **Tác giả:** Huy180105
- **Giấy phép:** MIT License
