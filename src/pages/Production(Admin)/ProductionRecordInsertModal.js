import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function ProductionRecordInsertModal({completedProductions,getAllProduction,setMessage,setMessageId}) {
    
    const [stockproduced, setStockproduced] = useState(0)
    const val1 = completedProductions.producedStock;
    const [product, setProduct] = useState()
    



    const insertRecord = () =>{
        const data = new FormData();
        data.append("clientOrderId",completedProductions.clientOrderId)
        data.append("clientId",completedProductions.clientId)
        data.append("productNo",completedProductions.productNo)
        data.append("producedStock",stockproduced)
        data.append("deliveryDate",completedProductions.deliveryDate)
        
        axios.post(url+"/productionhistory",data).then((response)=>{
            const result = response.data;
            if(result.status==="success"){
                setMessage("Successfully Added Production Details");
                    setMessageId("crud-status-added")
                //alert("inserted successfully")
               
            }
        })
        
const total = Number(stockproduced)+Number(val1);

        const data2 = new FormData();
      
        data2.append("clientOrderId",completedProductions.clientOrderId)
        data2.append("clientId",completedProductions.clientId)
        data2.append("productNo",completedProductions.productNo)
        data2.append("requiredQuantities",completedProductions.requiredQuantities)
        data2.append("producedStock",total)
        data2.append("deliveryDate",completedProductions.deliveryDate)
        data2.append("availableStock",completedProductions.availableStock)

        axios.put(url+"/production/"+completedProductions.clientOrderId,data2).then((response)=>{
            const result = response.data;
            if(result.status==="success"){
                alert("inserted successfully")
                getAllProduction();
                getProductById();
            }
        })
        var product=[];

            const getProductById =()=>{
            axios.get(url+"/product/"+completedProductions.productNo).then((response)=>{
            const result = response.data;
            if(result.status =="success"){
                console.log("********");
                console.log(result.data);
               product = (result.data)
              editProductStock();
            }
            else{
              alert("Some error occured products cannot be fetched !")
            }
              })
            }

            const editProductStock =() =>{
                const data = new FormData();
                var stock = product.stock + Number(stockproduced)
                console.log("****stock****");
                console.log(product.stock);
                console.log(Number(stockproduced));
                console.log(stock);

                data.append("productName",product.productName)
                data.append("plantNo",product.plantNo)
                data.append("status",product.status)
                data.append("cost",product.cost)
                data.append("stock",stock)
                axios.put(url+"/product/"+product.productNo,data).then((response)=>{
                    const result = response.data;
                    console.log(result.data);
                    if(result.status = "success"){ 
                        
                        
                    }
                })
        
            }

    }

    return (
        <>
            <div className="modal fade" id="productionadd-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Insert Production Record</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="order-number" className="col-form-label">Order Number: </label>
                        <input type="text" className="form-control" id="order-number" value={completedProductions.clientOrderId} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="customer-no" className="col-form-label">Client No:</label>
                        <input type="text" className="form-control" id="customer-no" value={completedProductions.clientId} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="product-name" className="col-form-label">Product No:</label>
                        <input type="text" className="form-control" id="product-name" value={completedProductions.productNo} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="quantity" className="col-form-label">Quantity:</label>
                        <input type="number" className="form-control" id="quantity" onChange={(e)=>setStockproduced(e.target.value)}/>
                    </div>
                    
                    <div className="mb-1">
                        <label for="date" className="col-form-label">Delivery Date:</label>
                        <input type="date" className="form-control" id="date" value={completedProductions.deliveryDate} readOnly/>
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

export default ProductionRecordInsertModal
