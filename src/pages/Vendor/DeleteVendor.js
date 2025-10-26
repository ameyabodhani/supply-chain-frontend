import axios from "axios"
import { url } from '../../common/constants'

const DeleteVendor=({vendor,refresh})=>{
    const deleteVendor=()=>{
        axios.delete(url+"/vendors/"+vendor.id).then((response)=>{
            const result = response.data;
            if(result){
                alert("successfully deleted vendor "+vendor.id)
                refresh();
            }
        })
    }
    return (
        <>
        <div className="modal fade" id="DeleteVendor-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete Vendor</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <p>Do you really want to delete vendor - {vendor.vendorName}</p>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={deleteVendor} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}
export default DeleteVendor