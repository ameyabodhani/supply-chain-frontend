import './Orders.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link, useHistory } from 'react-router-dom';
import { url } from '../../common/constants';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import DeleteOrder from './DeleteOrder';

const Orders=()=>{
    const [orders, setOrders] = useState([]);
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [order, setOrder]=useState(0)
    const [vOrder,setVorder]=useState(0)
    const usersPerPage=7;

    const pagesVisited = pageNumber * usersPerPage;
    const history=useHistory()
    useEffect(()=>{
        getAllOrders();
    },[])


    const getAllOrders =()=>{
        axios.get(url+"/orders").then((response)=>{
      const result = response.data;
      if(result.status ==="success"){
          setOrders(result.data) 
      }
      else{
        alert("Some error occured orders cannot be fetched !")
      }
    })
    }


    const OrderRow = orders
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((order) => {
      
    return (
          <tr>
          <td>{order.orderId}</td>
          <td>{order.orderedDate}</td>
          <td>{order.expectedDate}</td>
          <td>{order.deliveredQuantity}</td>
          <td className="status">
            <p className={`${order.status}`}>{order.status}</p>
          </td>
          <td>
          <button onClick={() => {
            history.push(`/viewOrder/${order.orderId}`, { order: order})
          }} className="btn btn-default  btn-page-edit" data-bs-toggle="modal" data-bs-target="#ViewOrder-staticBackdrop">
            <ShoppingBasketIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>&nbsp;&nbsp;&nbsp;
            <button onClick={()=>deleteOrder(order)} className="btn btn-danger  btn-page-edit" data-bs-toggle="modal" data-bs-target="#DeleteOrder-staticBackdrop">
            <DeleteSweepIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button> 
          </td>

          </tr>
        );
      });  
    const pageCount = Math.ceil(orders.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

      const viewOrder=(order)=>{
        setVorder(order)
      }

      const deleteOrder=(order)=>{
          setOrder(order)
      }
    return (
        <div className="page-container">
        <DeleteOrder order={order} refresh={getAllOrders}/>
            
        <div className="page-header">
          <h4>All Orders</h4>
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
              <th class="th-sm">Ordered Date
              </th>
              <th class="th-sm">Expected Date
              </th>
              <th class="th-sm">Delivered Quantity
              </th>
              <th class="th-sm">Status
              </th>
              <th class="th-sm">Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {OrderRow}
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
        <Link to="/parts">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>

        <Link to="/saveOrder">
        <div className="page-button-div">
          <button className="btn btn-info">Save Order</button>
        </div>
        </Link>
      </div>
      
    )
}
export default Orders