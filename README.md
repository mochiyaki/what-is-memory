# What is Memory?

## Project Overview

This project implements a memory management system for AI agents that allows them to store, retrieve, and organize information in a structured way. The system uses Neo4j as the graph database for semantic relationships and integrates with MemMachine API plugin for enhanced memory operations.

![banner](banner.webp)

## System Architecture

### Frontend
- Built with TypeScript using Vite React framework
- Styled with Tailwind CSS
- Provides UI for managing AI agent memories
- Real-time visualization of memory graphs

### Backend
- Python-based REST API
- Neo4j graph database integration
- MemMachine API plugin integration
- Memory management services

## Key Features

1. **Memory Storage**
   - Structured storage of agent memories
   - Semantic relationships between memories
   - Timestamped entries for temporal organization

2. **Memory Retrieval**
   - Query-based memory search
   - Semantic similarity matching
   - Context-aware retrieval mechanisms

3. **Memory Organization**
   - Graph-based memory structure
   - Relationship mapping between concepts
   - Memory categorization and tagging

4. **Integration with MemMachine**
   - API plugin for enhanced memory operations
   - Seamless integration with existing memory systems
   - Extended functionality through plugin architecture

## Technical Stack

### Frontend
- TypeScript 5.x
- React 18+
- Vite 5+
- Tailwind CSS 3+
- React Router 6+

### Backend
- Python 3.9+
- FastAPI 0.100+
- Neo4j Driver for Python
- MemMachine API Plugin

## Project Structure

```
what-is-memory/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   ├── services/         # API service clients
│   │   └── types/            # TypeScript type definitions
│   ├── public/
│   └── vite.config.ts        # Vite configuration
├── backend/                  # Python backend services
│   ├── app/                  # Main application modules
│   │   ├── api/              # API endpoints
│   │   ├── models/           # Data models
│   │   ├── services/         # Business logic
│   │   └── database/         # Database integration
│   ├── requirements.txt      # Python dependencies
│   └── main.py               # Application entry point
├── docs/                     # Documentation
└── README.md                 # This file
```

## Implementation Plan

### Phase 1: Setup and Configuration
- Initialize Vite React frontend with TypeScript and Tailwind CSS
- Set up Python backend with FastAPI
- Configure Neo4j database connection
- Integrate MemMachine API plugin

### Phase 2: Core Memory Management
- Implement memory storage services
- Create data models for memories
- Build graph structure for semantic relationships
- Develop basic CRUD operations

### Phase 3: Retrieval and Search
- Implement query-based search functionality
- Add semantic similarity matching
- Create context-aware retrieval system
- Build memory visualization tools

### Phase 4: Integration and Enhancement
- Complete MemMachine API plugin integration
- Add advanced memory organization features
- Implement user interface for memory management
- Add testing and documentation

## Database Schema

### Memory Node
```cypher
(:Memory {
  id: string,
  content: string,
  timestamp: datetime,
  type: string,
  tags: [string],
  source: string
})
```

### Relationships
- (:Memory)-[:RELATED_TO]->(:Memory)
- (:Memory)-[:MENTIONS]->(:Entity)
- (:Memory)-[:ABOUT]->(:Topic)

## API Endpoints

### Memory Management
- `POST /memories` - Create new memory
- `GET /memories` - List memories
- `GET /memories/{id}` - Get specific memory
- `PUT /memories/{id}` - Update memory
- `DELETE /memories/{id}` - Delete memory

### Search and Query
- `POST /memories/search` - Search memories by query
- `POST /memories/similar` - Find similar memories
- `GET /memories/related/{id}` - Get related memories

## Future Enhancements

1. Memory consolidation and pruning
2. Advanced semantic analysis using NLP
3. Multi-agent memory sharing
4. Memory versioning and history tracking
5. Integration with external knowledge bases
6. AI agent training using stored memories

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License
