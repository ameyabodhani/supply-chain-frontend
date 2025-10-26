import './ViewOrder.css'
import MakePayment from './MakePayment'
import { useEffect } from "react"
import axios from "axios"
import { url } from "../../common/constants"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import { useState } from "react"
const ViewOrder=()=>{

    const [orderParts, setOrderParts]=useState([]);
    const location = useLocation()
    var total=0
    const order = location.state.order
    useEffect(()=>{
        getOrderParts();
    },[])

    const getOrderParts =()=>{
        axios.get(url+"/orders/"+order.orderId).then((response)=>{
      const result = response.data;
      if(result.status ==="success"){
          setOrderParts(result.data)         
      }
      else{
        alert("Some error occured parts cannot be fetched !")
      }
    })
}


    var data=orderParts
    console.log(data)
    const viewRow=data.map((part)=>{
      total=total+part.partPrice*part.quantityOrdered
      console.log(total)
      return (
        <tr>
        <td>{part.partId}</td>
        <td>{part.partName}</td>
        <td>{part.partPrice}</td>
        <td>{part.quantityOrdered}</td>
        <td>{part.partPrice * part.quantityOrdered}</td>
      </tr>
      )
    }
    )
    return (
      <>
      <MakePayment total={total}/>
      <div className="page-container">
        <div className="page-header">
          <h4>Order Details </h4>
        </div>
        <div className="page-table-div">
        <table id="page-table" class="table table-striped table-sm" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th class="th-sm id">Part ID
              </th>
              <th class="th-sm">Part Name
              </th>
              <th class="th-sm">Part Price
              </th>
              <th class="th-sm">QuantityOrdered
              </th>
              <th class="th-sm">Cost
              </th>
            </tr>
          </thead>
          <tbody>
          {viewRow}
          </tbody>
      </table>
      <div className="mybtn-right">
        <h4>Total Amount : Rs. {total}</h4>
        <button data-bs-toggle="modal" data-bs-target="#MakePayment-staticBackdrop" class="btn btn-primary btn-md">Make payment</button>
      </div>
      </div>

        <div><Link to="/orders">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
        </Link></div>
        
        </div>
        </>
    )
}
export default ViewOrder