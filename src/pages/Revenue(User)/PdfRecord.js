import React from 'react'
import "./Invoice.css"
import { AddShoppingCartIcon } from '@material-ui/icons/AddShoppingCart';
import { url } from '../../common/constants';
import axios from 'axios';

export class PdfRecord extends React.PureComponent {

    componentDidMount(){
        this.getDeliveredOrders();
    }
    array = [];
     getDeliveredOrders =()=>{
        axios.get(url +"/suppliedOrder/").then((response)=>{
            const result = response.data 
            if(result.status === 'success'){
                this.array = result.data;
                console.log(this.array);
            }
                else
                {
                    alert('error while loading')
                }
            
        })
    }
    
    render(){
        var suppliedOrder = this.props.suppliedOrder;
        var invoiceNo = suppliedOrder.clientOrderId+245785
        return (
            <>
            
            <div className="container">
           
               <div id="header">
                   <div>
                   
                    <p id="company-name">SUPPLY CHAIN SOLUTIONS</p>
                    <p id="address">
                    ----------------------------------------------------------<br></br>
                    Pritech Park SEZ, 11th Block, <br></br>
                    Ground floor, RMZ Ecospace Campus,  <br></br>
                    Marathahalli - Sarjapur Outer Ring Rd, Bellandur,
                    </p>
                    </div>
                    <div className="invoice-details">
                        Invoice No: {invoiceNo}<br></br>
                        Invoice Date: {suppliedOrder.deliveryDate}
                    </div>
               </div>
               
               <div id="header2">
                   <div id="header2-item">
                   
                    <p id="clientName">{suppliedOrder.clientName}</p>
                    <p id="address-client">
                    ----------------------------------------------------------<br></br>
                    Pritech Park SEZ, 11th Block, <br></br>
                    Ground floor, RMZ Ecospace Campus,  <br></br>
                    Marathahalli - Sarjapur Outer Ring Rd, Bellandur,
                    </p>
                    </div>
               </div>
               
                <table id="page-table" class="table table-striped table-sm invoice-table" cellspacing="0" >
                <thead>
                  <tr>
                    <th class="th-sm">Order No
                    </th>
                    <th class="th-sm">Product No
                    </th>
                    <th class="th-sm">Product Name
                    </th>
                    <th class="th-sm">Quantities
                    </th>
                    <th class="th-sm">Cost (Rs.)
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{suppliedOrder.clientOrderId}</td>
                        <td>{suppliedOrder.clientName}</td>
                        <td>{suppliedOrder.productNo}</td>
                        <td>{suppliedOrder.productName}</td>
                        <td>{suppliedOrder.cost}</td>
                        
                        
                        
                    </tr>
                    {/* <InvoiceTableRow suppliedOrder={this.props.suppliedOrder}/> */}
                </tbody>
                </table>
                
                   <div
                   className="total">
                       <p>TOTAL : {suppliedOrder.requiredQuantities * suppliedOrder.cost} </p>
                   </div>
                   <p className="paid">PAID</p>
                   <div className="footer">
                       <p id="invoice-msg">If you have any question on the invoice,please contact</p>
                       <p id="invoice-contact">Abhishek Sawant, +91 1236547891  abhishek@scm.com</p>
                   </div>
                   <p id="greetings">Thank You For Your Business !</p>
                   
                       
                   
            </div>
            
            </>
        )
    }
    
}

export default PdfRecord
