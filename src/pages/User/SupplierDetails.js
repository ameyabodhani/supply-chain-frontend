import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../ProductsDetails.css'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
//import { url } from '../common/constants';
import { url } from "../../common/constants"


const Suppliers = () =>{
    const [suppliers,setSuppliers] = useState([])
    const [message, setMessage] = useState("")
   const[supplier,setSupplier]=useState(0)
    const [messageId, setMessageId] = useState("")
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const[editSupplier,setEditSupplier]=useState(0)
  
    const usersPerPage=7;
   const pagesVisited = pageNumber * usersPerPage;
   
    useEffect(() =>{
        console.log('Suppliers component get loaded')
        getSuppliers()},[])


        const getSuppliers = () =>{
            axios.get(url +'/supplier').then((response) =>{
                const result = response.data 
                if(result.status === 'success'){
                    setSuppliers(result.data)}
                    
                    else
                    {
                      
                        alert('error while loading')
                    }
                
            })
        }

const displaySuppliers = suppliers
.slice(pagesVisited,pagesVisited+usersPerPage)
.map((supplier)=>{
  return(
    <tr>
      <td>{supplier.id}</td>
            
            <td>{supplier.sName}</td>
            
            

            <td>
                {supplier.sAddress}
            </td>
            
            <td>
                {supplier.sPhone}
               
            </td>
          
            <td>{supplier.sEmail}</td>

           
           
    </tr>
  )
})



const pageCount = Math.ceil(suppliers.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};
 


const SupplierDetails=(supplier)=>{
setSupplier(supplier)
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
               
                 
              
          <div className="page-header">
            <h4 >Suppliers</h4>
           
        </div>
         <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
         
        
           
               <div className="page-table-div">
                <table id ="page-table"class="table table-striped table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th class="th-sm-id">SupplierId</th>
   <th class="th-sm">Name</th>
   <th class="th-sm">Address</th>
   <th class="th-sm">Phone</th>
  <th class="th-sm">Email</th> 
 <th>

 </th>
<th></th>
  </tr>
                    </thead>
                    
                   
                    <tbody>
                 {displaySuppliers}
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

{/*<button type="button" class="btn btn-success">Add Supplier </button>*/}
            </div>
         </div>  
            
        )
    
}


export default Suppliers
