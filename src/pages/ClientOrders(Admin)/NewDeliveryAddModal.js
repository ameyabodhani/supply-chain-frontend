import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function NewDeliveryAddModal({refresh,setMessage,setMessageId}) {

    const [clientNo, setClientNo] = useState(0)
    const [productNo, setProductNo] = useState(0)
    const [quantities, setQuantities] = useState(0)
    const [deliveryDate, setDeliveryDate] = useState("")

    const addNewOrder = () =>{

        const data = new FormData();
        
         data.append("clientId",clientNo)
         data.append("productNo",productNo)
         data.append("requiredQuantities",quantities)
         data.append("deliveryDate",deliveryDate)

         axios.post(url+"/upcomingdeliveries",data).then((response)=>{
             const result = response.data;
             
             if(result.status=="success"){
                 setMessage("Successfully Added Order");
                 setMessageId("crud-status-added")
                 refresh();
                 
             }
         })
}

    return (
        <>
            <div className="modal fade" id="AddNewDelivery-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Add New Delivery</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="customer-name" className="col-form-label">Client No:</label>
                        <input type="text" className="form-control"
                        onChange={(e)=>setClientNo(e.target.value)} id="customer-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="product-name" className="col-form-label">Product No:</label>
                        <input type="text" className="form-control"
                        onChange={(e)=>setProductNo(e.target.value)} id="product-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="quantity" className="col-form-label">Quantities:</label>
                        <input type="number" className="form-control"
                        onChange={(e)=>setQuantities(e.target.value)} id="quantity"/>
                    </div>
                    <div className="mb-1">
                        <label for="date" className="col-form-label">Delivery Date:</label>
                        <input type="date" className="form-control"
                        onChange={(e)=>setDeliveryDate(e.target.value)} id="date"/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={addNewOrder} type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                    
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default NewDeliveryAddModal
