import axios from "axios"
import { url } from "../../common/constants"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"
import SendIcon from '@material-ui/icons/Send';
import SendOrder from "./SendOrder"

const Vorders=()=>{
    const vendor=JSON.parse(localStorage.getItem('vendor'))
    const [orders,setOrders]=useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;
    const pagesVisited = pageNumber * usersPerPage;
    const [acceptorder, setAcceptOrder]=useState(0)
    useEffect(()=>{
        getAllOrders();
    },[])
    console.log(vendor.id)
    const getAllOrders =()=>{
    axios.get(`http://localhost:8080/orders/vendor/${vendor.id}`).then((response)=>{
      const result = response.data;
      if(result.status ==="success"){
          //console.log(result.data)
           setOrders(result.data) 
      }
      else{
        alert("Some error occured orders cannot be fetched !")
      }
    })
    }

    const pageCount = Math.ceil(orders.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

    const OrderRow = orders
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((order) => {
    return (
          <tr>
          <td>{order.orderId}</td>
          <td>{order.partId}</td>
          <td>{order.partName}</td>
          <td>{order.partPrice}</td>
          <td>{order.quantityOrdered}</td>
          <td className="status">
            <p className={`${order.status}`}>{order.status}</p>
          </td>
          <td>
          <button onClick={()=>AcceptOrder(order)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#SendOrder-staticBackdrop">
            <SendIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          </td>
          </tr>
        );
      });  

      const AcceptOrder=(order)=>{
        setAcceptOrder(order)
      }
    return (
        <div className="page-container">  
        <SendOrder order={acceptorder} refresh={getAllOrders}/>
        <div className="page-header">
          <h4>All Orders</h4>
        </div>
        <div className="page-table-div">
        <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm id">Id
              </th>
              <th class="th-sm">Part Id
              </th>
              <th class="th-sm">Part Name
              </th>
              <th class="th-sm">Part Price
              </th>
              <th class="th-sm">Quantity Ordered
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
        <Link to="/">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>
      </div>
      
    )
}

export default Vorders