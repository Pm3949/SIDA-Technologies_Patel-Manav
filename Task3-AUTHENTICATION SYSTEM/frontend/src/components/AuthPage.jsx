// src/components/AuthPage.jsx
import { useState } from 'react';

export function AuthPage({ onLogin, onRegister, error, loading }) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(name, email, password);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : (isRegistering ? 'Register' : 'Login')}
        </button>
      </form>
      
      {error && <p className="error-message">{error}</p>}
      
      <button 
        onClick={() => setIsRegistering(!isRegistering)} 
        className="secondary-btn"
      >
        {isRegistering
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}