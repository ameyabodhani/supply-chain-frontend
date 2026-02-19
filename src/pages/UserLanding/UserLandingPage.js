import React from 'react';
import { HashRouter, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../../App';
import { menus } from '../../components/UserNavMenus';
import './UserLandingPage.css';

// Pages
import Dashboard from '../Dashboard(Admin)/Dashboard';
import User_Dashboard from '../Dashboard(User)/User_Dashboard';
import Suppliers from '../User/SupplierDetails';
import Client from '../User/Clients';
import Vendors from '../User/Vendors';
import Vehicles from '../User/Vehicle/VehicleDetails';
import User_PlantLandingPage from '../Plants(User)/User_PlantLandingPage';
import User_ProductsDetails from '../Products(User)/User_ProductsDetails';
import User_UpComingDeliveryLandingPage from '../UpcomingDelivery(User)/User_UpComingDeliveryLandingPage';
import SuppliedDelivery from '../UpcomingDelivery(User)/SuppliedOrderview';
import SuppliedDetails from '../UpcomingDelivery(User)/SuppliedDetails';
import UpcomingProduction from '../UpComingProduction(User)/UpcomingProduction';
import Revenue from '../Revenue(User)/Revenue';
import ViewParts from '../Part/ViewParts';
import Complaints from '../User/Complaints/SupplierComplaints';
import SupplierComplaintsEdit from '../User/Complaints/EditSupplierComplaints';
import ComplaintDetails from '../User/Complaints/ComplaintsSupplierDetails';

function UserContent() {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      localStorage.removeItem('user');
      history.replace('/signin');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Top Horizontal Navigation Bar */}
      <nav style={{
        backgroundColor: '#1e293b',
        padding: '0 20px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-truck-fast" style={{ color: '#34d399', fontSize: '1.3rem' }}></i>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.3px' }}>
            Supply Chain Management
          </span>
          <span style={{
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '4px',
            letterSpacing: '0.8px'
          }}>USER</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: '700', fontSize: '14px',
              flexShrink: 0
            }}>
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <span style={{ color: '#cbd5e1', fontSize: '14px' }}>
              {user?.name || 'User'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #475569',
              color: '#cbd5e1',
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Vertical Sidebar Navigation */}
        <div
          className="bg-light border-end"
          style={{
            width: '250px',
            overflowY: 'auto',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
          }}
        >
          <div className="list-group list-group-flush">
            {menus.map((menu) => (
              <Link
                key={menu.route}
                to={menu.route}
                className="list-group-item list-group-item-action d-flex align-items-center py-3"
                style={{
                  borderLeft: '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>
                  {menu.logo}
                </span>
                <span style={{ fontWeight: '500' }}>{menu.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/user-dashboard" />
              </Route>
              <Route exact path="/suppliers1" component={Suppliers} />
              <Route exact path="/clients1" component={Client} />
              <Route exact path="/vendors1" component={Vendors} />
              <Route exact path="/vehicles" component={Vehicles} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/scomplaints" component={Complaints} />
              <Route exact path="/complaints" component={SupplierComplaintsEdit} />
              <Route exact path="/complaint-details" component={ComplaintDetails} />
              <Route exact path="/plant" component={User_PlantLandingPage} />
              <Route exact path="/products" component={User_ProductsDetails} />
              <Route exact path="/upcoming-deliveries" component={User_UpComingDeliveryLandingPage} />
              <Route exact path="/supplied-details" component={SuppliedDetails} />
              <Route exact path="/upcoming-production" component={UpcomingProduction} />
              <Route exact path="/user-dashboard" component={User_Dashboard} />
              <Route exact path="/suppliedOrder" component={SuppliedDelivery} />
              <Route exact path="/revenue" component={Revenue} />
              <Route exact path="/view-parts" component={ViewParts} />
              <Route render={() => <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Page not found</div>} />
            </Switch>
          </div>

          {/* Footer */}
          <footer
            className="text-center text-muted py-2"
            style={{
              borderTop: '1px solid #dee2e6',
              fontSize: '0.8rem',
              flexShrink: 0
            }}
          >
            © 2021 Supply Chain Management, Inc. All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
}

function UserLandingPage() {
  return (
    <HashRouter>
      <UserContent />
    </HashRouter>
  );
}

export default UserLandingPage;