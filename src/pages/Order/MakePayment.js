import AccountBalance from '@material-ui/icons/AccountBalance'; 
import { useState } from 'react';

const MakePayment=({total})=>{
    const user=JSON.parse(localStorage.getItem('user'))
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [bname,setBname]=useState('')
    const [bacno,setBacno]=useState('')
    


    return (
        <>
        <div className="modal fade" id="MakePayment-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-lg">
        
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Payment</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                   
                   <AccountBalance style={{fontSize:'100px', paddingBottom:'2px'}}/>
                   <div className="mb-1">
                        <label for="n" className="col-form-label" >Name:</label>
                        <input type="text" className="form-control" defaultValue={user.name} id="n"/>
                    </div>
                    <div className="mb-1">
                        <label for="email" className="col-form-label" >Email:</label>
                        <input type="email" className="form-control" defaultValue={user.email} id="email"/>
                    </div>
                    <div className="mb-1">
                        <label for="bank-name" className="col-form-label" >Bank Name:</label>
                        <input type="text" className="form-control"  onChange={(e)=>setBname(e.target.value)} id="bank-name"/>
                    </div>
                    <div className="mb-1">
                        <label for="bank-account-no" className="col-form-label" >Bank Account No:</label>
                        <input type="text" className="form-control" onChange={(e)=>setBacno(e.target.value)} id="bank-account-no"/>
                    </div>  
                    <div className="mb-1">
                        <h4><label for="bank-account-amount" className="col-form-label" >Total Amount: Rs. {total}</label>
                       </h4>
                    </div>  
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" data-bs-target="#OrderPdf_staticBackdrop">Pay</button>
            </div>
            </div>
        </div>
        </div>
        </>    
    )
}

export default MakePayment