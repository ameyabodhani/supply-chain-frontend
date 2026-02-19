import "../ProductsDetails.css";
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from 'react'
import { url } from '../../common/constants'
import AddVendor from './AddVendor';
import EditVendor from './EditVendor'
import DeleteVendor from './DeleteVendor'

const Vendors = () => {
  const [vendors, setVendors] = useState([])
  const [isAdded, setIsAdded] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  const [vendor, setVendor] = useState(0)
  const [editVendor, setEditVendor] = useState(0)

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

  const EditVendorDetails = (vendor) => {
    setEditVendor(vendor)
  }

  const vendorDetails = (vendor) => {
    setVendor(vendor)
  }

  const toggle = () => {
    setIsAdded(true);
  }

  const VendorRow = vendors
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((vendor) => {
      return (
        <tr key={vendor.id}>
          <td>{vendor.id}</td>
          <td>{vendor.vendorName}</td>
          <td>{vendor.vendorEmail}</td>
          <td>{vendor.vendorPhone}</td>
          <td>{vendor.vendorAddress}</td>
          <td>{vendor.vendorCity}</td>
          <td>{vendor.vendorState}</td>
          <td>{vendor.vendorPincode}</td>
          <td>{vendor.vendorGstno}</td>
          <td>
            {vendor.isActive
              ? <span style={{ backgroundColor: 'green', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
                  <i className="fa-solid fa-circle-check" style={{ marginRight: '4px' }}></i>Active
                </span>
              : <span style={{ backgroundColor: 'red', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
                  <i className="fa-solid fa-circle-xmark" style={{ marginRight: '4px' }}></i>Inactive
                </span>
            }
          </td>
          <td style={{ whiteSpace: 'nowrap' }}>
            <button onClick={() => EditVendorDetails(vendor)} className="btn btn-success btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditVendor-staticBackdrop">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button onClick={() => vendorDetails(vendor)} className="btn btn-secondary btn-page-delete" data-bs-toggle="modal" data-bs-target="#DeleteVendor-staticBackdrop">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
          <td>
            <button onClick={() => history.push(`/viewParts/${vendor.id}`, { vendor: vendor })} className="btn btn-warning btn-page-add">
              <i className="fa-solid fa-boxes-stacked"></i>
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
      <EditVendor vendor={editVendor} refresh={getVendors} />
      <DeleteVendor vendor={vendor} refresh={getVendors} />
      <AddVendor toggle={toggle} refresh={getVendors} />

      <div className="page-header">
        <h4><i className="fa-solid fa-truck" style={{ marginRight: '8px' }}></i>Manage Vendor</h4>
      </div>
      <div className="page-updateStatus">
        {isAdded && (<p>Successfully Added Vendor</p>)}
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
              <th className="th-sm">Action</th>
              <th className="th-sm">View Parts</th>
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

      <div className="page-button-div">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddVendor-staticBackdrop">
          <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>Add Vendor
        </button>
      </div>
      <Link to="/parts">
        <div className="page-button-div">
          <button className="btn btn-success">
            <i className="fa-solid fa-list" style={{ marginRight: '6px' }}></i>View All Parts
          </button>
        </div>
      </Link>
    </div>
  )
}

export default Vendors