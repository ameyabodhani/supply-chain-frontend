import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../App';
import './Vsignin.css';

function Vsignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Starting login for:', email);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending request to backend...');

      const response = await fetch('http://localhost:8080/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);

      // Handle possible backend responses
      if (response.status === 400) {
        const msg = await response.text();
        throw new Error(msg);
      } else if (response.status === 401) {
        throw new Error('Invalid email or password');
      } else if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || 'Server error');
      }

      const userData = await response.json();
      console.log('Login successful, user data:', userData);

      // Save user in context and localStorage
      login(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect based on role
      const role = userData.role.toLowerCase();
      if (role === 'admin') {
        console.log('Redirecting to /admin-land');
        history.push('/admin-land');
      } else if (role === 'vendor') {
        console.log('Redirecting to /vendor-land');
        history.push('/vendor-land');
      } else {
        console.log('Redirecting to /user-land');
        history.push('/user-land');
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      console.log('Login process finished');
      setLoading(false);
    }
  };

  return (
    <div className="page-container">     
      {/* Login Form */}
      <div className="form-container">
        <h2>Vendor Sign In</h2>
        <p className="subtitle">Enter your credentials to continue</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Vsignin;
