import React from 'react'
import axios from'axios'
import { url } from '../../common/url'
function UpcomingProductionDeleteModal({production,refresh,setMessage,setMessageId}) {
  /*  const deletePlant=()=>{
        axios.delete(url+"/production/"+production.clientOrderId).then((response)=>{
            const result = response.data;
            if(result){
                //alert("successfully deleted plant "+plant.plantName)
                setMessage("Successfully Deleted Upcoming Production");
            setMessageId("crud-status-deleted")
                refresh();
            }
        })
    }
    return (
        <>
        <div className="modal fade" id="upcomingProductiondelete-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete Plant</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <p>Do you really want to delete client Order - {production.clientOrderId}</p>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={deletePlant} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
        </div>
    </>
    )*/
}

export default UpcomingProductionDeleteModal
