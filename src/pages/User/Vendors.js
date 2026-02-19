import '../ProductsDetails.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from 'react'

import { url } from '../../common/constants'

const Vendors = () => {
  const [vendors, setVendors] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  const history = useHistory()

  useEffect(() => {
    getVendors()
  }, [])

  const getVendors = () => {
    axios.get(url + '/vendors').then((response) => {
      const result = response.data
      if (result) {
        setVendors(result.data)
      } else {
        alert('error while loading list of vendors')
      }
    })
  }

  const vendorParts = (vendor) => {
    history.push('/view-parts', { vendor })
  }

  const VendorRow = vendors
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((vendor) => {
      return (
        <tr key={vendor.id}>
          <td>{vendor.id}</td>
          <td><i className="fa-solid fa-building" style={{ marginRight: '6px', color: '#6c757d' }}></i>{vendor.vendorName}</td>
          <td><i className="fa-solid fa-envelope" style={{ marginRight: '6px', color: '#6c757d' }}></i>{vendor.vendorEmail}</td>
          <td><i className="fa-solid fa-phone" style={{ marginRight: '6px', color: '#6c757d' }}></i>{vendor.vendorPhone}</td>
          <td>{vendor.vendorAddress}</td>
          <td>{vendor.vendorCity}</td>
          <td>{vendor.vendorState}</td>
          <td>{vendor.vendorPincode}</td>
          <td>{vendor.vendorGstno}</td>
          <td className="status">
            <p className={vendor.isActive ? "active" : "Inactive"}>
              <i className={`fa-solid ${vendor.isActive ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ marginRight: '5px' }}></i>
              {vendor.isActive ? "Active" : "Inactive"}
            </p>
          </td>
          <td>
            <button
              onClick={() => vendorParts(vendor)}
              className="btn btn-primary btn-sm"
            >
              <i className="fa-solid fa-boxes-stacked" style={{ marginRight: '5px' }}></i>Parts
            </button>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(vendors.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h4><i className="fa-solid fa-truck" style={{ marginRight: '8px' }}></i>Manage Vendor</h4>
      </div>
      <div className="page-table-div">
        <table id="page-table" className="table table-striped table-sm" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th className="th-sm id">Id</th>
              <th className="th-sm">Name</th>
              <th className="th-sm">Email</th>
              <th className="th-sm">Phone</th>
              <th className="th-sm">Address</th>
              <th className="th-sm">City</th>
              <th className="th-sm">State</th>
              <th className="th-sm">Pincode</th>
              <th className="th-sm">Gst No.</th>
              <th className="th-sm">Status</th>
              <th className="th-sm">Parts</th>
            </tr>
          </thead>
          <tbody>
            {VendorRow}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={<><i className="fa-solid fa-chevron-left"></i> Prev</>}
          nextLabel={<>Next <i className="fa-solid fa-chevron-right"></i></>}
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