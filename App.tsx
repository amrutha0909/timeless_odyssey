import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <div>Dashboard (Coming Soon)</div> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;