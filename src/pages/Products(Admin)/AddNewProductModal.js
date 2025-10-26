import React, { useState } from 'react'
import axios from 'axios';
import { url } from '../../common/constants';

function AddNewProductModal({refresh,setMessage,setMessageId}) {
    
    const [productName, setProductName] = useState("");
    const [plantNo, setPlantNo] = useState(0);
    const [status, setStatus] = useState("");
   
 

    const addNewProduct = () =>{

           const data = new FormData();
           
            data.append("productName",productName)
            data.append("plantNo",plantNo)
            data.append("status",status)

            axios.post(url+"/product",data).then((response)=>{
                const result = response.data;
                
                if(result.status=="success"){
                   
                    setMessage("Successfully Added Product");
                    setMessageId("crud-status-added")
                    refresh();
                    
                }
            })
}


    return (
        <div>
            <>
            <div className="modal fade" id="staticBackdropAddNewProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Add New Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                <form>
                    <div className="mb-1">
                        <label htmlFor="product-name" className="col-form-label">Product Name:</label>
                        <input type="text" className="form-control" id="product-name" 
                        onChange={(e)=>setProductName(e.target.value)} required />
                    </div>  
                    <div className="mb-1">
                        <label htmlFor="plant-number" className="col-form-label">Plant Number:</label>
                        <input type="number" className="form-control" id="plant-number" 
                        onChange={(e)=>setPlantNo(e.target.value)} required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="status" className="col-form-label">Status:</label>
                        <input type="text" className="form-control" id="status" 
                        onChange={(e)=>setStatus(e.target.value)} required/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={addNewProduct}>Add</button>
                </div>
                </div>
            </div>
            </div>
        </>
        </div>
    )
}

export default AddNewProductModal
