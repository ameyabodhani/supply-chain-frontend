import React from 'react';
import { HashRouter, Link, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../../App';
import { menus } from '../../components/AdminNavMenus';

// Import all your components
import Users from './../User/Users';
import Vendors from '../Vendor/Vendors';
import EditVProfile from '../Vendor/EditVendor';
import AddUser from './../User/AddUser';
import EditProfile from './../User/EditProfile';
import AddVendor from './../Vendor/AddVendor';
import DeleteUser from './../User/DeleteUser';
import Parts from './../Part/Parts';
import ViewParts from '../Part/ViewParts';
import Orders from './../Order/Orders';
import ViewOrder from './../Order/ViewOrder';
import SaveOrder from '../Order/SaveOrder';
import Cart from './../Order/Cart';
import PlantLandingPage from '../Plant(Admin)/PlantLandingPage';
import ProductsDetails from '../Products(Admin)/ProductsDetails';
import ProductionLandingPage from '../Production(Admin)/ProductionLandingPage';
import ProductionHistory from '../Production(Admin)/ProductionHistory';
import UpComingDeliveryLandingPage from '../ClientOrders(Admin)/UpComingDeliveryLandingPage';
import Dashboard from './../Dashboard(Admin)/Dashboard';
import Suppliers from '../Supplier/SupplierDetails';
import SupplierComplaintsEdit from '../Supplier/EditSupplierComplaints';
import Client from './../Client/Clients';

function AdminContent() {
  const history = useHistory();
  const { logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Supply Chain Management - Admin Panel
          </span>
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              Welcome, <strong>{user.name || 'Admin'}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Logout
            </button>
          </div>
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
            {menus.map((menu, index) => (
              <Link
                key={index}
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
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
            padding: '20px'
          }}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/users" component={Users} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/vendors" component={Vendors} />
            <Route path="/edit-vprofile" component={EditVProfile} />
            <Route path="/add-vendor" component={AddVendor} />
            <Route path="/delete-profile" component={DeleteUser} />
            <Route path="/parts" component={Parts} />
            <Route path="/viewParts" component={ViewParts} />
            <Route path="/orders" component={Orders} />
            <Route path="/viewOrder" component={ViewOrder} />
            <Route path="/saveOrder" component={SaveOrder} />
            <Route path="/cart" component={Cart} />
            <Route path="/plant" component={PlantLandingPage} />
            <Route path="/products" component={ProductsDetails} />
            <Route path="/production" component={ProductionLandingPage} />
            <Route path="/productionhistory" component={ProductionHistory} />
            <Route path="/client-orders" component={UpComingDeliveryLandingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/suppliers" component={Suppliers} />
            <Route path="/clients" component={Client} />
            <Route path="/complaints" component={SupplierComplaintsEdit} />
          </Switch>

          {/* Footer */}
          <footer
            className="text-center text-muted py-3 mt-4"
            style={{
              borderTop: '1px solid #dee2e6',
              fontSize: '0.875rem'
            }}
          >
            © 2021 Supply Chain Management, Inc. All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
}

function AdminLandingPage() {
  return (
    <HashRouter>
      <AdminContent />
    </HashRouter>
  );
}

export default AdminLandingPage;