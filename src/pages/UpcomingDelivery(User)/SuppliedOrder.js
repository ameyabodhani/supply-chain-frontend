import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function SuppliedOrder({suppliedOrder,setMessage,setMessageId}) {
var supplierNo=0;
var vehicleId=0
const setSupplierNo=(value)=>{
    supplierNo = Number(value);
}

const setVehicleId =(value)=>{
    vehicleId= Number(value);
}
const addSuppliedOrder =()=>{
    const data = new FormData();
    console.log("supplierId  "+supplierNo);
    console.log("vehicleId "+vehicleId);
    data.append("clientOrderId",suppliedOrder.clientOrderId)
    data.append("clientId",suppliedOrder.clientId)
    data.append("productNo",suppliedOrder.productNo)
    data.append("requiredQuantities",suppliedOrder.requiredQuantities)
    data.append("orderDate",suppliedOrder.orderDate)
    data.append("deliveryDate",suppliedOrder.deliveryDate)
    data.append("supplierId",supplierNo)
    data.append("vehicleId",vehicleId)

    axios.post(url+"/suppliedOrder",data).then((response)=>{
        const result = response.data;
        console.log(result);
        if(result.status=="success"){
           
            setMessage("Order Delivered Successfully");
            setMessageId("crud-status-added")
           
            
        }
    })
}


    return (
        <>
            <div className="modal fade" id="staticBackdropSuppliedOrder" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Supplied Order Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                <form>
                    <div className="mb-1">
                        <label htmlFor="ClientOrderNo" className="col-form-label">Client Order No:</label>
                        <input type="text" className="form-control" id="ClientOrderNo" 
                        value={suppliedOrder.clientOrderId}required readOnly/>
                    </div>  
                    <div className="mb-1">
                        <label htmlFor="clientNo" className="col-form-label">Client No:</label>
                        <input type="number" className="form-control" id="clientNo" 
                         value={suppliedOrder.clientId} required readOnly/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="productNo" className="col-form-label">Product No:</label>
                        <input type="text" className="form-control" id="productNo" 
                         value={suppliedOrder.productNo} required readOnly/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="quantities" className="col-form-label">Quantities :</label>
                        <input type="text" className="form-control" id="quantities" 
                        value={suppliedOrder.requiredQuantities} required readOnly/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="orderDate" className="col-form-label">Order Date:</label>
                        <input type="text" className="form-control" id="orderDate" 
                        value={suppliedOrder.orderDate} required readOnly/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="deliveryDate" className="col-form-label">Delivery Date:</label>
                        <input type="text" className="form-control" id="deliveryDate" 
                        value={suppliedOrder.deliveryDate} required readOnly/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="supplierNo" className="col-form-label">Supplier No:</label>
                        <input type="text" className="form-control" id="supplierNo" 
                         onChange={(e)=>setSupplierNo(e.target.value)}  />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="vehicelId" className="col-form-label">Vehicle Id:</label>
                        <input type="text" className="form-control" id="vehicelId" 
                        onChange={(e)=>setVehicleId(e.target.value)}  />
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={addSuppliedOrder} >Add</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default SuppliedOrder
