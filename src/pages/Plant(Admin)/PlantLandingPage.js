import React, { useEffect, useState } from 'react'
import '../ProductsDetails.css'
import ReactPaginate from 'react-paginate'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { url } from '../../common/constants';
import axios from 'axios';
import AddPlantModal from './AddPlantModal';
import PlantsDetailsDeleteModal from './PlantsDetailsDeleteModal';
import PlantsDetailsEditModal from './PlantsDetailsEditModal';

function PlantLandingPage() {
    const [plants, setPlants] = useState([]);
   const [pageNumber, setPageNumber] = useState(0)
   const [deletePlant, setDeletePlant] = useState(0);/*This is for deleting */
   const [editPlant, setEditPlant] = useState(0);/*This is for editing */
   const[isAdded, setIsAdded] = useState(false)
   const [message, setMessage] = useState("")
    const [messageId, setMessageId] = useState("")


   const usersPerPage=7;
   const pagesVisited = pageNumber * usersPerPage;
useEffect(()=>{
    getAllPlants();
},[])

const getAllPlants =()=>{
  axios.get(url+"/plant").then((response)=>{
const result = response.data;
if(result.status =="success"){
    setPlants(result.data) 
}
else{
  alert("Some error occured plants cannot be fetched !")
}
  })
}

   const displayContents = plants
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((plant) => {
      return (
        <tr>
          <td >{plant.plantNo}</td>
          <td>{plant.plantName}</td>
          <td>{plant.totalCapacity}</td>
          <td className="status">
            <p className={`${plant.status}`}>{plant.status}</p>
          </td>
          <td><button onClick={()=>editPlantDetails(plant)} className="btn btn-success  btn-page-edit" data-bs-toggle="modal" data-bs-target="#plantEdit-staticBackdrop">
            <EditIcon style={{fontSize:'20px', paddingBottom:'2px'}}/>
            </button>
          <button onClick={()=>deletePlantDetails(plant)} className="btn btn-secondary  btn-page-delete" data-bs-toggle="modal" data-bs-target="#plantDelete-staticBackdrop">
            <DeleteIcon style={{fontSize:'20px'}}/>
            </button>
            </td>
        </tr>
      );
    });
    const pageCount = Math.ceil(plants.length / usersPerPage);
 
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
   
  const deletePlantDetails=(plant)=>{
    setDeletePlant(plant);
  }
  const editPlantDetails=(plant)=>{
    setEditPlant(plant);
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
           <PlantsDetailsDeleteModal plant={deletePlant} refresh={getAllPlants} setMessage={setMessage} setMessageId={setMessageId}/>
           <PlantsDetailsEditModal plant={editPlant} refresh={getAllPlants} setMessage={setMessage} setMessageId={setMessageId}/>
          <AddPlantModal refresh={getAllPlants} setMessage={setMessage} setMessageId={setMessageId}/>
          <div className="page-header">
            <h4>Manage Plant</h4>
          </div>
          <div className="page-updateStatus">
          <p id={`${messageId}`}>{message}</p>
          </div>
          <div className="page-table-div">
          <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th class="th-sm id">Plant No
                </th>
                <th class="th-sm">Plant Name
                </th>
                <th class="th-sm">Total Capacity
                </th>
                <th class="th-sm">Status
                </th>
                <th class="th-sm">Action
                </th>
              </tr>
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
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPlant-staticBackdropAddNewProduct">Add New Plant</button>
          </div>
        </div>
        
    )
}

export default PlantLandingPage
