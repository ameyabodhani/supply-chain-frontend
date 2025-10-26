import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ReactPaginate from 'react-paginate'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import SupplierComplaintsEdit from '../components/EditSupplierComplaints'
import { Link, useLocation } from 'react-router-dom'

import ViewListIcon from '@material-ui/icons/ViewList';
//import SupplierComplaintsDelete from '../components/DeleteSupplierComplaints';
//import AddSuppliersComplaints from '../components/AddSupplierComplaints';





import { url } from './../../../common/constants';
import AddSuppliersComplaints from './../../Supplier/AddSupplierComplaints';
import SupplierComplaintsEdit from './EditSupplierComplaints';
import SupplierComplaintsDelete from './DeleteSupplierComplaints';
import ComplaintDetails from './ComplaintsSupplierDetails';



const Complaints = () =>{
    const [suppliersComplaints,setSuppliersComplaints] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [supplierComplaints2, setSupplierComplaints2] = useState(0);
    const [message, setMessage] = useState("")
    const [editComplaints,  setEditComplaints] = useState(0);
    const [messageId, setMessageId] = useState("")
    const [suppliersComplaints1, setSuppliersComplaints1] = useState(0);
    const[isAdded, setIsAdded] = useState(false)
    const usersPerPage=7;
    const pagesVisited = pageNumber * usersPerPage;
 {/* const location = useLocation()
  const history = useHistory()
 const complaint= location.state.complaint*/}
 
    useEffect(() =>{
        console.log('SuppliersComplaints component get loaded')
        getSuppliersComplaints()},[])


        const getSuppliersComplaints = () =>{
            axios.get(url +'/scomplaints').then((response) =>{
                const result = response.data 
                
                if(result.status === 'success'){
                    setSuppliersComplaints(result.data)}
                    
                    else
                    {
                        console.log(result.data);
                      
                        alert('error while loading')
                    }
                
            })
        }
const displayContents = suppliersComplaints .slice(pagesVisited, pagesVisited + usersPerPage).map((complaints)=>{
  return (
    <tr>
      <td>{complaints.id}</td>
      <td>{complaints.sComplaintDesc}</td>
      <td>{complaints.quantityRejected}</td>
      <td>{complaints.supplierId}</td>
      <td>{complaints.clientId}</td>
      <td>{complaints.clientOrderId}</td>
      <td><button onClick={()=>EditSupplierComplaintDetails(complaints)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditComplaint">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>supplierComplaintDeleted(complaints)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#deletecomplaint">
            <DeleteIcon style={{fontSize:'20px'}}/>
          
            </button>

</td>
<td>
            <button onClick={()=>DetailedComplaint(complaints)}  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
  View
  </button>
            </td>
           
        </tr>
    
  )
})



















const pageCount = Math.ceil(suppliersComplaints.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};
 







const supplierComplaintDeleted=(complaints)=>{
  setSuppliersComplaints1(complaints);
}
const DetailedComplaint=(complaints)=>{
setSupplierComplaints2(complaints);
}


        const EditSupplierComplaintDetails=(complaints)=>{
            setEditComplaints(complaints);
          }
        const toggle =() =>{
          setIsAdded(true);
        }
        
        if(messageId !== ""){
          setTimeout(changeID,5000);
        
        }
        function changeID (){
          setMessageId("crud-status-hide")
        }
        return (
            <div className="page-container">
              <SupplierComplaintsEdit complaint={editComplaints} refresh={getSuppliersComplaints} setMessage={setMessage} setMessageId={setMessageId}/>   
           <AddSuppliersComplaints toggle={toggle} refresh={getSuppliersComplaints} setMessage={setMessage} setMessageId={setMessageId}/>
           <SupplierComplaintsDelete complaint={suppliersComplaints1} refresh={getSuppliersComplaints} setMessage={setMessage} setMessageId={setMessageId}/>
           < ComplaintDetails  complaint={supplierComplaints2} refresh={getSuppliersComplaints} setMessage={setMessage} setMessageId={setMessageId}/>
           <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
               <div className="page-header">
            <h4>Suppliers Complaints</h4>
          </div>
               <div className="page-table-div">
                <table id ="page-table"class="table table-striped table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                       
                        <th class="th-sm"> sComplaintId</th>
                       
   <th class="th-sm">sComplaintDesc</th>
   <th class="th-sm">quantityRejected</th>
 
  <th class="th-sm">supplierId</th> 
  <th class="th-sm">clientId</th>
  <th class="th-sm">orderId</th>
  <th></th>

<th></th>  </tr>
                    </thead>
                    
                    <tbody>
            {displayContents}
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
<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddSuppliersComplaints">Add SupplierComplaints</button>


{/*<button type="button" class="btn btn-success">Add Supplier </button>*/}
            </div>
         </div>  
            
        )
    
}


export default Complaints
