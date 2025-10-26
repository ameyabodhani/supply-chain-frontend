import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { url } from '../../common/constants'

const AddVendor=({toggle, refresh})=> {

    const [id, setId] = useState(0)
    const [vendorName, setName] = useState('')
    const [vendorEmail, setEmail] = useState('')
    const [vendorPhone,setPhone]=useState('')
    const [vendorAddress, setAddress]=useState('')
    const [vendorCity, setCity]=useState('')
    const [vendorState, setState]=useState('')
    const [vendorPincode,setPincode]=useState('')
    const [vendorGstno,setGstno]=useState('')
    const [isActive, setActive]=useState('')
    const [createdTimeStamp, setCreatedTimeStamp]=useState(Date)

    const history = useHistory()

    const addVendorToDB = () => {
        if(vendorName.length === 0) {
          alert('select first name')
        } else if (vendorEmail.length === 0) {
          alert('select email')
        }else if(vendorPhone.length === 0){
            alert('select phone')
        }
        else {
          // when a file needs to be uploaded use FormData
          const data = new FormData()
    
          // add the data
          data.append('id',id)
          data.append('vendorName',vendorName)
          data.append('vendorEmail',vendorEmail)
          data.append('vendorPhone',vendorPhone)
          data.append('vendorAddress',vendorAddress)
          data.append('vendorCity',vendorCity)
          data.append('vendorState',vendorState)
          data.append('vendorPincode',vendorPincode)
          data.append('vendorGstno',vendorGstno)
          data.append('isActive',isActive)
          data.append('createdTimeStamp',createdTimeStamp)
          
    
          // send the data to the API
          axios.post(url + '/vendors', data).then((response) => {
            const result = response.data
            if (result.status === 'success') {
              alert('successfully added an vendor')
              // go to the list of artists
              refresh();
            } else {
              alert('error while adding user')
            }
          })
        }
      }
    return (
        <>
      <div className="modal fade" id="AddVendor-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Add New Vendor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
              <div className="mb-1">
                  <input type="hidden" className="form-control" onChange={(e) => {
                setId(e.target.value)
              }}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-name" className="col-form-label">Name</label>
                  <input type="text" className="form-control" id="vendor-name" onChange={(e)=>setName(e.target.value)}/>
              </div>
              
              <div clclassNameass="mb-1">
                  <label for="vendor-email" className="col-form-label">Email :</label>
                  <input type="email" className="form-control" id="vendor-email" onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-phone" className="col-form-label">Phone :</label>
                  <input type="text" className="form-control" id="vendor-phone" onChange={(e)=>setPhone(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-address" className="col-form-label">Address :</label>
                  <input type="text" className="form-control" id="vendor-address" onChange={(e)=>setAddress(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-city" className="col-form-label">City :</label>
                  <input type="text" className="form-control" id="vendor-city" onChange={(e)=>setCity(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-state" className="col-form-label">State :</label>
                  <input type="text" className="form-control" id="vendor-state" onChange={(e)=>setState(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-pincode" className="col-form-label">Pincode :</label>
                  <input type="text" className="form-control" id="vendor-pincode" onChange={(e)=>setPincode(e.target.value)}/>
              </div>

              <div className="mb-1">
                  <label for="vendor-gstno" className="col-form-label">Gst No. :</label>
                  <input type="text" className="form-control" id="vendor-gstno" onChange={(e)=>setGstno(e.target.value)}/>
              </div>


              <div className="mb-1">
              <label for="vendor-status" className="col-form-label">isActive :</label>
                  <input type="text" className="form-control" id="vendor-isActive" onChange={(e)=>setActive(e.target.value)}/>
              </div>

              <div className="mb-1">
                <input type="hidden" className="form-control" id="vendor-createdTimeStamp" onChange={(e)=>setCreatedTimeStamp(e.target.value)}/>
              </div>
              </form> 
          </div>
          <div className="modal-footer">
              <button onClick={addVendorToDB} type="button" className="btn btn-success" data-bs-dismiss="modal">Add</button>
          </div>
          </div>
      </div>
      </div>
      </>

    )
}

export default AddVendor
