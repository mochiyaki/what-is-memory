import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="mt-6">
        <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
          Navigation
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/memories"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="ml-3">Memory Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="ml-3">Search</span>
            </Link>
          </li>
          <li>
            <Link
              to="/visualization"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="ml-3">Visualization</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar