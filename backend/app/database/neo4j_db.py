from neo4j import GraphDatabase
import os
from typing import Dict, Any, List
from datetime import datetime

class Neo4jDB:
    """Neo4j database connector for memory management"""

    def __init__(self, uri: str, user: str, password: str):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        """Close the database connection"""
        self.driver.close()

    def create_memory_node(self, memory_data: Dict[str, Any]) -> str:
        """Create a new memory node in Neo4j"""
        query = """
        CREATE (m:Memory {
            id: $id,
            content: $content,
            timestamp: $timestamp,
            type: $type,
            tags: $tags,
            source: $source,
            metadata: $metadata
        })
        RETURN m.id as id
        """

        with self.driver.session() as session:
            result = session.run(query, **memory_data)
            return result.single()["id"]

    def get_memory_by_id(self, memory_id: str) -> Dict[str, Any]:
        """Retrieve a memory by its ID"""
        query = """
        MATCH (m:Memory {id: $id})
        RETURN m
        """

        with self.driver.session() as session:
            result = session.run(query, id=memory_id)
            record = result.single()
            return dict(record["m"]) if record else None

    def get_all_memories(self) -> List[Dict[str, Any]]:
        """Retrieve all memories"""
        query = """
        MATCH (m:Memory)
        RETURN m
        ORDER BY m.timestamp DESC
        """

        with self.driver.session() as session:
            result = session.run(query)
            return [dict(record["m"]) for record in result]

    def update_memory(self, memory_id: str, memory_data: Dict[str, Any]) -> bool:
        """Update an existing memory"""
        query = """
        MATCH (m:Memory {id: $id})
        SET m.content = $content,
            m.timestamp = $timestamp,
            m.type = $type,
            m.tags = $tags,
            m.source = $source,
            m.metadata = $metadata
        RETURN m
        """

        with self.driver.session() as session:
            result = session.run(query, id=memory_id, **memory_data)
            return result.single() is not None

    def delete_memory(self, memory_id: str) -> bool:
        """Delete a memory by ID"""
        query = """
        MATCH (m:Memory {id: $id})
        DELETE m
        RETURN count(m) as deleted_count
        """

        with self.driver.session() as session:
            result = session.run(query, id=memory_id)
            return result.single()["deleted_count"] > 0

    def search_memories(self, query_text: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Search memories by content"""
        # This is a simplified search - in practice you'd use full-text indexing
        search_query = """
        MATCH (m:Memory)
        WHERE m.content CONTAINS $query_text OR
              any(tag IN m.tags WHERE tag CONTAINS $query_text)
        RETURN m
        ORDER BY m.timestamp DESC
        LIMIT $limit
        """

        with self.driver.session() as session:
            result = session.run(search_query, query_text=query_text, limit=limit)
            return [dict(record["m"]) for record in result]

    def get_related_memories(self, memory_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Get memories related to a specific memory"""
        # This is a simplified relationship query
        relationship_query = """
        MATCH (m1:Memory {id: $id})-[:RELATED_TO]->(m2:Memory)
        RETURN m2
        ORDER BY m2.timestamp DESC
        LIMIT $limit
        """

        with self.driver.session() as session:
            result = session.run(relationship_query, id=memory_id, limit=limit)
            return [dict(record["m2"]) for record in result]