import axios from'axios'
import { useState, useEffect } from 'react';
import { Link ,useHistory } from 'react-router-dom';
import { url } from "../../common/constants"



const AddClients = () =>{
    const [clientName,setClientName] = useState('')
    const[clientAddress,setClientAddress] = useState('')
    const[clientPhone,setClientPhone] = useState('')
    const[clientGstno,setClientGstno] = useState('')
    const[email,setEmail] = useState('')
    const[pincode,setPincode] = useState('')
    const[state,setState] = useState('')
const  history = useHistory()

const addClientsToDB = () => {
    if(clientName.length === 0){
    alert('Enter name ')
}else
 if(clientAddress.length === 0){
     alert('Enter address')
 }
 else if(clientPhone.length === 0){
     alert('Enter phone no')
 }
 else if (email.length === 0){
     alert('Enter email')
 } else {
     const data= new FormData()
     data.append('clientName',clientName)
     data.append('clientAddress', clientAddress)
     data.append('clientPhone', clientPhone)
     data.append('clientGstno',clientGstno)
     data.append('email',email)
     data.append('pincode',pincode)
     data.append('state',state)
     axios.post(url +'/clients',data).then((response)=>{
         const result = response.data
         if(result.status === 'success')
         {
             alert('Successfully added clients')
             history.push('/clients')
         }else{
             console.log(response.data);
             alert('error while adding clients')
         }
     })
 }
}








































return (
    <div>
        <>
      <div class="modal fade" id="AddClient" tabindex="-1" role="dialog" aria-labelledby="AddClient" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="AddClient">Add Client</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Name"
      onChange={(e)=>setClientName(e.target.value)} required />
    </div>
  
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
    onChange={(e)=>setClientAddress(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="number">Phone</label>
    <input type="text" class="form-control" id="Phone" placeholder=""
    onChange={(e)=>setClientPhone(e.target.value)} required />
  </div>



  <div class="form-group">
    <label for="gst">GstNo</label>
    <input type="text" class="form-control" id="gst" placeholder=""
      onChange={(e)=>setClientGstno(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="text" class="form-control" id="Email" placeholder=""
      onChange={(e)=>setEmail(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="pincode">Pincode</label>
    <input type="text" class="form-control" id="Pincode" placeholder=""
      onChange={(e)=>setPincode(e.target.value)} required />
  </div>
  <div class="form-group">
    <label for="state">State</label>
    <input type="text" class="form-control" id="state" placeholder=""
      onChange={(e)=>setState(e.target.value)} required />
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
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={addClientsToDB}>Add</button>
       
      </div>
    </div>
  </div>
</div>
       </>
          
    </div>
)
































/*return (
    <div>
      <h1 className="page-title">Add Clients</h1>

      <div className="mb-3">
        <label htmlFor=""> Name</label>
        <input
          onChange={(e) => {
            setClientName(e.target.value)
          }}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Address</label>
        <input
          onChange={(e) => {
            setClientAddress(e.target.value)
          }}
          type="text"
          className="form-control"
        />
         <div className="mb-3">
        <label htmlFor="">Phone no</label>
        <input
          onChange={(e) => {
          setClientPhone(e.target.value)
          }}
          type="number"
          className="form-control"
        />
      </div>
      </div>
      <div className="mb-3">
        <label htmlFor="">Gstno</label>
        <input
          onChange={(e) => {
            setClientGstno(e.target.value)
          }}
          type="number"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="">Email</label>
        <input
          onChange={(e) => {
            setClientEmail(e.target.value)
          }}
          type="email"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Pincode</label>
        <input
          onChange={(e) => {
            setPincode(e.target.value)
          }}
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">state</label>
        <input
          onChange={(e) => {
            setState(e.target.value)
          }}
          type="text"
          className="form-control"
        />
      </div>

      <div>
      <div className="mb-3">
        <button onClick={addClientsToDB} className="btn btn-success">
          Add
        </button>
        </div>
        <Link to="/clients">
          <a className="btn btn-warning">Back</a>
        </Link>
      </div>
    </div>
  )*/
}



export default AddClients
