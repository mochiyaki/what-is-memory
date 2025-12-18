import React, { useState } from 'react'

interface Memory {
  id: string;
  content: string;
  timestamp: string;
  type: string;
  tags: string[];
  source: string;
}

const MemoryManagement: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: '1',
      content: 'User authentication setup',
      timestamp: '2023-05-15T10:30:00Z',
      type: 'Process',
      tags: ['auth', 'security'],
      source: 'login-flow'
    },
    {
      id: '2',
      content: 'API endpoint documentation',
      timestamp: '2023-05-14T14:15:00Z',
      type: 'Documentation',
      tags: ['api', 'docs'],
      source: 'api-docs'
    }
  ])

  const [newMemory, setNewMemory] = useState({
    content: '',
    type: 'Process',
    tags: '',
    source: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewMemory(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const memory: Memory = {
      id: Date.now().toString(),
      content: newMemory.content,
      timestamp: new Date().toISOString(),
      type: newMemory.type,
      tags: newMemory.tags.split(',').map(tag => tag.trim()),
      source: newMemory.source
    }

    setMemories(prev => [...prev, memory])
    setNewMemory({
      content: '',
      type: 'Process',
      tags: '',
      source: ''
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Memory Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Memory Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Memory</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={newMemory.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={newMemory.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Process">Process</option>
                <option value="Documentation">Documentation</option>
                <option value="Knowledge">Knowledge</option>
                <option value="Task">Task</option>
                <option value="Decision">Decision</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={newMemory.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., auth, security, api"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source">
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={newMemory.source}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., login-flow, api-docs"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Memory
            </button>
          </form>
        </div>

        {/* Memory List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Memory List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {memories.map((memory) => (
                  <tr key={memory.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{memory.content.substring(0, 50)}...</div>
                      <div className="text-sm text-gray-500">Tags: {memory.tags.join(', ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {memory.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryManagement