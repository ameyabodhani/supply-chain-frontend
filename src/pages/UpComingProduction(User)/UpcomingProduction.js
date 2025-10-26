import React, { useEffect, useState } from 'react'
import '../ProductsDetails.css'
import ReactPaginate from 'react-paginate'
import UpcomingProductionNewRecordModal from './UpcomingProductionNewRecordModal';
import { useHistory } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
//import UpcomingProductionDeleteModal from '../../components/User/UpcomingProductionDeleteModal';
import { url } from '../../common/constants'
import axios from 'axios';


function UpcomingProduction() {
  let history = useHistory();
  const [totalStockProduced, setTotalStockProduced] = useState(0)
  const [status, setStatus] = useState(false)
  const [productions, setProductions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0)
  const [completedProductions, setCompletedProductions] = useState(0)  
  const [deleteProduction, setDeleteProduction] = useState(0)

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
              production.requiredQuantities > (production.availableStock+production.producedStock)&&  (
                <p className="pending">Pending</p>
              )
            }
          </td>
          {/* <td>
          <button onClick={()=>deleteUpcomingProduction(production)} className="btn btn-secondary  btn-page-edit" data-bs-toggle="modal" data-bs-target="#upcomingProductiondelete-staticBackdrop">
          <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
          </td> */}
        </tr>
      );
    });
    const pageCount = Math.ceil(productions.length / ProductionPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
   
  const deleteUpcomingProduction=(production)=>{
    setDeleteProduction(production);
  }

 

  /*let sum =0;
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
      
     
    })
  }*/

  

  if(messageId !== ""){
    setTimeout(changeID,5000);
  
  }
  function changeID (){
    setMessageId("crud-status-hide")
  }

    return (
        <>
      
        <UpcomingProductionNewRecordModal getAllProduction={getAllProduction} setMessage={setMessage} setMessageId={setMessageId} /> 
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
            <button className="btn btn-warning productionHistory-btn" data-bs-toggle="modal" data-bs-target="#upcomingProduction-staticBackdrop">Add New Requirement</button>
          </div>
        </div>
        </>
    )
}




export default UpcomingProduction
