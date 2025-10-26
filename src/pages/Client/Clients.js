import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { url } from "../../common/constants"

import ClientDelete from './DeleteClient';
import ClientEdit from './EditClient';
import AddClients from './AddClients';

function Client() {
    const [pageNumber, setPageNumber] = useState(0)
    const [clients,setClients] = useState([])
    const [message, setMessage] = useState("")
    const [messageId, setMessageId] = useState("")
    const[isAdded, setIsAdded] = useState(false)
    const [client,setClient]=useState(0)
const [editClient,setEditClient] = useState(0)
    const usersPerPage=7;
    const pagesVisited = pageNumber * usersPerPage;

    useEffect(()=>{
        console.log('Clients component get loaded')
        getClients()},[])


        const getClients =()=>{
            axios.get(url +'/clients').then((response)=>{
                const result = response.data 
                if(result.status === 'success'){
                    setClients(result.data)
                }
                    else
                    {
                        alert('error while loading')
                    }
                
            })
        }

const displayClients = clients.slice(pagesVisited, pagesVisited + usersPerPage)
.map((clients) => {
    return(
        <tr>
            <td>{clients.id}</td>
            
            <td>{clients.clientName}</td>
            
            

            <td>
                {clients.clientAddress}
            </td>
            
            <td>
            {clients.clientGstno}
              
               
            </td>
            <td>
            {clients.clientPhone}
            </td>

            <td>{clients.email}</td>

       <td>{clients.pincode}</td>
       <td>{clients.state}</td>
       <td><button onClick={()=>EditclientDetails(clients)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditClient">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>clientDetails(clients)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#DeleteClient">
            <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
            </td>
        </tr>
    )
})

const pageCount = Math.ceil(clients.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
}
 
const clientDetails=(client)=>{
    setClient(client);
  }
  const EditclientDetails=(client)=>{
    setEditClient(client)
  }
        const toggle =() =>{
            setIsAdded(true);
          }
          
          if(messageId !== ""){
            setTimeout(changeID,5000);
          
          }
          function changeID (){
            setMessageId("crud-status-hide")
          }





        return (
            <div className="page-container">
        <ClientEdit clients={editClient}  refresh={getClients} setMessage={setMessage} setMessageId={setMessageId}/>   
          <ClientDelete clients={client} refresh={getClients} setMessage={setMessage} setMessageId={setMessageId}/>
               <AddClients toggle={toggle} refresh={ getClients} setMessage={setMessage} setMessageId={setMessageId}/>
                <div className="page-header">
            <h4>Clients</h4>
          </div>
          <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
          <div className="page-table-div">
                <table id ="page-table"class="table table-striped table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th  class="th-sm id">Id</th>
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
<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddClient">Add Client</button>
</div>
            </div>
           
            
        )
    
}


export default Client
