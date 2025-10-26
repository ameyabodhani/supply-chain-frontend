import React from 'react'
import axios from 'axios'
import { url } from '../../common/constants'

function PlantsDetailsEditModal({plant,refresh,setMessage,setMessageId}) {
    var editPlantName = plant.plantName
    var editTotalCapacity = plant.totalCapacity
    var editStatus =plant.status
    var editAvailableCapacity = plant.availableCapacity;

    const updatePlantName =(plantName)=>{
        editPlantName = plantName;
    }

    const updatePlantStatus = (status) =>{
        editStatus  = status;
    }
    const updateTotalCapacity =(totalCapacity)=>{
        editTotalCapacity = totalCapacity;
    }
    const updateAvailableCapacity =(availableCapacity)=>{
        editAvailableCapacity = availableCapacity;
    }

    const editPlant =() =>{
        const data = new FormData();
        data.append("plantName",editPlantName)
        data.append("status",editStatus)
        data.append("totalCapacity",editTotalCapacity)
        data.append("availableCapacity",editAvailableCapacity)

        axios.put(url+"/plant/"+plant.plantNo,data).then((response)=>{
            const result = response.data;
            if(result.status=="success"){
                setMessage("Successfully Edited Plant");
                setMessageId("crud-status-edited")
                refresh();
            }
        })
    }


    return (
        <>
            <div className="modal fade" id="plantEdit-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Plant Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="plant-number" className="col-form-label"  >Plant Number:</label>
                        <input type="text" className="form-control" id="plant-number" value={plant.plantNo} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="plant-name" className="col-form-label" >Plant Name:</label>
                        <input type="text" className="form-control" defaultValue={editPlantName} onChange={(e)=>updatePlantName(e.target.value)} id="plant-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="status" className="col-form-label" >Status:</label>
                        <input type="text" className="form-control" defaultValue={editStatus} onChange={(e)=>updatePlantStatus(e.target.value)} id="status"/>
                    </div>
                    <div className="mb-1">
                        <label for="total-capacity" className="col-form-label" >Total Capacity:</label>
                        <input type="text" className="form-control" defaultValue={editTotalCapacity} onChange={(e)=>updateTotalCapacity(e.target.value)} id="total-capacity"/>
                    </div>
                    <div className="mb-1">
                        <label for="available-capacity" className="col-form-label" >Available Capacity:</label>
                        <input type="text" className="form-control" defaultValue={editTotalCapacity} onChange={(e)=>updateAvailableCapacity(e.target.value)} id="available-capacity"/>
                    </div>
                </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editPlant}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default PlantsDetailsEditModal
