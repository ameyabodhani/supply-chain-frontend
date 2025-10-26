import { url } from "../../common/constants"
import axios from "axios"
const SendOrder=({order,refresh})=>{
    console.log(order)
    const sendOrder=()=>{
        axios.delete(url+"/orders/vendor/"+order.orderId+"/"+order.partId).then((response)=>{
            const result = response.data;
            if(result){    
                alert("Send Successfully")
                refresh();
            }
        })
    }
    return (
        <>
            <div className="modal fade" id="SendOrder-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Vendor</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <h3>Part : {order.partName}</h3>
                <h3>Quantity : {order.quantityOrdered}</h3>
                </div>
                <div className="modal-footer">
                    <button onClick={sendOrder} type="button" className="btn btn-success" data-bs-dismiss="modal">Send Order</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default SendOrder