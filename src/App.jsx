import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn? <Navigate to = "/home" replace /> : <LoginPage onLogin={handleLogin} /> } />
        <Route path="/home" element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" replace /> } />
      </Routes>
    </Router>
  )
}

export default App