import axios from'axios'
import { useState, useEffect } from 'react';
import { Link ,useHistory } from 'react-router-dom';
import { url } from '../../../common/constants';



const AddVehicles = ({toggle, refresh,setMessage,setMessageId}) =>{
    const [vehicleId,setVehicleId] = useState(0)
  const[vehicleType,setVehicleType] = useState('')
    const[capacity,setCapacity] = useState(0)
    const[vehicleNo,setVehicleNo] = useState(0)

const  history = useHistory()

const addVehiclesToDB = () => {
   
     const data= new FormData()
     data.append('vehicleID',vehicleId)
     data.append('vehicleType',vehicleType)
     data.append('capacity',capacity)
     data.append('vehicleNo',vehicleNo)
     axios.post(url +'/vehicle',data).then((response)=>{
         const result = response.data
         if(result.status === 'success')
         {
             alert('Successfully added vehicle')
            
             setMessage("Successfully Added vehicle");
                    setMessageId("crud-status-added")
                    refresh();
         }else{
             alert('error while adding vehicle')
         }
     })
 }


   return (
     <div>
       <>

       <div class="modal fade" id="AddVehicle" tabindex="-1" role="dialog" aria-labelledby="AddVehicle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="AddVehicle">AddVehicle</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-row">
   
  
  </div>
  <div class="form-group">
    <label for="inputId"></label>
    <input type="hidden" class="form-control" id="inputId" placeholder=""
    onChange={(e)=>setVehicleId(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="type">Type</label>
    <input type="text" class="form-control" id="type" placeholder=""
    onChange={(e)=>setVehicleType(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="number">capacity</label>
    <input type="number" class="form-control" id="number" placeholder=""
      onChange={(e)=>setCapacity(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="text">vehicleNo</label>
    <input type="text" class="form-control" id="textr" placeholder=""
      onChange={(e)=>setVehicleNo(e.target.value)} required />
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
 
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={addVehiclesToDB}>Add</button>
       
      </div>
    </div>
  </div>
</div>
       
       </>

     </div>
   )
  





























  /*  <div>
      <h1 className="page-title">Add Supplier</h1>

      <div className="mb-3">
        <label htmlFor=""> Name</label>
        <input
          onChange={(e) => {
            setSName(e.target.value)
          }}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Address</label>
        <input
          onChange={(e) => {
            setSAddress(e.target.value)
          }}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Phone</label>
        <input
          onChange={(e) => {
            setSPhone(e.target.value)
          }}
          type="number"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Email</label>
        <input
          onChange={(e) => {
            setSEmail(e.target.value)
          }}
          type="email"
          className="form-control"
        />
      </div>
      <div>
      <div className="mb-3">
        <button onClick={addSuppliersToDB} className="btn btn-success">
          Add
        </button>
        </div>
        <Link to="/suppliers">
          <a className="btn btn-warning">Back</a>
        </Link>
      </div>
    </div>
  )
}*/


}
export default AddVehicles
