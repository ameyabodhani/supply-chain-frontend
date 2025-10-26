import axios from'axios'
import { useState, useEffect } from 'react';
import { Link ,useHistory } from 'react-router-dom';
import { url } from '../../common/constants';


const AddSuppliers = ({toggle, refresh,setMessage,setMessageId}) =>{
    const [sName,setSName] = useState('')
    const[sAddress,setSAddress] = useState('')
    const[sPhone,setSPhone] = useState('')
    const[sEmail,setSEmail] = useState('')

const  history = useHistory()

const addSuppliersToDB = () => {
    if(sName.length === 0){
    alert('Enter name ')
}else
 if(sAddress.length === 0){
     alert('Enter address')
 }
 else if(sPhone.length === 0){
     alert('Enter phone no')
 }
 else if (sEmail.length === 0){
     alert('Enter email')
 } else {
     const data= new FormData()
     data.append('sName',sName)
     data.append('sAddress',sAddress)
     data.append('sPhone',sPhone)
     data.append('sEmail',sEmail)
     axios.post(url +'/supplier',data).then((response)=>{
         const result = response.data
         if(result.status === 'success')
         {
             alert('Successfully added supplier')
            
             setMessage("Successfully Added Product");
                    setMessageId("crud-status-added")
                    refresh();
         }else{
             alert('error while adding supplier')
         }
     })
 }
}

   return (
     <div>
       <>

       <div class="modal fade" id="AddSupplier" tabindex="-1" role="dialog" aria-labelledby="AddSupplier" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="AddSupplier">AddSupplier</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Name</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Name"
      onChange={(e)=>setSName(e.target.value)} required />
    </div>
  
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
    onChange={(e)=>setSAddress(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="number">Phone</label>
    <input type="text" class="form-control" id="Phone" placeholder=""
    onChange={(e)=>setSPhone(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="text" class="form-control" id="Email" placeholder=""
      onChange={(e)=>setSEmail(e.target.value)} required />
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
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={addSuppliersToDB}>Add</button>
       
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
export default AddSuppliers
