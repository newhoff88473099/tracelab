"""
TraceLab AI — FastAPI AI Microservice
Phase 4 deliverable stub — skeleton only.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TraceLab AI Service",
    description="AI-powered OCR, visual identification, and defect detection for TraceLab.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "tracelab-ai"}


# Phase 4: routes will be added here
# from app.routes import identify, ocr, detect_fault, suggest_classification
# app.include_router(identify.router, prefix="/ai")
# app.include_router(ocr.router, prefix="/ai")
# app.include_router(detect_fault.router, prefix="/ai")
# app.include_router(suggest_classification.router, prefix="/ai")
