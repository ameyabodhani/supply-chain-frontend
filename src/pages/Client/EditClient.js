import React, { useState } from 'react'
import axios from 'axios'
import { url } from "../../common/constants"
function ClientEdit({clients,refresh,setMessage,setMessageId}){
    var editClientName = clients.clientName
    var editClientAddress = clients.clientAddress
    var editClientPhone = clients.clientPhone
    var editClientEmail = clients.email
    var editClientGstno = clients.clientGstno
    var editPincode = clients.pincode
    var editState = clients.state

const updateclientName =(name)=>{
    editClientName = name
}
const updateclientAddress =(address)=>{
    editClientAddress = address
}
const updateclientPhone =(phone)=>{
    editClientPhone = phone
}

const updateclientEmail =(email)=>{
    editClientEmail= email
}
const updateclientGstno =(gstno)=>{
    editClientGstno = gstno
}

const updateclientpincode =(pincode)=>{
    editPincode=pincode
}
const updateState =(state)=>{
    editState = state
}
const editClient=()=>{
    const data = new FormData();
    data.append("clientName",editClientName)
    data.append("clientAddress",editClientAddress)
    data.append("clientPhone",editClientPhone)
    data.append("email",editClientEmail)
    data.append("clientGstno",editClientGstno)
    data.append("pincode",editPincode)
    data.append("state",editState)
    axios.put(url+"/clients/"+clients.id,data).then((response)=>{
        const result = response.data;
        if(result.status === "success"){
            alert("Edited SuccessFully")
            setMessage("Successfully EditedClient");
            setMessageId("crud-status-edited")
            refresh();
        }
    })
}
return(
  <>
   
            <div className="modal fade" id="EditClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Client</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                 
                    <div className="mb-1">
                        <label for="name" className="col-form-label" >name</label>
                        <input type="text" className="form-control" defaultValue={editClientName} onChange={(e)=>updateclientName(e.target.value)} id="plant-number"/>
                    </div>
                    <div className="mb-1">
                        <label for="address" className="col-form-label" >Address</label>
                        <input type="text" className="form-control" defaultValue={editClientAddress} onChange={(e)=>updateclientAddress(e.target.value)} id="status"/>
                    </div>
                   
                    <div className="mb-1">
                        <label for="phone-number" className="col-form-label" >Phone</label>
                        <input type="number" className="form-control" defaultValue={editClientPhone} onChange={(e)=>updateclientPhone(e.target.value)} id="plant-number"/>
                    </div>  
                    <div className="mb-1">
                        <label for="email" className="col-form-label" >Email</label>
                        <input type="email" className="form-control" defaultValue={editClientEmail} onChange={(e)=>updateclientEmail(e.target.value)} id="plant-number"/>
                    </div>
                    <div className="mb-1">
                        <label for="gst" className="col-form-label" >Gst</label>
                        <input type="text" className="form-control" defaultValue={editClientGstno} onChange={(e)=>updateclientGstno(e.target.value)} id="plant-number"/>
                    </div>

                  
                    <div className="mb-1">
                        <label for="pincode" className="col-form-label" >pincode</label>
                        <input type="number" className="form-control" defaultValue={editPincode} onChange={(e)=>updateclientpincode(e.target.value)} id="plant-number"/>
                    </div> 
                    <div className="mb-1">
                        <label for="state" className="col-form-label" >state</label>
                        <input type="text" className="form-control" defaultValue={editState} onChange={(e)=>updateState(e.target.value)} id="plant-number"/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editClient}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
        </>
   
   
)
}
export default ClientEdit