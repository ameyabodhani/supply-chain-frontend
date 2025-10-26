import React from 'react'
import axios from'axios'
import { url } from "../../common/constants"

function ClientDelete({clients,refresh,setMessage,setMessageId}){
    const deleteClient=()=>{
        axios.delete(url+"/clients/"+clients.id).then((response)=>{
          const result = response.data;
          if(result){
            alert("successfully deleted client with Id "+clients.id)
            setMessage("Successfully Deleted client");
            setMessageId("crud-status-deleted")
            refresh(); 
          }  
        })
    }
    return (
        <>
       <div className="modal fade" id="DeleteClient" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete Client</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>Do you really want to delete client - {clients.clientName}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={deleteClient} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>
        </>

    )
}
export default ClientDelete