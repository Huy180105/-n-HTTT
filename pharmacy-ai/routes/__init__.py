from fastapi import APIRouter

from .documents import router as DocumentsRouter
from .consultation import router as ConsultationRouter
from .medicine import router as MedicineRouter
from .embed import router as EmbedRouter

router = APIRouter()

router.include_router(DocumentsRouter, tags=["Documents"], prefix="/documents")
router.include_router(ConsultationRouter, tags=["Consultation"], prefix="/consultation")
router.include_router(MedicineRouter, tags=["Medicine"], prefix="/medicine")
router.include_router(EmbedRouter, tags=["Embed"], prefix="/embed")
