import React, { useEffect, useState } from 'react'
import NewDeliveryAddModal from './NewDeliveryAddModal'
import ReactPaginate from 'react-paginate'
import "../ProductsDetails.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { url } from '../../common/constants';
import axios from 'axios';
import DeliveryEditModal from './DeliveryEditModal';
import DeliveryDeleteModal from './DeliveryDeleteModal';

function UpComingDeliveryLandingPage() {

  const [orders, setOrders] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [message, setMessage] = useState("")
  const [messageId, setMessageId] = useState("")
  const [deleteOrder, setDeleteOrders] = useState(0);/*This is fro deleting and editing*/
  const [editOrder, setEditOrders] = useState(0);/*This is fro deleting and editing*/

  const ordersPerPage=7;
  const pagesVisited = pageNumber * ordersPerPage;
  useEffect(()=>{
    getAllOrders();
  },[])

  const getAllOrders = () =>{
    axios.get(url+"/upcomingdeliveries").then((response)=>{
      const result = response.data;
      if(result.status =="success"){
        setOrders(result.data)
        console.log(result.data)
      }
      else{
        alert("Some error occured products cannot be fetched !")
      }
    })
  }
  const displayOrders = orders.slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order) => {
      return (
        <tr>
          <td>{order.clientOrderId}</td>
          <td>{order.clientName}</td>
          <td>{order.state}</td>
          <td>{order.productName}</td>
          <td>{order.orderDate}</td>
          <td>{order.requiredQuantities}</td>
          <td>{order.deliveryDate}</td>
          <td><button onClick={()=>EditOrdersDetails(order)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#orderEdit-staticBackdrop">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>deleteOrdersDetails(order)} className="btn btn-secondary btn-page-delete" data-bs-toggle="modal" data-bs-target="#orderDelete-staticBackdrop">
            <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
            </td>
        </tr>
      );
    });

    const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const deleteOrdersDetails=(order)=>{
    setDeleteOrders(order);
  }
  const EditOrdersDetails=(order)=>{
    setEditOrders(order);
  }

  if(messageId !== ""){
    setTimeout(changeID,5000);

  }
  function changeID (){
    setMessageId("crud-status-hide")
  }





    return (
        
        <div className="page-container">
            <NewDeliveryAddModal refresh={getAllOrders} setMessage={setMessage} setMessageId={setMessageId}/>
            <DeliveryEditModal order={editOrder} refresh={getAllOrders} setMessage={setMessage} setMessageId={setMessageId}/>
            <DeliveryDeleteModal order={deleteOrder} refresh={getAllOrders} setMessage={setMessage} setMessageId={setMessageId}/>
          <div className="page-header">
            <h4>Upcoming Deliveries</h4>
          </div>
          <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
          <div className="page-table-div">
          <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th class="th-sm">Client Order No
                </th>
                <th class="th-sm">Client Name
                </th>
                <th class="th-sm">State
                </th>
                <th class="th-sm">Product Name
                </th>
                <th class="th-sm">Ordered Date
                </th>
                <th class="th-sm">Quantities
                </th>
                <th class="th-sm">Delivery Date
                </th>
                <th class="th-sm">Action
                </th>
              </tr>
            </thead>
            <tbody>
            {displayOrders}
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
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddNewDelivery-staticBackdrop">Add New Delivery</button>
          </div>
        </div>
    )
}

export default UpComingDeliveryLandingPage
