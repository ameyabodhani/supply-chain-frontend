import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { removeFromCartAction,clearCartAction } from './actions/cartActions';
import { url } from '../../common/constants';
import axios from 'axios';

const Cart=()=>{
    const [parts, setParts] = useState([]);
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;

    const pagesVisited = pageNumber * usersPerPage;
    //to view all parts
    const partOrders=useSelector((state)=> state.partOrders)
    
console.log(partOrders)
    const pageCount = Math.ceil(parts.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

    const PartRow = partOrders
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((part) => {
        console.log(part)
      return (
        <tr>
        <td >{part.part.partId}</td>
        <td>{part.part.partName}</td>
        <td>{part.part.partPrice}</td>
        <td>{part.part.availableStock}</td>
        <td>{part.quantityOrdered}</td>
        <td><button onClick={()=>{removeFromCart(part)}}  className="btn btn-danger  btn-page-edit" data-bs-toggle="modal" data-bs-target="#RemovePartsFromOrder-staticBackdrop">
            <RemoveShoppingCartIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
        </td>
        </tr>
      );
    });

    const dispatch=useDispatch()

    const removeFromCart=(part)=>{
        dispatch(removeFromCartAction(part))
    }

    const clearCart=()=>{
      dispatch(clearCartAction())
    }
    
    const confirmOrder=()=>{
      
      const body={partOrders:partOrders}
    
      axios.post(url + '/orders', body).then((response) => {
        const result = response.data
        console.log(response)
        if (result === 'success') {
          alert('successfully added an order')
        } else {
          alert('Check in Orders')
        }
    })
    clearCart()
    }
    return (
        <div className="page-container">
        <div className="page-header">
          <h4>Cart Items</h4>
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
              <th class="th-sm">Name
              </th>
              <th class="th-sm">Price
              </th>
              <th class="th-sm">AvailableStocks
              </th>
              <th class="th-sm">Quantity Ordered
              </th>
              <th class="th-sm">Action
              </th>
            </tr>
          </thead>
          <tbody>
          {PartRow}
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
    <div className="mybtn-right">
        <button onClick={()=>{confirmOrder()}} class="btn btn-primary btn-md">Create Order</button>
      </div>
        </div>
        <Link to="/saveOrder">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>
        
      </div>
      
    )
}

export default Cart