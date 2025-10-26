import { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import axios from "axios";
import { url } from "../../common/constants";
import { useLocation ,useHistory} from "react-router";
import AddPart from "./AddPart";
const ViewParts=()=>{
 
  const [parts, setParts] = useState([]);
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;


    
    const pagesVisited = pageNumber * usersPerPage;

    const location = useLocation()

    const history = useHistory()

    const vendor = location.state.vendor
    useEffect(()=>{
      getAllVendorParts();
  },[])
  
  const getAllVendorParts =()=>{
    axios.get(url+'/parts/vendor/parts/'+vendor.id).then((response)=>{
  const result = response.data;
  if(result.status ==="success"){
      setParts(result.data) 
  }
  else{
    alert("Some error occured parts cannot be fetched !")
  }
    })
  }

    const viewPartRow = parts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((part) => {
      return (
        <tr>
        <td >{part.partId}</td>
        <td>{part.partName}</td>
        <td>{part.partPrice}</td>
        <td>{part.availableStock}</td>
        <td>
        <button  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#OrderParts-staticBackdrop">
            <AddShoppingCartIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>&nbsp;&nbsp;
        
        <button  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#RemovePartsFromOrder-staticBackdrop">
            <RemoveShoppingCartIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
        </td>
        </tr>
      );
    });
    
    const pageCount = Math.ceil(parts.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

      const toggle =() =>{
        setIsAdded(true);
      }
    return (
        <div className="page-container">
          <AddPart vendor={vendor} toggle={toggle} refresh={getAllVendorParts}/>
        <div className="page-header">
          <h4>Parts </h4>
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
              <th class="th-sm">Action
              </th>
            </tr>
          </thead>
          <tbody>
          {viewPartRow}
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
            <button onClick={()=>(vendor)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddPart-staticBackdrop">Add Part</button>
          </div>
        <Link to="/vendors">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>
      </div>
      
    )
}   
export default ViewParts