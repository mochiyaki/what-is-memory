import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MemoryManagement from './pages/MemoryManagement'
import Search from './pages/Search'
import Visualization from './pages/Visualization'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/memories" element={<MemoryManagement />} />
              <Route path="/search" element={<Search />} />
              <Route path="/visualization" element={<Visualization />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App