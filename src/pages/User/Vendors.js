import React from 'react'
import '../ProductsDetails.css'
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from 'react'

import { url } from '../../common/constants'

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
          
          </div>
        
    )
}

export default Vendors
