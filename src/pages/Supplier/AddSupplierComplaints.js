import React  from 'react'
import { useState } from 'react';
import axios from 'axios';

import { url } from './../../common/constants';
function AddSuppliersComplaints(){
 const[sComplaintsDesc,setSCompaintsDesc] = useState("")
 const[quantityRejected,setQuantityRejected] =  useState(0)
const[sDateComplaint,setSDateComplaint]=useState();
const[supplierId,setSupplierId] = useState(0)
const[clientId,setClientId] = useState(0)
const[clientOrderId,setClientOrderId]=useState(0)
const addNewSupplierComplaint = ({toggle, refresh,setMessage,setMessageId}) =>{
    const data = new FormData();
    data.append("sComplaintDesc",sComplaintsDesc)
    data.append("quantityRejected",quantityRejected)
  /*  data.append("supplierId",supplierId)
 data.append("clientId",clientId)*/
   data.append("clientOrderId",clientOrderId)
    axios.post(url+"/scomplaints",data).then((response)=>{
        console.log(response.data)
        const result = response.data;
        console.log(result.data)
        if(result.status === "success")
        {
            alert("Successfully added supplier")
  
        }
            
        }
    )
    }


return (
    <div>
<div class="modal fade" id="AddSuppliersComplaints" tabindex="-1" role="dialog" aria-labelledby="AddSuppliersComplaints" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="AddSuppliersComplaints">ADD Complaints</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-group">
    <label for="formGroupExampleInput">SComplainDesc</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"
    onChange={(e)=>setSCompaintsDesc(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">quantityRejected</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="" 
    onChange={(e)=>setQuantityRejected(e.target.value)} required />
  </div>
 {/* <div class="form-group">
    <label for="formGroupExampleInput2">supplierId</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder=""
    onChange={(e)=>setSupplierId(e.target.value)} required />
</div>*/}
  <div class="form-group">
    <label for="formGroupExampleInput2"></label>
    <input type="hidden" class="form-control" id="formGroupExampleInput2" placeholder="" 
    onChange={(e)=>setSDateComplaint(e.target.value)} required />
  </div>
 { /*<div class="form-group">
    <label for="formGroupExampleInput2">Client Id</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="" 
    onChange={(e)=>setClientId(e.target.value)} required />
</div>*/}
<div class="form-group">
    <label for="formGroupExampleInput2">orderId</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="" 
    onChange={(e)=>setClientOrderId(e.target.value)} required />
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
      <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={ addNewSupplierComplaint}>Add</button>
                </div>
    </div>
  </div>
</div>
    </div>
)

}
export default AddSuppliersComplaints