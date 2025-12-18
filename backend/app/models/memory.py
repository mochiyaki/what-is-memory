from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class Memory(BaseModel):
    """Data model for AI agent memories"""
    id: Optional[str] = None
    content: str
    timestamp: datetime
    type: str
    tags: List[str]
    source: str
    metadata: Optional[Dict[str, Any]] = None

    class Config:
        # Allow arbitrary types
        arbitrary_types_allowed = True