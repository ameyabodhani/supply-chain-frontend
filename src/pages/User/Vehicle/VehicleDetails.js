import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ReactPaginate from 'react-paginate'




import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { url } from './../../../common/constants';
import AddVehicles from './AddVehicles';
import VehicleEdit from './EditVehicle';
import VehicleDelete from './DeleteVehicle';

const Vehicles = () =>{
    const [vehicles,setvehciles] = useState([])
    const [message, setMessage] = useState("")
   const[vehicle,setVehicle]=useState(0)
    const [messageId, setMessageId] = useState("")
    const[isAdded, setIsAdded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const[editVehicle,setEditVehicle]=useState(0)
  
    const usersPerPage=7;
   const pagesVisited = pageNumber * usersPerPage;
   
    useEffect(() =>{
        console.log('vehciles component get loaded')
        getVehicles()},[])


        const getVehicles = () =>{
            axios.get(url +'/vehicle').then((response) =>{
                const result = response.data 
                if(result.status === 'success'){
                    setvehciles(result.data)}
                    
                    else
                    {
                      
                        alert('error while loading')
                    }
                
            })
        }

const displayVehicles = vehicles
.slice(pagesVisited,pagesVisited+usersPerPage)
.map((vehicle)=>{
  return(
    <tr>
      <td>{vehicle.vehicleId}</td>
            
            

            <td>
                {vehicle.vehicleType}
            </td>
            
            <td>
                {vehicle.capacity}
               
            </td>
          
            <td>{vehicle.vehicleNo}</td>


      
            <td><button onClick={()=>{EditVehicleDetails(vehicle)}} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#EditVehicle">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button  onClick={()=>vehicleDetails(vehicle)}  className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#DeleteVehicle">
      <DeleteIcon style={{fontSize:'20px'}}/>
            
           </button>
      </td>
    </tr>
  )
})



const pageCount = Math.ceil(vehicles.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};
 


const vehicleDetails=(vehicle)=>{
setVehicle(vehicle)
}



const EditVehicleDetails=(vehicle)=>{
  setEditVehicle(vehicle);
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
               
                 
        <AddVehicles toggle={toggle} refresh={getVehicles} setMessage={setMessage} setMessageId={setMessageId}/>
                <VehicleEdit  vehicle={editVehicle} refresh={getVehicles} setMessage={setMessage} setMessageId={setMessageId}/>
          <VehicleDelete vehicle={vehicle}refresh={getVehicles} setMessage={setMessage} setMessageId={setMessageId}/>
        
          <div className="page-header">
            <h4 >Vehicles</h4>
           
        </div>
         <div className="page-updateStatus">
            <p id={`${messageId}`}>{message}</p>
          </div>
         
        
           
               <div className="page-table-div">
                <table id ="page-table"class="table table-striped table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th class="th-sm-id">vehicleId</th>
   <th class="th-sm">vehicleType</th>
   <th class="th-sm">capacity</th>
   <th class="th-sm">vehicleNo</th>
  
 <th>

 </th>
<th></th>
  </tr>
                    </thead>
                    
                   
                    <tbody>
                 {displayVehicles}
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
<button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddVehicle">Add Vehicle</button>

</div>
{/*<button type="button" class="btn btn-success">Add Supplier </button>
            </div>*/}
         </div>  
            
        )
    
}


export default Vehicles
