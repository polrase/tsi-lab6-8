import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/about" element={<About />} />
          <Route path = "/contact" element={<Contact />} />
          <Route path = "/register" element={<Register />} />
          <Route path = "/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
