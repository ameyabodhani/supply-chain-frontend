import React, { useEffect, useState } from 'react'
import '../ProductsDetails.css'
import './ProductionHistory.css'
import ReactPaginate from 'react-paginate';
//import ProductionHistoryModal from '../components/ProductionHistoryModal';
import { useHistory } from 'react-router';
import axios from 'axios';
import { url } from '../../common/constants';

function ProductionHistory() {
  let history = useHistory();
   const [pageNumber, setPageNumber] = useState(0)
   const [productionHistory, setProductionHistory] = useState([]);
const [totalProduction, setTotalProduction] = useState(0)
   const ProductionPerPage=7;
   const pagesVisited = pageNumber * ProductionPerPage;

    useEffect(()=>{
      getAllProductionHistory();
    },[])

    const getAllProductionHistory = () =>{
      axios.get(url+"/productionhistory").then((response)=>{
        const result = response.data;
        if(result.status ="success"){
          setProductionHistory(result.data);
          var sum=0;
          result.data.map((rslt)=>{
            sum = sum + rslt.producedStock
          })
          setTotalProduction(sum)
        
        }
      })
    }

    const displayProductionHistory = productionHistory
    .slice(pagesVisited, pagesVisited + ProductionPerPage)
    .map((productionhistory) => {
      return (
        <tr>
          <td>{productionhistory.clientOrderId}</td>
          <td>{productionhistory.clientName}</td>
          <td>{productionhistory.productName}</td>
          <td>{productionhistory.producedStock}</td>
          <td>{productionhistory.deliveryDate}</td>
          <td>{productionhistory.dateOfProduction}</td>
        </tr>
      );
    });
    const pageCount = Math.ceil(productionHistory.length / ProductionPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

   const gotoProduction = () =>{
    history.push("/production")
   }
    return (
        <div className="page-container">
          {/* <ProductionHistoryModal/> */}
          <div className="page-header">
            <h4>Production History</h4>
          </div>
          <div className="page-table-div">
          <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
            <thead>
              <tr>
              <th class="th-sm">Client Order No
                </th>
                <th class="th-sm">Client Name
                </th>
                <th class="th-sm">Product Name
                </th>
                <th class="th-sm">Produced Qty
                </th>
                <th class="th-sm">Delivery Date
                </th>
                <th class="th-sm">Production Date
                </th> 
              </tr>
            </thead>
            <tbody>
            {displayProductionHistory}
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
            {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Search</button> */}
            <button onClick={gotoProduction} className="btn btn-warning productionHistory-btn">Back</button>
            <div className="productionHistory-total">
            <label for="totalQuantities" className="col-form-label" id="totalQuantities-label">Total Quantities : </label>
            <input type="text" className="form-control" id="totalQuantities" readOnly value={totalProduction + "  Cars"}/>
            </div>
          </div>
        </div>
    )
}

export default ProductionHistory
