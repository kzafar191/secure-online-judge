import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Workspace from './Workspace'
import AddProblem from './AddProblem'
import Profile from './Profile'
import Leaderboard from './Leaderboard'

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      {/* 🍞 ADD TOASTER COMPONENT */}
      <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      <div>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard handleLogout={handleLogout} />} />
            <Route path="/problem/:id" element={<Workspace />} />
            <Route path="/add-problem" element={<AddProblem />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} /> {/* <-- ADD ROUTE */}
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App