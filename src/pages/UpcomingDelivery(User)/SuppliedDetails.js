import React, { useEffect, useState} from 'react'
import '../ProductsDetails.css'
import ReactPaginate from 'react-paginate'
import jsPDF from 'jspdf';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { url } from '../../common/constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SuppliedDetails() {
    let history = useHistory();
    const [suppliedOrder, setSuppliedOrder] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    const [product, setProduct] = useState(0);/*This is fro deleting and editing*/
    const [editProduct, setEditProduct] = useState(0);/*This is fro deleting and editing*/
    const [message, setMessage] = useState("")
    const [messageId, setMessageId] = useState("")
    const usersPerPage=7;
    const pagesVisited = pageNumber * usersPerPage;

    useEffect(()=>{
      getAllSuppliedOrder();
    },[])

    const getAllSuppliedOrder =()=>{
    axios.get(url+"/suppliedOrder").then((response)=>{
    const result = response.data;
    if(result.status =="success"){
      setSuppliedOrder(result.data)
    }
    else{
      alert("Some error occured products cannot be fetched !")
    }
      })
    }

   const displayProducts = suppliedOrder
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((orders) => {
      return (
        <tr>
          <td >{orders.clientOrderId}</td>
          <td>{orders.clientName}</td>
          <td>{orders.productName}</td>
          
          <td><button  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>productDetails(product)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#staticBackdropDelete">
            <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
            </td>
        </tr>
      );
    });
  const pageCount = Math.ceil(suppliedOrder.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
   
  const productDetails=(product)=>{
    setProduct(product);
  }
  const EditproductDetails=(product)=>{
    setEditProduct(product);
  }

  if(messageId !== ""){
    setTimeout(changeID,5000);

  }
  function changeID (){
    setMessageId("crud-status-hide")
  }

  const backToDeliveryPage=()=>{
    history.push("/upcoming-deliveries")
  }

  

    return (
        <div className="page-container">
          <div className="page-header">
            <h4>Delivered Products</h4>
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
                <th class="th-sm">Invoice
                </th>
              </tr>
            </thead>
            <tbody>
            {displayProducts}
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
            <button onClick={backToDeliveryPage} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdropAddNewProduct">Back</button>
          </div>
        </div>
        
    )
}

export default SuppliedDetails
