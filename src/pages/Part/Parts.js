import ReactPaginate from 'react-paginate'
import { useState,useEffect } from 'react'
import { url } from '../../common/constants';
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from 'react-router-dom';

const Parts=()=>{
    const [parts, setParts] = useState([]);
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;

    const pagesVisited = pageNumber * usersPerPage;
    
    useEffect(()=>{
      getAllParts();
  },[])
  
  const getAllParts =()=>{
    axios.get(url+"/parts").then((response)=>{
  const result = response.data;
  if(result.status ==="success"){
      setParts(result.data) 
  }
  else{
    alert("Some error occured parts cannot be fetched !")
  }
    })
  }
    const PartRow = parts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((part) => {
      return (
        <tr>
        <td >{part.partId}</td>
        <td>{part.partName}</td>
        <td>{part.partPrice}</td>
        <td>{part.availableStock}</td>
        
        </tr>
      );
    });
    const pageCount = Math.ceil(parts.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };




    return (
        <div className="page-container">
          <div className="page-header">
            <h4>All Parts</h4>
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
          </div>
          <Link to="/vendors">
          <div className="page-button-div">
            <button className="btn btn-danger">Back</button>
          </div>
          </Link>
          <Link to="/orders">
          <div className="page-button-div">
            <button className="btn btn-success">View Order</button>
          </div>
          </Link>
        </div>
        
    )
}

export default Parts