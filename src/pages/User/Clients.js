import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
//import { url } from '../common/constants'
import '../ProductsDetails.css'
import { url } from "../../common/constants"
import AddClient from './AddClient'




function Client() {
  const [pageNumber, setPageNumber] = useState(0)
  const [clients, setClients] = useState([])
  const [message, setMessage] = useState("")
  const [messageId, setMessageId] = useState("")
  const [isAdded, setIsAdded] = useState(false)
  const [client, setClient] = useState(0)

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    console.log('Clients component get loaded')
    getClients()
  }, [])


  const getClients = () => {
    axios.get(url + '/clients').then((response) => {
      const result = response.data
      console.log('Clients response:', result)
      if (result.data && result.data.length > 0) {
        console.log('First client:', result.data[0])
      }
      if (result.status === 'success') {
        setClients(result.data)
      }
      else {
        alert('error while loading')
      }

    })
  }

  const displayClients = clients.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((client, index) => {
      console.log('Rendering client:', client)
      return (
        <tr key={client.id || client.clientId || index}>
          <td>{client.id || client.clientId || 'N/A'}</td>
          <td>{client.clientName || 'N/A'}</td>
          <td>{client.clientAddress || 'N/A'}</td>
          <td>{client.clientGstno || 'N/A'}</td>
          <td>{client.clientPhone || 'N/A'}</td>
          <td>{client.email || client.clientEmail || 'N/A'}</td>
          <td>{client.pincode || 'N/A'}</td>
          <td>{client.state || 'N/A'}</td>
        </tr>
      )
    })

  const pageCount = Math.ceil(clients.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const clientDetails = (client) => {
    setClient(client);
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
      <AddClient
        refresh={getClients}
        setMessage={setMessage}
      />

      <div className="page-header">
        <h4>Clients</h4>
      </div>
      <div className="page-updateStatus">
        <p id={`${messageId}`}>{message}</p>
      </div>
      <div className="page-table-div">
        <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm id">Id</th>
              <th class="th-sm">Name</th>
              <th class="th-sm">Address</th>

              <th class="th-sm">GstNo</th>
              <th class="th-sm">Phone</th>
              <th class="th-sm">Email</th>
              <th class="th-sm">pincode</th>
              <th class="th-sm">state</th>
              <th class="th-sm"></th>  </tr>
          </thead>


          <tbody>
            {displayClients}

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
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#AddClient"
        >
          Add Client
        </button>
      </div>

    </div>

  )

}

export default Client
