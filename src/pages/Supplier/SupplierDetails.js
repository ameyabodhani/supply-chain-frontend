import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './SupplierDetails.css'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

//import SupplierRow from '../components/SupplierRow'
//import AddSuppliers from './../components/AddSuppliers';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import SupplierEdit from './../components/EditSupplier';
//import SupplierDelete from '../components/DeleteSupplier'

import { url } from '../../common/constants';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SupplierEdit from './EditSupplier'
import SupplierDelete from './DeleteSupplier';
import AddSuppliers from './AddSuppliers';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [message, setMessage] = useState("")
  const [supplier, setSupplier] = useState(0)
  const [messageId, setMessageId] = useState("")
  const [isAdded, setIsAdded] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [editSupplier, setEditSupplier] = useState(0)

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    console.log('Suppliers component get loaded')
    getSuppliers()
  }, [])


  const getSuppliers = () => {
    axios.get(url + '/supplier').then((response) => {
      const result = response.data
      if (result.status === 'success') {
        setSuppliers(result.data)
      }

      else {

        alert('error while loading')
      }

    })
  }

  const displaySuppliers = suppliers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((supplier) => {
      return (
        <tr>
          <td>{supplier.supplierId}</td>

          <td>{supplier.sName}</td>

          <td>
            {supplier.sAddress}
          </td>

          <td>
            {supplier.sPhone}
          </td>

          <td>{supplier.sEmail}</td>

          <td><button onClick={() => { EditSupplierDetails(supplier) }} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditSupplier">
            <EditIcon style={{ fontSize: '20px', paddingBottom: '2px' }} />
          </button>
            <button onClick={() => SupplierDetails(supplier)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#DeleteSupplier">
              <DeleteIcon style={{ fontSize: '20px' }} />

            </button>
          </td>
        </tr>
      )
    })


  const pageCount = Math.ceil(suppliers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const SupplierDetails = (supplier) => {
    setSupplier(supplier)
  }

  const EditSupplierDetails = (supplier) => {
    setEditSupplier(supplier);
  }

  const toggle = () => {
    setIsAdded(true);
  }

  if (messageId !== "") {
    setTimeout(changeID, 5000);

  }
  function changeID() {
    setMessageId("crud-status-hide")
  }
  return (
    <div className="page-container">


      <AddSuppliers toggle={toggle} refresh={getSuppliers} setMessage={setMessage} setMessageId={setMessageId} />
      <SupplierEdit supplier={editSupplier} refresh={getSuppliers} setMessage={setMessage} setMessageId={setMessageId} />
      <SupplierDelete supplier={supplier} refresh={getSuppliers} setMessage={setMessage} setMessageId={setMessageId} />

      <div className="page-header">
        <h4 >Suppliers</h4>

      </div>
      <div className="page-updateStatus">
        <p id={`${messageId}`}>{message}</p>
      </div>



      <div className="page-table-div">
        <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm-id">SupplierId</th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Address</th>
              <th class="th-sm">Phone</th>
              <th class="th-sm">Email</th>
              <th>

              </th>
              <th></th>
            </tr>
          </thead>


          <tbody>
            {displaySuppliers}
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
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddSupplier">Add Supplier</button>


        {/*<button type="button" class="btn btn-success">Add Supplier </button>*/}
      </div>
    </div>

  )

}


export default Suppliers
