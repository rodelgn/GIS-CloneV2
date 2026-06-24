import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const SESSION_STORAGE_KEY = 'gis-demo-session-user';

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = window.localStorage.getItem(SESSION_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = Boolean(currentUser);

  const handleLogin = (user) => {
    setCurrentUser(user);
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  }

  const handleLogout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
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

export default App;
