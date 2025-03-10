import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </Router>
  )
}

export default App
