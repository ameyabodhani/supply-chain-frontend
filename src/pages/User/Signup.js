// Signup.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields.');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending signup request to backend...');
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          isActive: 1, // by default user is active
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create user');
      }

      const user = await response.json();
      console.log('Signup successful:', user);

      alert(`Signup successful for ${user.name}! Redirecting to login...`);
      history.push('/signin'); // redirect to login page
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create New Account</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        &nbsp;

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="signin-link">
        Already have an account? <a href="/signin">Sign in</a>
      </p>
    </div>
  );
};

export default Signup;
