from typing import List, Dict, Any
from datetime import datetime
from app.models.memory import Memory
from app.database.neo4j_db import Neo4jDB

class MemoryService:
    """Service layer for memory management operations"""

    def __init__(self, db: Neo4jDB):
        self.db = db

    def create_memory(self, memory_data: Dict[str, Any]) -> Memory:
        """Create a new memory"""
        # Add ID and timestamp if not present
        if "id" not in memory_data:
            import uuid
            memory_data["id"] = str(uuid.uuid4())

        if "timestamp" not in memory_data:
            memory_data["timestamp"] = datetime.utcnow()

        # Create the memory node in Neo4j
        memory_id = self.db.create_memory_node(memory_data)

        # Return the created memory object
        return Memory(
            id=memory_id,
            content=memory_data["content"],
            timestamp=memory_data["timestamp"],
            type=memory_data["type"],
            tags=memory_data["tags"],
            source=memory_data["source"],
            metadata=memory_data.get("metadata", {})
        )

    def get_memory_by_id(self, memory_id: str) -> Memory:
        """Retrieve a memory by its ID"""
        memory_data = self.db.get_memory_by_id(memory_id)
        if memory_data:
            return Memory(**memory_data)
        return None

    def get_all_memories(self) -> List[Memory]:
        """Retrieve all memories"""
        memories_data = self.db.get_all_memories()
        return [Memory(**memory_data) for memory_data in memories_data]

    def update_memory(self, memory_id: str, memory_data: Dict[str, Any]) -> Memory:
        """Update an existing memory"""
        # Update timestamp if not provided
        if "timestamp" not in memory_data:
            memory_data["timestamp"] = datetime.utcnow()

        # Update the memory in Neo4j
        success = self.db.update_memory(memory_id, memory_data)

        if success:
            # Return the updated memory
            return self.get_memory_by_id(memory_id)
        return None

    def delete_memory(self, memory_id: str) -> bool:
        """Delete a memory by ID"""
        return self.db.delete_memory(memory_id)

    def search_memories(self, query_text: str, limit: int = 10) -> List[Memory]:
        """Search memories by content"""
        memories_data = self.db.search_memories(query_text, limit)
        return [Memory(**memory_data) for memory_data in memories_data]

    def get_related_memories(self, memory_id: str, limit: int = 5) -> List[Memory]:
        """Get memories related to a specific memory"""
        memories_data = self.db.get_related_memories(memory_id, limit)
        return [Memory(**memory_data) for memory_data in memories_data]