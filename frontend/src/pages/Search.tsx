import React, { useState } from 'react'

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSearchResults([
        {
          id: '1',
          content: 'User authentication setup with JWT tokens',
          timestamp: '2023-05-15T10:30:00Z',
          type: 'Process',
          tags: ['auth', 'security', 'jwt'],
          source: 'login-flow'
        },
        {
          id: '2',
          content: 'API endpoint documentation for user management',
          timestamp: '2023-05-14T14:15:00Z',
          type: 'Documentation',
          tags: ['api', 'docs', 'user'],
          source: 'api-docs'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Memory Search</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Filters</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Process</option>
                <option>Documentation</option>
                <option>Knowledge</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                placeholder="Enter tags..."
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{result.content}</h3>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {result.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">Tags: {result.tags.join(', ')}</p>
                <p className="mt-1 text-sm text-gray-500">Source: {result.source}</p>
                <p className="mt-1 text-sm text-gray-500">Created: {new Date(result.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Enter a search query to find memories</p>
        </div>
      )}
    </div>
  )
}

export default Search