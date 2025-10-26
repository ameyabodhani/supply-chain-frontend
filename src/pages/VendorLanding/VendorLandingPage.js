
import { Link, BrowserRouter, Switch,Route } from 'react-router-dom';
import { menus } from '../../components/VendorNavMenus';
import Vorders from '../Vendor/Vorders';
import Vparts from '../Vendor/Vparts';
import Logout from './../Vendor/Logout';


function VendorLandingPage(){
    const vendor=JSON.parse(localStorage.getItem('vendor'))
    return (
        <div className="admin-container">
            <BrowserRouter>
            <div className="admin-navbar">
            <div id="title">
                <p>Hi, {vendor.vendorName}</p>
            </div>
            <div className="all-navigations">
            
            {
                menus.map((menu)=>{
                    return(
                        
                        <Link to={menu.route}>
                        <div id="admin-user-nav">
                            <p id="logo">{menu.logo}</p>
                            <p> {menu.title}</p>
                        </div>
                        </Link>
                    )
                })
            }  
            </div>
            </div>
            <div className="admin-content">
            <div className="admin-header">
                <Link to="/logout">
                <button className="btn btn-secondary btn-sm logout-btn">Logout</button>
                </Link>
            </div>
            <Switch>
            <Route path="/logout" component={Logout}/>
            <Route path="/parts" component={Vparts}/>
            <Route path="/orders" component={Vorders}/> 
            </Switch>
            <div className="admin-footer"></div>
            </div>
            </BrowserRouter>
        </div>
    )    
}
export default VendorLandingPage