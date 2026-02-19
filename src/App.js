// App.js
import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

import Home from './pages/User/Home';
import Signin from './pages/User/Signin';
import Signup from './pages/User/Signup';
import AdminLandingPage from './pages/Admin/AdminLandingPage';
import UserLandingPage from './pages/UserLanding/UserLandingPage';
import Vsignin from './pages/Vendor/Vsignin';
import VendorLandingPage from './pages/VendorLanding/VendorLandingPage';
import About from './pages/About';

// ===== 1. AUTH CONTEXT =====
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ===== 2. GUEST ROUTE (redirect away if already logged in) =====
function GuestRoute({ component: Component, ...rest }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (!isAuthenticated) return <Component />;
        const role = user.role.toLowerCase();
        if (role === 'admin') return <Redirect to="/admin-land" />;
        if (role === 'vendor') return <Redirect to="/vendor-land" />;
        return <Redirect to="/user-land" />;
      }}
    />
  );
}

// ===== 3. PROTECTED ROUTE =====
function ProtectedRoute({ component: Component, allowedRoles, ...rest }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/signin" />;
        }
        if (allowedRoles && !allowedRoles.includes(user.role)) {
          if (user.role === 'admin') return <Redirect to="/admin-land" />;
          if (user.role === 'vendor') return <Redirect to="/vendor-land" />;
          return <Redirect to="/user-land" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

// ===== 3. HEADER + NAVIGATION =====
function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const history = useHistory();

  const hiddenRoutes = ['/home', '/user-land', '/vendor-land', '/admin-land'];
  const shouldHideNav = hiddenRoutes.includes(location.pathname);

  const handleLogout = () => {
    logout();
    history.push('/home');
  };

  if (shouldHideNav) return null;

  return (
    <header className="app-header">
      <div className="header-title">Supply Chain Portal</div>

      <nav className="app-nav">
        <Link className="nav-link" to="/home">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link className="nav-link" to="/signin">
              User Login
            </Link>
            <Link className="nav-link" to="/vsignin">
              Vendor Login
            </Link>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="nav-user">Welcome, {user.name}!</span>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

// ===== 4. 404 PAGE =====
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/home">Go back to Home</Link>
    </div>
  );
}

// ===== 5. ROUTES =====
function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <GuestRoute path="/home" component={Home} />
      <GuestRoute path="/signin" component={Signin} />
      <GuestRoute path="/vsignin" component={Vsignin} />
      <Route path="/signup" component={Signup} />
      <GuestRoute path='/about' component={About} />

      <ProtectedRoute
        path="/admin-land"
        component={AdminLandingPage}
        allowedRoles={['Admin']}
      />
      <ProtectedRoute
        path="/user-land"
        component={UserLandingPage}
        allowedRoles={['User', 'user']}
      />
      <ProtectedRoute
        path="/vendor-land"
        component={VendorLandingPage}
        allowedRoles={['vendor']}
      />

      <Route path="*" component={NotFound} />
    </Switch>
  );
}

// ===== 6. ROOT APP =====
function App() {
  console.log("Inside root app");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
