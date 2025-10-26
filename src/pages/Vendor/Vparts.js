
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Vparts=()=>{
    const vendor=JSON.parse(localStorage.getItem('vendor'))

    const [parts, setParts] = useState([]);
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage=7;


    
    const pagesVisited = pageNumber * usersPerPage;
    useEffect(()=>{
        getAllVendorParts();
    },[])
    
    const getAllVendorParts =()=>{
    axios.get(`http://localhost:8080/parts/vendor/parts/${vendor.id}`).then((response)=>{
    const result = response.data;
    if(result.status ==="success"){
     // console.log(result.data)
        setParts(result.data) 
    }
    else{
      alert("Some error occured parts cannot be fetched !")
    }
    })
    }
  
    var data=parts
      const viewPartRow = data
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((part) => {
        return (
          <tr>
          <td >{part.partId}</td>
          <td>{part.partName}</td>
          <td>{part.partPrice}</td>
          <td>
          <button  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#OrderParts-staticBackdrop">
              <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
              </button>&nbsp;&nbsp;
          
          <button  className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#RemovePartsFromOrder-staticBackdrop">
              <DeleteIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
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
       
        <Link to="/">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link>
      </div>
      
    )
}

export default Vparts