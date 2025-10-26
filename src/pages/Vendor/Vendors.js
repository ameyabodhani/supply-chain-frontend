import React from 'react'
//import './Vendors.css'
import "../ProductsDetails.css";
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { url } from '../../common/constants'
import AddVendor from './AddVendor';
import EditVendor from './EditVendor'
import DeleteVendor from './DeleteVendor'
import ViewListIcon from '@material-ui/icons/ViewList';

const Vendors= () =>{
    const [vendors, setVendors] = useState([])
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;
    const pagesVisited = pageNumber * usersPerPage;
    
    const [vendor, setVendor]=useState(0)
    const [editVendor, setEditVendor]=useState(0)


    const history=useHistory() 
    useEffect(() => {
        console.log(`Vendors component got loaded`)
        getVendors()
      }, [])

      const getVendors = () => {
        axios.get(url + '/vendors').then((response) => {
          const result = response.data
          if (result) {
            console.log(result)
            setVendors(result.data)  
          } else {
            alert('error while loading list of User')
          }
        })
      }


    const VendorRow = vendors
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((vendor) => {
      return (
        <tr>
        <td >{vendor.id}</td>
        <td>{vendor.vendorName}</td>
        <td>{vendor.vendorEmail}</td>
        <td>{vendor.vendorPhone}</td>
        <td>{vendor.vendorAddress}</td>
        <td>{vendor.vendorCity}</td>
        <td>{vendor.vendorState}</td>
        <td>{vendor.vendorPincode}</td>
        <td>{vendor.vendorGstno}</td>
        <td className="status">
            <p className="active">{vendor.isActive}</p>
          </td>
          <td><button onClick={()=>EditVendorDetails(vendor)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditVendor-staticBackdrop">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>vendorDetails(vendor)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#DeleteVendor-staticBackdrop">
            <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
            </td>
          <td>

            <button onClick={() => {
            history.push(`/viewParts/${vendor.id}`, { vendor: vendor})
          }}
            className="btn btn-warning  btn-page-add">
            <ViewListIcon style={{fontSize:'30px'}}/>
            </button>
            
              
          </td>
        </tr>
      );
    });

      const pageCount = Math.ceil(vendors.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

      const EditVendorDetails=(vendor)=>{
        setEditVendor(vendor)
      }
      
      const vendorDetails=(vendor)=>{
        setVendor(vendor)
      }

      const vendorParts=(vendor)=>{
        setVendor(vendor)
      }

      const toggle =() =>{
        setIsAdded(true);
      }
      return (
        <div className="page-container">
          <EditVendor vendor={editVendor} refresh={getVendors}/>
          <DeleteVendor vendor={vendor} refresh={getVendors}/>
          
          <AddVendor toggle={toggle} refresh={getVendors}/>
          <div className="page-header">
            <h4>Manage Vendor</h4>
          </div>
          <div className="page-updateStatus">
            {
              isAdded && (<p>Successfully Added Vendor</p>)
            }
          </div>
          <div className="page-table-div">
          <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th class="th-sm id">Id
                </th>
                <th class="th-sm">Name
                </th>
                <th class="th-sm">Email
                </th>
                <th class="th-sm">Phone
                </th>
                <th class="th-sm">Address
                </th>
                <th class="th-sm">City
                </th>
                <th class="th-sm">State
                </th>
                <th class="th-sm">Pincode
                </th>
                <th class="th-sm">Gst No.
                </th>
                <th class="th-sm">isActive
                </th>
                <th class="th-sm">Action
                </th>
                <th class="th-sm">View Parts                  
                </th>
              </tr>
            </thead>
            <tbody>
            {VendorRow}
            </tbody>
        </table>
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
          </div>
          
          <div className="page-button-div">
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddVendor-staticBackdrop">Add Vendor</button>
          </div>
          <Link to="/parts">
          <div className="page-button-div">
            <button className="btn btn-success">View All Parts</button>
          </div>
          </Link>
        </div>
        
    )
}

export default Vendors
