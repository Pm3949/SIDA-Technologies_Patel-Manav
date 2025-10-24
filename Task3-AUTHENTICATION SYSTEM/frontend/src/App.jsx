// src/App.jsx
import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';

// Make sure this matches your backend port
const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  // Get token from localStorage on initial load
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // For profile fetching
  const [apiError, setApiError] = useState(null); // For login/register errors
  const [apiLoading, setApiLoading] = useState(false); // For login/register loading

  // Effect 1: Store/Remove token in localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Effect 2: Fetch user profile if token exists
  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            // If token is invalid (e.g., expired)
            throw new Error('Session expired or invalid token');
          }
          
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          setToken(null); // Clear invalid token
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProfile();
    } else {
      setUser(null); // Clear user data if no token
    }
  }, [token]); // This effect re-runs whenever the token changes

  // --- API Handlers ---

  const handleLogin = async (email, password) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      setToken(data.token); // This triggers the useEffects
    } catch (error) {
      setApiError(error.message);
    } finally {
      setApiLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      // Show success message
      alert('Registration successful! Please log in.');
    } catch (error) {
      setApiError(error.message);
    } finally {
      setApiLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null); // This clears the token and triggers useEffects
  };

  // --- Render Logic ---

  if (loading && token) {
    return (
      <div className="container">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {token && user ? (
        // Profile View
        <div>
          <h2>Welcome, {user.name}</h2>
          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        // Auth View
        <AuthPage
          onLogin={handleLogin}
          onRegister={handleRegister}
          error={apiError}
          loading={apiLoading}
        />
      )}
    </div>
  );
}

export default App;