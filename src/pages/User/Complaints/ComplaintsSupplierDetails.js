import React from 'react'
import axios from'axios'
import { url } from './../../../common/constants';


 function ComplaintDetails({complaint,refresh,setMessage,setMessageId}){
     const DetailedComplaint=()=>{
         axios.get(url+"/scomplaints/"+complaint.id).then((response)=>{
             const result = response.data;
             if(result.status === 'success'){
                setMessage("Successfully got details");
               
                refresh();
    
             }
         })
     }
return (
    <>
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"> <h5>Complaint Description</h5></h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div  >
          <table class="table table-bordered table-dark">
  <thead>
    <tr>
    
    </tr>
  </thead>
  <tbody>
    <tr>
     
      <td>complaintId</td>
      <td colspan="2">{complaint.id}</td>
     
    </tr>
    <tr>
     
      <td colSpan="2">complaint Description</td>
      <td>{complaint.sComplaintDesc}</td>
    
    </tr>
    <tr>
     
      <td colspan="2">quantityRejected</td>
      <td>{complaint.quantityRejected}</td>
    </tr>
    <tr>
     
     <td colspan="2">sDateComplaint</td>
     <td>{complaint.sDateComplaint}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierId</td>
     <td>{complaint.supplierId}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierName</td>
     <td>{complaint.supplierName}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierAddress</td>
     <td>{complaint.supplierAddress}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierPhone</td>
     <td>{complaint.supplierPhone}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierEmail</td>
     <td>{complaint.supplierEmail}</td>
   </tr>
   <tr>
     
     <td colspan="2">supplierAddress</td>
     <td>{complaint.supplierAddress}</td>
   </tr>
   <tr>
     
     <td colspan="2">clientId</td>
     <td>{complaint.clientId}</td>
   </tr>
   <tr>
     
     <td colspan="2">clientName</td>
     <td>{complaint.clientName}</td>
   </tr>
   <tr>
     
     <td colspan="2">clientPhone</td>
     <td>{complaint.clientPhone}</td>
   </tr>
   <tr>
     
     <td colspan="2">clientAddress</td>
     <td>{complaint.clientAddress}</td>
   </tr>
   <tr>
     
     <td colspan="2">Vehicle</td>
     <td>{complaint.vehicleId}</td>
   </tr>
   <tr>
     
     <td colspan="2">VehicleCapacity</td>
     <td>{complaint.capacity}</td>
   </tr>
   <tr>
     
     <td colspan="2">VehicleNo</td>
     <td>{complaint.vehicleNO}</td>
   </tr>
   
  </tbody>
</table>
            
        </div>
      </div>
      <div class="modal-footer">
        <button  onClick={DetailedComplaint} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>



    </>
)




}
export default  ComplaintDetails