import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function UpcomingProductionNewRecordModal({getAllProduction,setMessage,setMessageId}) {
    //const [stockproduced, setStockproduced] = useState(0)
    const [clientId, setClientId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [requiredQuantities, setRequiredQuantities] = useState(0)
    const [deliveryDate, setDeliveryDate] = useState(0)
    const [availbleStock, setAvailbleStock] = useState(0)
    const [producedStock, setProducedStock] = useState(0)
    const [clientOrderNo, setClientOrderNo] = useState(0)
    
    
    
    const insertRecord = () =>{
        const data = new FormData();
        
        
       data.append("clientId",clientId)
       data.append("productNo",productId)
       data.append("requiredQuantities",requiredQuantities)
       data.append("availableStock",availbleStock)
       data.append("producedStock",producedStock)
       data.append("deliveryDate",deliveryDate)
       data.append("clientOrderId",clientOrderNo)
        

        axios.post(url+"/production/",data).then((response)=>{
            const result = response.data;
            if(result.status==="success"){
                alert("inserted successfully")
                getAllProduction();
            }
        })

    }

    return (
        <>
            <div className="modal fade" id="upcomingProduction-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Insert Production Record</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                <div className="mb-1">
                        <label for="customer-no" className="col-form-label">Client Order No:</label>
                        <input type="text" className="form-control" id="customer-no" onChange={(e)=>setClientOrderNo(e.target.value)} />
                    </div>
                    <div className="mb-1">
                        <label for="customer-no" className="col-form-label">Client No:</label>
                        <input type="text" className="form-control" id="customer-no" onChange={(e)=>setClientId(e.target.value)} />
                    </div>
                    <div className="mb-1">
                        <label for="product-name" className="col-form-label">Product No:</label>
                        <input type="text" className="form-control" id="product-name" onChange={(e)=>setProductId(e.target.value)} />
                    </div>
                    <div className="mb-1">
                        <label for="quantity" className="col-form-label">Required Quantity:</label>
                        <input type="number" className="form-control" id="quantity" onChange={(e)=>setRequiredQuantities(e.target.value)}/>
                    </div>
                    <div className="mb-1">
                        <label for="quantity" className="col-form-label">Available Stock:</label>
                        <input type="number" className="form-control" id="quantity" onChange={(e)=>setAvailbleStock(e.target.value)}/>
                    </div>
                    <div className="mb-1">
                        <label for="quantity" className="col-form-label">Produced Stock:</label>
                        <input type="number" className="form-control" id="quantity" onChange={(e)=>setProducedStock(e.target.value)}/>
                    </div>
                    
                    <div className="mb-1">
                        <label for="date" className="col-form-label">Delivery Date:</label>
                        <input type="date" className="form-control" id="date" onChange={(e)=>setDeliveryDate(e.target.value)} />
                    </div>
                    
                    </form> 
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={insertRecord}>Save</button>
                    
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default UpcomingProductionNewRecordModal
