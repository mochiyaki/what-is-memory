import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">AI Agent Memory Management</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header