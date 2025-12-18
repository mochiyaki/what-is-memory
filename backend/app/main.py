from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import memory_routes
import os

# Initialize the FastAPI application
app = FastAPI(
    title="AI Agent Memory Management System",
    description="A system for managing memories of AI agents with Neo4j integration",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(memory_routes.router, prefix="/api/v1/memories", tags=["memories"])

@app.get("/")
async def root():
    return {"message": "AI Agent Memory Management System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}