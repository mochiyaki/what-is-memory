import pytest
from app.models.memory import Memory
from datetime import datetime

def test_memory_model():
    """Test that the Memory model works correctly"""
    # Create a sample memory
    memory = Memory(
        content="This is a test memory",
        timestamp=datetime.utcnow(),
        type="test",
        tags=["test", "memory"],
        source="test-source"
    )

    # Verify the memory properties
    assert memory.content == "This is a test memory"
    assert memory.type == "test"
    assert memory.tags == ["test", "memory"]
    assert memory.source == "test-source"

def test_memory_model_with_metadata():
    """Test that the Memory model works with metadata"""
    # Create a sample memory with metadata
    memory = Memory(
        content="This is a test memory with metadata",
        timestamp=datetime.utcnow(),
        type="test",
        tags=["test", "memory"],
        source="test-source",
        metadata={"key": "value", "number": 42}
    )

    # Verify the memory properties
    assert memory.content == "This is a test memory with metadata"
    assert memory.metadata == {"key": "value", "number": 42}