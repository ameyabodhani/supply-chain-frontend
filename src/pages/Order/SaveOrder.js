import ReactPaginate from 'react-paginate'
import { useState,useEffect } from 'react'
import { url } from '../../common/constants';
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCartAction } from './actions/cartActions';


const SaveOrder=()=>{
  
    const [parts, setParts] = useState([]);
    const [quantityOrdered,setQuantityOrdered]=useState(0)
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;
    
    const pagesVisited = pageNumber * usersPerPage;
    
    useEffect(()=>{
      getAllParts();
  },[])
  
  
  const getAllParts =()=>{
    axios.get(url+"/parts/partDto").then((response)=>{
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
        <td>
        <div className="mb-1">
                <label for="quantity" className="col-form-label">Quantity</label>
                    
                <input type="number" className="form-control" onChange={(e) => {
                  setQuantityOrdered(e.target.value)
                }}/>
                </div>
        </td>
        <td>
        <button onClick={()=>{addToCart({part,quantityOrdered})}} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#QuantityOrdered-staticBackdrop">
            <AddShoppingCartIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>&nbsp;&nbsp;
        
        </td>
        </tr>
      );
    });
    const pageCount = Math.ceil(parts.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

      
      //used to send action
      const dispatch=useDispatch()
      const addToCart=(p)=>{
        dispatch(addToCartAction(p))
      }


    return (
        <div className="page-container">
          <div className="page-header">
            <h4>Add Parts To Cart</h4>
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
                <th class="th-sm">Input
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
        </div>
        <Link to="/orders">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>
        <Link to="/cart">
        <div className="page-button-div">
          <button className="btn btn-info">Show Cart</button>
        </div>
        </Link>
    </div>
        
    )
}

export default SaveOrder