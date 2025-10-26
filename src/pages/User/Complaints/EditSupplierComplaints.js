import axios from 'axios';


import { url } from './../../../common/constants';

function SupplierComplaintsEdit({complaint,refresh,setMessage,setMessageId}){
    var editComplaintDesc = complaint.sComplaintDesc
    var editQuantityRejected = complaint.editquantityRejected
  /*  var editSupplierId = complaint.supplierId
    var editClientId = complaint.clientId*/
var editClientOrderId = complaint.clientOrderId
const updateComplaintDesc=(desc) =>{
    editComplaintDesc = desc;
}
const updateQuantityRejected=(quantity)=>{
    editQuantityRejected=quantity
}
/*const updateSupplierId=(supplierId)=>{
    editSupplierId=supplierId;
}
const updateClientId=(clientId)=>{
    editClientId=clientId
}*/
const updateClientOrderId=(clientOrderId)=>{
    editClientOrderId=clientOrderId
}

const editSupplierCom =()=>{
    const data = new FormData();
    data.append("sComplaintDesc",editComplaintDesc)
    data.append("quantityRejected",editQuantityRejected)
    //data.append("supplierId",editSupplierId)
    //data.append("clientId",editClientId)
    data.append("clientOrderId",editClientOrderId)
    axios.put(url+"/scomplaints/"+complaint.id ,data).then ((response)=>{
      
        const result = response.data ;
        if(result.status ==="success"){
            alert("Edited Successfully")
            setMessage("Successfully Edited Product");
            setMessageId("crud-status-edited")
            refresh();

        }
    })
}

return (
    <>
        <div className="modal fade" id="EditComplaint"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="EditComplaint" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="EditComplaint">Edit PComplaint</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
             {/* <div className="mb-1">
                <label for="ComplaintDesc " className="col-form-label" ></label>
                    <input type="hidden" className="form-control" defaultValue={editClientOrderId} onChange={(e)=>updateClientOrderId(e.target.value)} id="ComplaintDesc"/>
</div>*/}
                <div className="mb-1">
                    <label for="ComplaintDesc " className="col-form-label" >ComplaintDesc</label>
                    <input type="text" className="form-control" defaultValue={editComplaintDesc} onChange={(e)=>updateComplaintDesc(e.target.value)} id="ComplaintDesc"/>
                </div>
                <div className="mb-1">
                    <label for="quantity" className="col-form-label" >quantityRejected</label>
                    <input type="number" className="form-control" defaultValue={editQuantityRejected} onChange={(e)=>updateQuantityRejected(e.target.value)} id="quantity"/>
                </div>
              { /* <div className="mb-1">
                    <label for="SupplierId" className="col-form-label" >SuplierId</label>
                    <input type="number" className="form-control" defaultValue={editSupplierId } onChange={(e)=>updateSupplierId(e.target.value)} id="SupplierId"/>
                </div>
                <div className="mb-1">
                    <label for="ClientId" className="col-form-label" >ClientId</label>
                    <input type="number" className="form-control" defaultValue={editClientId } onChange={(e)=>updateClientId(e.target.value)} id="SupplierId"/>
</div>*/} 
<div className="mb-1">
                    <label for="quantity" className="col-form-label" >clientOrderId</label>
                    <input type="number" className="form-control" defaultValue={editClientOrderId} onChange={(e)=>updateClientOrderId(e.target.value)} id="quantity"/>
                </div>
                </form> 
            </div>
            <div className="modal-footer">
                <button onClick={editSupplierCom} type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
            </div>
            </div>
        </div>
        </div>
    </>
)

}
export default SupplierComplaintsEdit
