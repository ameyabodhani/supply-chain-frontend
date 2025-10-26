import axios from "axios";
import { url } from '../../common/constants';
function SupplierDelete({supplier,refresh,setMessage,setMessageId}){
    const deleteSupplier=()=>{
        axios.delete(url+"/supplier/"+supplier.id).then((response)=>{
const result = response.data;
if(result){
    alert("succesfully deleted supplier with id"+supplier.id)
    setMessage("Successfully Deleted Product");
    setMessageId("crud-status-deleted")
    refresh();
}

        })
    }
return (
    <>
<div className="modal fade" id="DeleteSupplier" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>Do you really want to delete supplier - {supplier.sName}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={deleteSupplier} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>


    </>

)




}
export default SupplierDelete