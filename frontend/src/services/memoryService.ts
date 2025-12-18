import { Memory, MemoryFormData } from '../types/memory'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const memoryService = {
  // Get all memories
  async getMemories(filters?: any): Promise<Memory[]> {
    try {
      let url = `${API_BASE_URL}/memories`

      if (filters) {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, String(value))
        })
        url += `?${params.toString()}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching memories:', error)
      throw error
    }
  },

  // Get a specific memory by ID
  async getMemory(id: string): Promise<Memory> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/${id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching memory:', error)
      throw error
    }
  },

  // Create a new memory
  async createMemory(data: MemoryFormData): Promise<Memory> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating memory:', error)
      throw error
    }
  },

  // Update an existing memory
  async updateMemory(id: string, data: MemoryFormData): Promise<Memory> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating memory:', error)
      throw error
    }
  },

  // Delete a memory
  async deleteMemory(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error deleting memory:', error)
      throw error
    }
  },

  // Search memories
  async searchMemories(query: string, filters?: any): Promise<Memory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, ...filters }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error searching memories:', error)
      throw error
    }
  },

  // Find similar memories
  async findSimilarMemories(id: string, limit?: number): Promise<Memory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/similar/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error finding similar memories:', error)
      throw error
    }
  },

  // Get related memories
  async getRelatedMemories(id: string): Promise<Memory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/memories/related/${id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching related memories:', error)
      throw error
    }
  },
}