import React from 'react'
import axios from'axios'
import { url } from '../../common/constants'

function DeliveryDeleteModal({order,refresh,setMessage,setMessageId}) {
    const deleteOrder=()=>{
        axios.delete(url+"/upcomingdeliveries/"+order.clientOrderId).then((response)=>{
            const result = response.data;
            if(result){
                setMessage("Successfully Deleted Order");
                setMessageId("crud-status-deleted")
                refresh();
            }
        })
    }
    return (
        <>
        <div className="modal fade" id="orderDelete-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete Order</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <p>Do you really want to delete order - {order.clientOrderId}</p>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={deleteOrder} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}

export default DeliveryDeleteModal
