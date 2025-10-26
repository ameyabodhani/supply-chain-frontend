import axios from "axios"
import { url } from '../../common/constants'
const EditVendor=({vendor,refresh})=>{
    console.log(vendor)
    console.log("inside edit vendor")
    var editVendorName=vendor.vendorName
    var editVendorEmail=vendor.vendorEmail
    var editVendorPhone=vendor.vendorPhone
    var editVendorAddess=vendor.vendorAddress
    var editVendorCity=vendor.vendorCity
    var editVendorState=vendor.vendorState
    var editVendorPincode=vendor.vendorPincode
    var editVendorGstno=vendor.vendorGstno
    var editStatus=vendor.isActive
   
    console.log(editStatus)
    
    const updateVendorName=(name)=>{
        editVendorName=name;
    }

    const updateVendorEmail=(email)=>{
        editVendorEmail=email;
    }

    const updateVendorPhone=(phone)=>{
        editVendorPhone=phone;
    }
    const updateVendorAddress=(address)=>{
        editVendorAddess=address;
    }

    const updateVendorCity=(city)=>{
        editVendorCity=city;
    }

    const updateVendorState=(state)=>{
        editVendorState=state;
    }
    const updateVendorPincode=(pincode)=>{
        editVendorPincode=pincode;
    }

    const updateVendorGstno=(gstno)=>{
        editVendorGstno=gstno;
    }
    const updateVendorStatus=(status)=>{
        editStatus=status
    }

    console.log(editVendorName)
    console.log(editVendorEmail)
    const editVendor=()=>{
        const data = new FormData();
        data.append("vendorName",editVendorName)
        data.append("vendorEmail",editVendorEmail)
        data.append("vendorPhone",editVendorPhone)
        data.append("vendorAddress",editVendorAddess)
        data.append("vendorCity",editVendorCity)
        data.append("vendorState",editVendorState)
        data.append("vendorPincode",editVendorPincode)
        data.append("vendorGstno",editVendorGstno)
        data.append("isActive",editStatus)
        

        console.log(data)
         axios.put(url+'/vendors/update/'+vendor.id,data).then((response)=>{
            const result = response.data;
            console.log(result)
            if(result.status = "success"){
                
                alert("Edited Successfully")
                refresh();
            }
        })

    }
    return (
        <>
            <div className="modal fade" id="EditVendor-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Edit Vendor</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-1">
                        <input type="hidden" className="form-control" id="vendor-id" value={vendor.id} readOnly/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-n" className="col-form-label" >Name:</label>
                        <input type="text" className="form-control" defaultValue={vendor.vendorName} onChange={(e)=>updateVendorName(e.target.value)} id="vendor-n"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-email" className="col-form-label" >Email:</label>
                        <input type="email" className="form-control" defaultValue={editVendorEmail} onChange={(e)=>updateVendorEmail(e.target.value)} id="vendor-email"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-phone" className="col-form-label" >Phone:</label>
                        <input type="text" className="form-control" defaultValue={editVendorPhone} onChange={(e)=>updateVendorPhone(e.target.value)} id="vendor-phone"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-address" className="col-form-label" >Address:</label>
                        <input type="text" className="form-control" defaultValue={editVendorAddess} onChange={(e)=>updateVendorAddress(e.target.value)} id="vendor-address"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-city" className="col-form-label" >City:</label>
                        <input type="text" className="form-control" defaultValue={editVendorCity} onChange={(e)=>updateVendorCity(e.target.value)} id="vendor-city"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-state" className="col-form-label" >State:</label>
                        <input type="text" className="form-control" defaultValue={editVendorState} onChange={(e)=>updateVendorState(e.target.value)} id="vendor-state"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-pincode" className="col-form-label" >Pincode:</label>
                        <input type="text" className="form-control" defaultValue={editVendorPincode} onChange={(e)=>updateVendorPincode(e.target.value)} id="vendor-pincode"/>
                    </div>
                    <div className="mb-1">
                        <label for="vendor-gstno" className="col-form-label" >GST No:</label>
                        <input type="text" className="form-control" defaultValue={editVendorGstno} onChange={(e)=>updateVendorGstno(e.target.value)} id="vendor-gstno"/>
                    </div>
                    <div className="mb-1">
                        <input type="hidden" className="form-control" value={editStatus} onChange={(e)=>updateVendorStatus(e.target.value)} id="vendor-status"/>
                    </div>

                    
                    </form> 
                </div>
                <div className="modal-footer">
                    <button onClick={editVendor}type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}


export default EditVendor
