import React, { useEffect, useState } from 'react'
import '../ProductsDetails.css'
import ReactPaginate from 'react-paginate'
import ProductionRecordInsertModal from './ProductionRecordInsertModal';
import { useHistory } from 'react-router';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { url } from '../../common/constants';
import axios from 'axios';


function ProductionLandingPage() {
  let history = useHistory();
  const [totalStockProduced, setTotalStockProduced] = useState(0)
  const [status, setStatus] = useState(false)
  const [productions, setProductions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)
  const [completedProductions, setCompletedProductions] = useState(0)  

  const [message, setMessage] = useState("")
    const [messageId, setMessageId] = useState("")

  const [tempData, setTempData] = useState(0)
   const ProductionPerPage=7;
   const pagesVisited = pageNumber * ProductionPerPage;

    useEffect(()=>{
      getAllProduction();
      
    },[])

    const getAllProduction = () =>{
      axios.get(url+"/production").then((response)=>{
        const result = response.data;
        if(result.status ==="success")
        setProductions(result.data);
      })
    }
   const displayProduction = productions
    .slice(pagesVisited, pagesVisited + ProductionPerPage)
    .map((production) => {
      return (
        <tr>
          <td>{production.clientOrderId}</td>
          <td>{production.clientName}</td>
          <td>{production.productName}</td>
          <td>{production.requiredQuantities}</td>
          <td>{production.deliveryDate}</td>
          <td>{production.availableStock}</td>
          <td>{production.producedStock}</td>
          <td className="status">
            {
              production.requiredQuantities <= (production.availableStock+production.producedStock)&&  (
                <p className="done">Done</p>
              )
            }
            {
              production.requiredQuantities >= (production.availableStock+production.producedStock)&&  (
                <p className="pending">Pending</p>
              )
            }
          </td>
          <td>
          <button onClick={()=>insertProductionRecord(production)}  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#productionadd-staticBackdrop">
            <ShoppingCartIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          </td>
        </tr>
      );
    });
    const pageCount = Math.ceil(productions.length / ProductionPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
   
  const productionHistory = () =>{
    history.push("/productionhistory")
  }

  const insertProductionRecord = (production) =>{
    setCompletedProductions(production)
  }

  let sum =0;
  const getAllProducedStock = (clientOrderId) =>{
    axios.get(url+"/productionhistory/"+clientOrderId).then((response)=>{
      const result = response.data;
      if(result.status ="success"){
        result.data.map((productionHistory)=>{
          sum = sum+productionHistory.producedStock
          
        })
      }
      console.log("sum == " +sum)
      setTotalStockProduced(sum)
      
      updateStock(clientOrderId,sum);
    })
  }

  const updateStock =(clientOrderId)=>{
    console.log(clientOrderId)
    const data = new FormData();
    data.append("clientId",tempData.clientId)
    data.append("productNo",tempData.productNo)
    data.append("requiredQuantities",tempData.requiredQuantities)
    data.append("availableStock",tempData.availableStock)
    data.append("producedStock",totalStockProduced)
    data.append("deliveryDate",tempData.deliveryDate)

    axios.put(url+"/production/"+clientOrderId,data).then((response)=>{
      const result = response.data;
      if(result.status==="success"){
        getAllProduction()
      }
      else{
        console.log(result.data)
      }
    })
  }

  if(messageId !== ""){
    setTimeout(changeID,5000);
  
  }
  function changeID (){
    setMessageId("crud-status-hide")
  }

    return (
        <>
        <ProductionRecordInsertModal setMessage={setMessage} setMessageId={setMessageId} completedProductions={completedProductions} getAllProducedStock={getAllProducedStock} getAllProduction={getAllProduction}/>
        <div className="page-container">
          <div className="page-header">
            <h4>Upcoming Production Details</h4>
          </div>
          <div className="page-updateStatus">
          <p id={`${messageId}`}>{message}</p>
          </div>
          <div className="page-table-div">
          <table id="page-table" class="table table-striped table-sm" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th class="th-sm">Client Order No.
                </th>
                <th class="th-sm">Client Name
                </th>
                <th class="th-sm">Product Name
                </th>
                <th class="th-sm">Required Qty.
                </th>
                <th class="th-sm">Delivery Date
                </th>
                <th class="th-sm">Available Qty.
                </th>
                <th class="th-sm">Completed Qty.
                </th>
                <th class="th-sm">Status
                </th>
                <th class="th-sm">Action {/*This will include a red mark if delievry date is closure and yet production is pending*/}
                </th>
              </tr>
            </thead>
            <tbody>
            {displayProduction}
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
            {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Insert Production Record</button> */}
            <button onClick={productionHistory}className="btn btn-warning productionHistory-btn">View Production History</button>
          </div>
        </div>
        </>
    )
}

export default ProductionLandingPage
