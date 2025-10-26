import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function AddPlantModal({refresh,setMessage,setMessageId}) {
    
    const [plantName, setPlantName] = useState("");
    const [totalCapacity, setTotalCapacity] = useState(0);
    const [availableCapacity, setAvailableCapacity] = useState(0);
    const [status, setStatus] = useState("");

    const addNewPlant = () =>{
           const data = new FormData();
           
            data.append("plantName",plantName)
            data.append("totalCapacity",totalCapacity)
            data.append("availableCapacity",availableCapacity)
            data.append("status",status)

            axios.post(url+"/plant",data).then((response)=>{
                const result = response.data;
                console.log(result)
                if(result.status=="success"){
                    //alert("Successfully added product")
                    setMessage("Successfully Added Plant");
                    setMessageId("crud-status-added")
                    refresh();
                }
            })
 

    
}


    return (
        <div>
            <>
            <div className="modal fade" id="addPlant-staticBackdropAddNewProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Add New Plant</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                <form>
                    <div className="mb-1">
                        <label htmlFor="plant-name" className="col-form-label">Plant Name:</label>
                        <input type="text" className="form-control" id="plant-name" 
                        onChange={(e)=>setPlantName(e.target.value)} required />
                    </div>  
                    <div className="mb-1">
                        <label htmlFor="total-capacity" className="col-form-label">Total Capacity :</label>
                        <input type="number" className="form-control" id="total-capacity" 
                        onChange={(e)=>setTotalCapacity(e.target.value)} required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="available-capacity" className="col-form-label">Available Capacity:</label>
                        <input type="text" className="form-control" id="available-capacity" 
                        onChange={(e)=>setAvailableCapacity(e.target.value)} required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="status" className="col-form-label">Status:</label>
                        <input type="text" className="form-control" id="status" 
                        onChange={(e)=>setStatus(e.target.value)} required/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={addNewPlant}>Add</button>
                </div>
                </div>
            </div>
            </div>
        </>
        </div>
    )
}

export default AddPlantModal
