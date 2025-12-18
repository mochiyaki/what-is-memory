from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime
from app.models.memory import Memory
from app.services.memory_service import MemoryService
from app.database.neo4j_db import Neo4jDB
import os

# Initialize router
router = APIRouter()

# Database connection dependency
def get_db():
    """Dependency to get database connection"""
    # In production, use proper environment variables and connection pooling
    uri = os.getenv("NEO4J_URI", "neo4j://localhost:7687")
    user = os.getenv("NEO4J_USER", "neo4j")
    password = os.getenv("NEO4J_PASSWORD", "password")

    db = Neo4jDB(uri, user, password)
    try:
        yield db
    finally:
        db.close()

# Memory service dependency
def get_memory_service(db: Neo4jDB = Depends(get_db)):
    """Dependency to get memory service"""
    yield MemoryService(db)

@router.post("/", response_model=Memory)
async def create_memory(
    memory_data: Memory,
    service: MemoryService = Depends(get_memory_service)
):
    """Create a new memory"""
    try:
        # Ensure timestamp is set
        if not memory_data.timestamp:
            memory_data.timestamp = datetime.utcnow()

        # Convert to dict for database operation
        memory_dict = memory_data.dict()
        created_memory = service.create_memory(memory_dict)
        return created_memory
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating memory: {str(e)}")

@router.get("/", response_model=List[Memory])
async def get_memories(
    service: MemoryService = Depends(get_memory_service)
):
    """Get all memories"""
    try:
        memories = service.get_all_memories()
        return memories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving memories: {str(e)}")

@router.get("/{memory_id}", response_model=Memory)
async def get_memory(
    memory_id: str,
    service: MemoryService = Depends(get_memory_service)
):
    """Get a specific memory by ID"""
    try:
        memory = service.get_memory_by_id(memory_id)
        if not memory:
            raise HTTPException(status_code=404, detail="Memory not found")
        return memory
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving memory: {str(e)}")

@router.put("/{memory_id}", response_model=Memory)
async def update_memory(
    memory_id: str,
    memory_data: Memory,
    service: MemoryService = Depends(get_memory_service)
):
    """Update an existing memory"""
    try:
        # Ensure timestamp is set
        if not memory_data.timestamp:
            memory_data.timestamp = datetime.utcnow()

        # Convert to dict for database operation
        memory_dict = memory_data.dict()
        updated_memory = service.update_memory(memory_id, memory_dict)

        if not updated_memory:
            raise HTTPException(status_code=404, detail="Memory not found")

        return updated_memory
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating memory: {str(e)}")

@router.delete("/{memory_id}")
async def delete_memory(
    memory_id: str,
    service: MemoryService = Depends(get_memory_service)
):
    """Delete a memory by ID"""
    try:
        success = service.delete_memory(memory_id)
        if not success:
            raise HTTPException(status_code=404, detail="Memory not found")
        return {"message": "Memory deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting memory: {str(e)}")

@router.post("/search", response_model=List[Memory])
async def search_memories(
    query_text: str,
    limit: int = 10,
    service: MemoryService = Depends(get_memory_service)
):
    """Search memories by content"""
    try:
        memories = service.search_memories(query_text, limit)
        return memories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching memories: {str(e)}")

@router.get("/related/{memory_id}", response_model=List[Memory])
async def get_related_memories(
    memory_id: str,
    limit: int = 5,
    service: MemoryService = Depends(get_memory_service)
):
    """Get memories related to a specific memory"""
    try:
        memories = service.get_related_memories(memory_id, limit)
        return memories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving related memories: {str(e)}")