import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './SupplierDetails.css'
import ReactPaginate from 'react-paginate'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { url } from '../../common/constants'
import SupplierEdit from './EditSupplier'
import SupplierDelete from './DeleteSupplier'
import AddSuppliers from './AddSuppliers'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [message, setMessage] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [editingSupplier, setEditingSupplier] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)

  const ITEMS_PER_PAGE = 7
  const pagesVisited = pageNumber * ITEMS_PER_PAGE

  // Load suppliers on component mount
  useEffect(() => {
    fetchSuppliers()
  }, [])

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const fetchSuppliers = () => {
    axios.get(url + '/supplier')
      .then((response) => {
        const result = response.data
        if (result.status === 'success') {
          setSuppliers(result.data)
        }
      })
      .catch((error) => {
        console.error('Failed to load suppliers:', error)
        setMessage('Error loading suppliers')
      })
  }

  const displaySuppliers = suppliers
    .slice(pagesVisited, pagesVisited + ITEMS_PER_PAGE)
    .map((supplier) => (
      <tr key={supplier.id}>
        <td>{supplier.id}</td>
        <td>{supplier.sName}</td>
        <td>{supplier.sAddress}</td>
        <td>{supplier.sPhone}</td>
        <td>{supplier.sEmail}</td>
        <td>
          <button 
            onClick={() => setEditingSupplier(supplier)} 
            className="btn btn-success btn-page-edit" 
            data-bs-toggle="modal" 
            data-bs-target="#EditSupplier"
            title="Edit supplier"
          >
            <EditIcon style={{ fontSize: '20px', paddingBottom: '2px' }} />
          </button>
        </td>
        <td>
          <button 
            onClick={() => setSelectedSupplier(supplier)} 
            className="btn btn-danger btn-page-delete" 
            data-bs-toggle="modal" 
            data-bs-target="#DeleteSupplier"
            title="Delete supplier"
          >
            <DeleteIcon style={{ fontSize: '20px' }} />
          </button>
        </td>
      </tr>
    ))

  const pageCount = Math.ceil(suppliers.length / ITEMS_PER_PAGE)

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <div className="page-container">
      <AddSuppliers 
        refresh={fetchSuppliers} 
        setMessage={setMessage} 
      />
      <SupplierEdit 
        supplier={editingSupplier} 
        refresh={fetchSuppliers} 
        setMessage={setMessage} 
      />
      <SupplierDelete 
        supplier={selectedSupplier} 
        refresh={fetchSuppliers} 
        setMessage={setMessage} 
      />

      <div className="page-header">
        <h4>Suppliers</h4>
      </div>

      {message && (
        <div className="page-updateStatus">
          <p>{message}</p>
        </div>
      )}

      <div className="page-table-div">
        {suppliers.length === 0 ? (
          <p>No suppliers found. Click "Add Supplier" to create one.</p>
        ) : (
          <>
            <table id="page-table" className="table table-striped table-sm">
              <thead>
                <tr>
                  <th className="th-sm-id">Supplier ID</th>
                  <th className="th-sm">Name</th>
                  <th className="th-sm">Address</th>
                  <th className="th-sm">Phone</th>
                  <th className="th-sm">Email</th>
                  <th className="th-sm">Edit</th>
                  <th className="th-sm">Delete</th>
                </tr>
              </thead>
              <tbody>
                {displaySuppliers}
              </tbody>
            </table>

            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName="paginationBttns"
              previousLinkClassName="previousBttn"
              nextLinkClassName="nextBttn"
              disabledClassName="paginationDisabled"
              activeClassName="paginationActive"
            />
          </>
        )}
      </div>

      <div className="page-button-div">
        <button 
          className="btn btn-success" 
          data-bs-toggle="modal" 
          data-bs-target="#AddSupplier"
        >
          Add Supplier
        </button>
      </div>
    </div>
  )
}

export default Suppliers