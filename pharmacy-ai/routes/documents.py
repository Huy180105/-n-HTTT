from pathlib import Path

from fastapi import APIRouter

from utils.http_response import fail, json

router = APIRouter()

INPUT_DIR = Path("/app/database/input")
ALLOWED_EXTENSIONS = {".txt", ".json", ".csv"}


@router.get("/input-files", response_description="List input files")
async def list_input_files(limit: int = None):
    """
    Trả về toàn bộ tài liệu đầu vào để n8n có thể xử lý qua HTTP
    mà không cần quyền đọc file trực tiếp trong workflow.
    """
    try:
        if not INPUT_DIR.exists():
            return fail(
                message="Không tìm thấy thư mục input tài liệu",
                status=404,
                errors=f"Missing input directory: {INPUT_DIR}",
            )

        documents = []
        count = 0
        for file_path in sorted(INPUT_DIR.iterdir()):
            if limit is not None and count >= limit:
                break
            if not file_path.is_file():
                continue
            if file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
                continue

            content = file_path.read_text(encoding="utf-8", errors="ignore").strip()
            if not content:
                continue

            documents.append(
                {
                    "filename": file_path.name,
                    "filepath": str(file_path),
                    "content": content,
                }
            )
            count += 1

        return json(
            data=documents,
            message="Lấy danh sách tài liệu đầu vào thành công",
            status=200,
        )
    except Exception as e:
        return fail(
            message="Không thể đọc tài liệu đầu vào",
            status=500,
            errors=str(e),
        )
