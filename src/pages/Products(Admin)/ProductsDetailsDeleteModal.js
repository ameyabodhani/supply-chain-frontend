import React from 'react'
import axios from'axios'
import { url } from '../../common/constants'


function ProductsDetailsDeleteModal({product,refresh,setMessage,setMessageId}) {

const deleteProduct=()=>{
    axios.delete(url+"/product/"+product.productNo).then((response)=>{
        const result = response.data;
        if(result){
            setMessage("Successfully Deleted Product");
            setMessageId("crud-status-deleted")
            refresh();
        }
        
    })
    
}
   
    return (
        <>
            <div className="modal fade" id="staticBackdropDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>Do you really want to delete product - {product.productName}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={deleteProduct} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ProductsDetailsDeleteModal
