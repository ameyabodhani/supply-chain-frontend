import axios from "axios";
import { url } from './../../../common/constants';

function VehicleEdit({vehicle,refresh,setMessage,setMessageId}){
    var editVehicleId=vehicle.vehicleId;
    var editVehicleType = vehicle.vehicleType
    var editCapacity =vehicle.capacity;
    var editVehicleNo =vehicle.vehicleNo ;
   
const updatevehicleId=(vehicleId)=>{
    editVehicleId=vehicleId
}

const updatevehicleType=(vehicleType)=>{
    editVehicleType=vehicleType
}
const updatecapacity = (capacity)=>{
    editCapacity=capacity
}
const updatevehicleNo = (vehicleNo)=>{
    editVehicleNo=vehicleNo
}
const editVehicle=()=>{
    
   
    const data = new FormData();
    data.append('vehicleId',editVehicleId)
     data.append('vehicleType',editVehicleType)
     data.append('capacity',editCapacity)
     data.append('vehicleNo',editVehicleNo)

axios.put(url+"/vehicle/"+vehicle.vehicleId,data).then((response)=>{
    const result = response.data;
    if(result.status ==="success"){
        alert("Edit Successfully")
        setMessage("Successfully Edit vehicle");
        setMessageId("crud-status-edited")
        refresh();
    }

})
}
return (
    <>
      <div className="modal fade" id="EditVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Vehicle</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="id" className="col-form-label"  >Vehicle Id</label>
                        <input type="text" className="form-control" id="id" value={vehicle.vehicleId} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="vehicleType" className="col-form-label" > Type</label>
                        <input type="text" className="form-control" defaultValue={editVehicleType} onChange={(e)=>updatevehicleType(e.target.value)} id="product-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="capacity" className="col-form-label" >Capacity</label>
                        <input type="number" className="form-control" defaultValue={editCapacity} onChange={(e)=>updatecapacity(e.target.value)} id="status"/>
                    </div>
                    <div className="mb-1">
                        <label for="text" className="col-form-label" >VehicleNo</label>
                        <input type="text" className="form-control" defaultValue={editVehicleNo} onChange={(e)=>updatevehicleNo(e.target.value)} id="plant-number"/>
                    </div>
                    
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editVehicle}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
</>
)

}
export default VehicleEdit