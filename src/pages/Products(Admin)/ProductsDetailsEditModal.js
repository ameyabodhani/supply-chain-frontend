import React, { useState } from 'react'
import axios from 'axios'
import { url } from '../../common/constants'
function ProductsDetailsEditModal({product,refresh,setMessage,setMessageId}) {
   
    var editProductName = product.productName
    var editPantNo = product.plantNo
    var editStatus =product.status

   /* const [productName, setProductName] = useState(`${editProductName}`);
    const [plantNo, setPlantNo] = useState(`${editPantNo}`);
    const [status, setStatus] = useState(`${editStatus}`);*/

    
    
   const updateproductName =(name) =>{
    editProductName = name;
   }
   const updateplantNo =(plantNo) =>{
    editPantNo = plantNo;
   }
   const updateproductStatus=(status) =>{
    editStatus = status;
   }

    const editProduct =() =>{
        const data = new FormData();
        data.append("productName",editProductName)
        data.append("plantNo",editPantNo)
        data.append("status",editStatus)

        axios.put(url+"/product/"+product.productNo,data).then((response)=>{
            const result = response.data;
            if(result.status = "success"){
               
                setMessage("Successfully Edited Product");
                setMessageId("crud-status-edited")
                refresh();
            }
        })

    }
    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <label for="product-number" className="col-form-label"  >Product Number:</label>
                        <input type="text" className="form-control" id="product-number" value={product.productNo} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="product-name" className="col-form-label" >Product Name:</label>
                        <input type="text" className="form-control" defaultValue={editProductName} onChange={(e)=>updateproductName(e.target.value)} id="product-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="status" className="col-form-label" >Status:</label>
                        <input type="text" className="form-control" defaultValue={editStatus} onChange={(e)=>updateproductStatus(e.target.value)} id="status"/>
                    </div>
                    <div className="mb-1">
                        <label for="plant-number" className="col-form-label" >Plant Number:</label>
                        <input type="text" className="form-control" defaultValue={editPantNo} onChange={(e)=>updateplantNo(e.target.value)} id="plant-number"/>
                    </div>
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editProduct}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ProductsDetailsEditModal
