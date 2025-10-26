import axios from "axios"
import { url } from "../../common/constants"
const DeleteOrder=({order,refresh})=>{
    const deleteOrder=()=>{
        axios.delete(url+"/orders/"+order.orderId).then((response)=>{
            const result = response.data;
            if(result){
                //alert("successfully deleted plant "+plant.plantName)
                alert("Successfully Deleted Order");
                refresh();
            }
        })
    }
    return(
        <>
        <div className="modal fade" id="DeleteOrder-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete Order</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <p>Do you really want to delete order - {order.orderId}</p>
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

export default DeleteOrder;