import React from 'react'
import axios from 'axios'
import { url } from '../../common/constants'

function DeliveryEditModal({order,refresh,setMessage,setMessageId}) {
    var editclientId = order.clientId
    var editProductNo = order.productNo
    var editRequiredQuantities =order.requiredQuantities
    var editDeliveryDate = order.deliveryDate

    const updateClientId =(clientId)=>{
        editclientId = clientId;
    } 
    const updateProductNo = (productNo) =>{
        editProductNo  = productNo;
    }
    const updateRequiredQuantities =(requiredQuantities)=>{
        editRequiredQuantities = requiredQuantities;
    }
    const updateDeliveryDate =(deliveryDate)=>{
        editDeliveryDate = deliveryDate;
    }
    const editOrder =() =>{
        const data = new FormData();
        data.append("clientId",editclientId)
        data.append("productNo",editProductNo)
        data.append("requiredQuantities",editRequiredQuantities)
        data.append("deliveryDate",editDeliveryDate)

        axios.put(url+"/upcomingdeliveries/"+order.clientOrderId,data).then((response)=>{
            const result = response.data;
            if(result.status=="success"){
                setMessage("Successfully Edited Order");
                setMessageId("crud-status-edited")
                refresh();
            }
        })
    }

    return (
        <>
            <div className="modal fade" id="orderEdit-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Order Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="client-order-number" className="col-form-label"  >Client Order ID:</label>
                        <input type="text" className="form-control" id="client-order-number" value={order.clientOrderId} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="client-number" className="col-form-label"  >Client No:</label>
                        <input type="text" className="form-control" id="client-number" defaultValue={editclientId} onChange={(e)=>updateClientId(e.target.value)} />
                    </div>
                    <div className="mb-1">
                        <label for="product-name" className="col-form-label" >Product No:</label>
                        <input type="text" className="form-control" defaultValue={editProductNo} onChange={(e)=>updateProductNo(e.target.value)} id="product-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="quantities" className="col-form-label" >Quantities:</label>
                        <input type="number" className="form-control" defaultValue={editRequiredQuantities} onChange={(e)=>updateRequiredQuantities(e.target.value)} id="quantities"/>
                    </div>
                    <div className="mb-1">
                        <label for="delivery-date" className="col-form-label" >Delivery Date:</label>
                        <input type="date" className="form-control" defaultValue={editDeliveryDate} onChange={(e)=>updateDeliveryDate(e.target.value)} id="delivery-date"/>
                    </div>
                </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editOrder}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default DeliveryEditModal
