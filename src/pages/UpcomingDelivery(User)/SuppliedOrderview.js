import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import SendIcon from '@material-ui/icons/Send';
import InvoicePrint from '../Revenue(User)/InvoicePrint';
import { url } from "../../common/constants"
import { Link } from 'react-router-dom';




function SuppliedDelivery() {
   const [pageNumber1, setPageNumber1] = useState(0)
    const [supOrder,setSupOrder] = useState([])
    const [message, setMessage] = useState("")
    const [messageId, setMessageId] = useState("")
    const[isAdded, setIsAdded] = useState(false)
  
    const [suppliedOrder, setsuppliedOrder] = useState([])
    const usersPerPage=7;
    const pagesVisited = pageNumber1 * usersPerPage;

    useEffect(()=>{
        console.log('delivered component get loaded')
        getDeliveredOrders()},[])


        const getDeliveredOrders =()=>{
            axios.get(url +"/suppliedOrder/").then((response)=>{
                const result = response.data 
                if(result.status === 'success'){
                    setSupOrder(result.data)
                }
                    else
                    {
                        alert('error while loading')
                    }
                
            })
        }

const displaySuppliedOrders =supOrder.slice(pagesVisited, pagesVisited + usersPerPage)
.map((suporders) => {
    return(
        <tr>
            <td>{suporders.clientOrderId}</td>
            <td>{suporders.clientName}</td>
            <td>
                {suporders.productName}
            </td>
            <td>
            {suporders.requiredQuantities}
            </td>
            <td>
            {suporders.orderDate}
            </td>

            <td>{suporders.deliveryDate}</td>

       <td>{suporders.supplierId}</td>
       <td>{suporders.vehicleId}</td>
      
            <td><button onClick={()=>GenerateInvoice(suporders)}  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#Pdf_staticBackdrop">
            <SendIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
            </td>
        </tr>
    )
})

const pageCount = Math.ceil(supOrder.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber1(selected);
}
 
/*const clientDetails=(client)=>{
    setClient(client);
  }
  const EditclientDetails=(client)=>{
    setEditClient(client)
  }*/
      
          
          if(messageId !== ""){
            setTimeout(changeID,5000);
          
          }
          function changeID (){
            setMessageId("crud-status-hide")
          }

const GenerateInvoice=(suporders)=>{
  setsuppliedOrder(suporders);
}




        return (
            <div className="page-container">
               <InvoicePrint suppliedOrder={suppliedOrder}/>
        {/*<ClientEdit clients={editClient}  refresh={getClients} setMessage={setMessage} setMessageId={setMessageId}/>   
          <ClientDelete clients={client} refresh={getClients} setMessage={setMessage} setMessageId={setMessageId}/>
        <AddClients toggle={toggle} refresh={ getClients} setMessage={setMessage} setMessageId={setMessageId}/>*/}
                <div className="page-header">
            <h4>
                SuppliedOrder
            </h4>
          </div>
          <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
          <div className="page-table-div">
                <table id ="page-table"class="table table-striped table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th  class="th-sm id">Order Id</th>
                        <th class="th-sm">Client Name</th>
                        <th class="th-sm">Product Name</th>
                        <th class="th-sm">Quantities</th> 
                        <th class="th-sm">Order Date</th>
                        <th class="th-sm">Delivery Date</th>
                        <th class="th-sm">Supplier Id</th>
                        <th class="th-sm">Vehicle Id</th>
                        <th class="th-sm">Invoice</th></tr>
                    </thead>
                    
                   
                    <tbody>
                   {displaySuppliedOrders}
                    
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
<Link to="/upcoming-deliveries">
          <div className="page-button-div">
            
            <button className="btn btn-primary">Back</button>
          </div>
          </Link>

            </div>
           
            
        )
    
}


export default SuppliedDelivery