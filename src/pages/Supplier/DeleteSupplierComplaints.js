import axios from "axios";
import { url } from '../../common/constants';
const SupplierComplaintsDelete=({complaint,refresh,setMessage,setMessageId})=>{
    const deleteComplaint=()=>{
        axios.delete(url+"/scomplaints/"+complaint.id).then((response)=>{
            const result = response.data;
            if(result.status ==="success"){
                alert("Do you really want to delete")
                setMessage("Successfully Deleted Product");
                setMessageId("crud-status-deleted")
                refresh();
            }
        })
    }
    return (
        <>
            <div className="modal fade" id="deletecomplaint" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deletecomplaint" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="deletecomplaint">Delete Complaint</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>Do you really want to delete complaint</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={deleteComplaint} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default SupplierComplaintsDelete