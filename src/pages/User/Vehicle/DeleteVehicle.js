import axios from "axios";
import { url } from './../../../common/constants';

function VehicleDelete({vehicle,refresh,setMessage,setMessageId}){
    const deleteVehicle=()=>{
        axios.delete(url+"/vehicle/"+vehicle.vehicleId).then((response)=>{
const result = response.data;
if(result){
    alert("succesfully deleted vehicle with id"+vehicle.id)
    setMessage("Successfully Deleted vehicle");
    setMessageId("crud-status-deleted")
    refresh();
}

        })
    }
return (
    <>
<div className="modal fade" id="DeleteVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>Do you really want to delete vehicle- {vehicle.vehicleNo}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={deleteVehicle} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>


    </>

)




}
export default VehicleDelete