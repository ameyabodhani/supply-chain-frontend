import { Link } from 'react-router-dom';
import './Home.css';
import { useEffect } from 'react';

const featureTiles = [
  {
    icon: '📦',
    title: 'Order Management',
    desc: 'Create, track, and manage purchase orders in real time.',
  },
  {
    icon: '🏭',
    title: 'Vendor Management',
    desc: 'Maintain vendor profiles, contacts, and part catalogs.',
  },
  {
    icon: '👥',
    title: 'Client Management',
    desc: 'Track client accounts, orders, and delivery status.',
  },
  {
    icon: '📊',
    title: 'Inventory Tracking',
    desc: 'Monitor stock levels across all parts and warehouses.',
  },
];

const stats = [
  { number: '500+', label: 'Orders Tracked' },
  { number: '50+',  label: 'Vendors' },
  { number: '200+', label: 'Parts Catalogued' },
];

const Home = () => {
  useEffect(() => {
    console.log('HomePage Loaded!')
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="home-wrapper">

      <div className="home-content">

        {/* Left — Branding + Features */}
        <div className="home-left">

          <div className="home-brand">
            <div className="home-logo">SC</div>
            <h1>Supply Chain Portal</h1>
            <p className="home-tagline">
              End-to-end supply chain visibility — from vendor to delivery.
            </p>
          </div>

          <div className="feature-grid">
            {featureTiles.map((tile, index) => (
              <div className="feature-tile" key={index}>
                <span className="feature-icon">{tile.icon}</span>
                <div>
                  <h4>{tile.title}</h4>
                  <p>{tile.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="home-stats">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right — Auth Card */}
        <div className="home-right">
          <div className="auth-card">
            <h2>Welcome back</h2>
            <p className="auth-subtitle">Sign in to your account to continue</p>

            <div className="auth-buttons">
              <Link to="/signin" className="auth-btn auth-btn-primary">User Sign In</Link>
              <Link to="/vsignin" className="auth-btn auth-btn-secondary">Vendor Sign In</Link>
              <div className="auth-divider"><span>or</span></div>
              <Link to="/signup" className="auth-btn auth-btn-outline">Create Account</Link>
            </div>

            <p className="auth-about">
              <Link to="/about">About this application</Link>
            </p>
          </div>
        </div>

      </div>

      <footer className="home-footer">
        © 2025 Supply Chain Portal
      </footer>

    </div>
  );
};

export default Home;
