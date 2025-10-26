import axios from "axios";
import { url } from '../../common/constants';
function SupplierEdit({supplier,refresh,setMessage,setMessageId}){
    var editName = supplier.sName
    var editAddress = supplier.sAddress;
    var editPhone = supplier.sPhone;
    var editEmail = supplier.sEmail;

const updatesName = (sName) => {
    editName = sName
}
const updatesAddress=(sAddress)=>{
    editAddress=sAddress
}
const updatesPhone = (sPhone)=>{
    editPhone=sPhone
}
const updatesEmail = (sEmail)=>{
    editEmail=sEmail
}
const editSupplier=()=>{
    const data = new FormData();
    data.append("sName",editName)
    data.append("sAddress",editAddress)
    data.append("sPhone",editPhone)
    data.append("sEmail",editEmail)

axios.put(url+"/supplier/"+supplier.id,data).then((response)=>{
    const result = response.data;
    if(result.status ==="success"){
        alert("Edit Successfully")
        setMessage("Successfully Edit Supplier");
        setMessageId("crud-status-edited")
        refresh();
    }

})
}
return (
    <>
      <div className="modal fade" id="EditSupplier" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Supplier</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="id" className="col-form-label"  >Supplier Id</label>
                        <input type="text" className="form-control" id="id" value={supplier.id} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="supplier-name" className="col-form-label" > Name:</label>
                        <input type="text" className="form-control" defaultValue={editName} onChange={(e)=>updatesName(e.target.value)} id="product-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="address" className="col-form-label" >Address</label>
                        <input type="text" className="form-control" defaultValue={editAddress} onChange={(e)=>updatesAddress(e.target.value)} id="status"/>
                    </div>
                    <div className="mb-1">
                        <label for="number" className="col-form-label" >Phone :</label>
                        <input type="number" className="form-control" defaultValue={editPhone} onChange={(e)=>updatesPhone(e.target.value)} id="plant-number"/>
                    </div>
                    <div className="mb-1">
                        <label for="email" className="col-form-label" >Email</label>
                        <input type="email" className="form-control" defaultValue={editEmail} onChange={(e)=>updatesEmail(e.target.value)} id="plant-number"/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editSupplier}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
</>
)

}
export default SupplierEdit