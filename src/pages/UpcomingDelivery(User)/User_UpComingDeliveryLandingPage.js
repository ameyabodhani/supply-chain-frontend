import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import "../ProductsDetails.css";
import { url } from '../../common/constants';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';

//import SuppliedOrder1 from './SuppliedOrderview';
import SuppliedOrder from './SuppliedOrder';
import { Link, useHistory } from 'react-router-dom';



function User_UpComingDeliveryLandingPage() {

  const history =useHistory();
  const [orders, setOrders] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [message, setMessage] = useState("")
  const [messageId, setMessageId] = useState("")
  const [deleteOrder, setDeleteOrders] = useState(0);/*This is fro deleting and editing*/
  const [editOrder, setEditOrders] = useState(0);/*This is fro deleting and editing*/
const [suppliedOrder, setSuppliedOrder] = useState([])
  
  const ordersPerPage=7;
  const pagesVisited = pageNumber * ordersPerPage;
  useEffect(()=>{
    getAllOrders();
  },[])

  const getAllOrders = () =>{
    axios.get(url+"/upcomingdeliveries").then((response)=>{
      const result = response.data;
      console.log(result);
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
          <td>
            {
              order.requiredQuantities<=order.stock&&(
                <p className="Yes">Yes</p>
              )
            } 
            {
              order.requiredQuantities>order.stock&&(
                <p className="No">No</p>
              )
            }
          </td>
          <td><button onClick={()=>passOrder(order)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#staticBackdropSuppliedOrder">
            <SendIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
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

  const passOrder=(order)=>{
    setSuppliedOrder(order);


            var product=[];

            
            axios.get(url+"/product/"+order.productNo).then((response)=>{
            const result = response.data;
            if(result.status =="success"){
                console.log("********");
                console.log(result.data);
               product = (result.data)
              editProductStock();
            }
            else{
              alert("Some error occured products cannot be fetched !")
            }
              })
            

            const editProductStock =() =>{
                const data = new FormData();
                var stock = product.stock - Number(order.requiredQuantities)
                console.log("****stock****");
                console.log(product.stock);
                
                console.log(stock);

                data.append("productName",product.productName)
                data.append("plantNo",product.plantNo)
                data.append("status",product.status)
                data.append("cost",product.cost)
                data.append("stock",stock)
                axios.put(url+"/product/"+product.productNo,data).then((response)=>{
                    const result = response.data;
                    console.log(result.data);
                    if(result.status = "success"){ 
                        
                        
                    }
                })
        
            }
  }

  if(messageId !== ""){
    setTimeout(changeID,5000);

  }
  function changeID (){
    setMessageId("crud-status-hide")
  }



const switchToSuppliedOrder=()=>{
  history.push("/suppliedOrderDetails")
}

    return (
        
        <div className="page-container">
          <SuppliedOrder suppliedOrder={suppliedOrder} setMessage={setMessage} setMessageId={setMessageId}/>
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
                <th class="th-sm">Ready
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
          <Link to="/suppliedOrder">
          <div className="page-button-div">
            <button className="btn btn-primary">Delivered Products</button>
          </div>
          </Link>
        </div>
    )
}

export default User_UpComingDeliveryLandingPage
