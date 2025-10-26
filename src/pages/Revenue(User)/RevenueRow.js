import React, { useEffect, useState } from 'react'
import './Revenue.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { url } from "../../common/constants"
import axios from 'axios'
function RevenueRow() {
    const [supOrder,setSupOrder] = useState([])
useEffect(() => {
    getDeliveredOrders();
}, [])

const getDeliveredOrders =()=>{
    axios.get(url +"/suppliedOrder").then((response)=>{
        const result = response.data 
        console.log("Inside REvenue");
        console.log(result.data);
        if(result.status === 'success'){
            setSupOrder(result.data)
        }
            else
            {
                alert('error while loading')
            }
        
    })
}
var sumBreeza=Number(0);
var sumBaleno = 0;
var sumSwift = 0;
var sumWagon = 0;
var sumDzire = 0;
    return (
        <>
        {
            supOrder.map((order)=>{
                if(order.productName == "Breeza"){
                    sumBreeza += Number(order.requiredQuantities) * Number(order.cost)
                    return(
                        <div className="firstDiv">
                        <div className="innerDiv1">
                            <p id="name">BREEZA</p>
                        </div>
                        <ArrowForwardIcon className="forwardArrow"style={{fontSize:'70px',margin:"20px",color:"orange"}}/>
                        <div className="innerDiv2">
                        <p id="name">{sumBreeza}</p>
                        </div>
                    </div>
                        )
                }
                if(order.productName == "Baleno"){
                    sumBaleno += Number(order.requiredQuantities) * Number(order.cost)
                    return(
                        <div className="firstDiv">
                        <div className="innerDiv1">
                            <p id="name">BALENO</p>
                        </div>
                        <ArrowForwardIcon className="forwardArrow"style={{fontSize:'70px',margin:"20px",color:"orange"}}/>
                        <div className="innerDiv2">
                        <p id="name">{sumBaleno}</p>
                        </div>
                    </div>
                        )
                }
                if(order.productName == "Swift"){
                    sumSwift += Number(order.requiredQuantities) * Number(order.cost)
                    return(
                        <div className="firstDiv">
                        <div className="innerDiv1">
                            <p id="name">SWIFT</p>
                        </div>
                        <ArrowForwardIcon className="forwardArrow"style={{fontSize:'70px',margin:"20px",color:"orange"}}/>
                        <div className="innerDiv2">
                        <p id="name">{sumSwift}</p>
                        </div>
                    </div>
                        )
                }
                if(order.productName == "Wagon"){
                    sumWagon += Number(order.requiredQuantities) * Number(order.cost)
                    return(
                        <div className="firstDiv">
                        <div className="innerDiv1">
                            <p id="name">WAGON</p>
                        </div>
                        <ArrowForwardIcon className="forwardArrow"style={{fontSize:'70px',margin:"20px",color:"orange"}}/>
                        <div className="innerDiv2">
                        <p id="name">{sumWagon}</p>
                        </div>
                    </div>
                        )
                }
                if(order.productName == "DZire"){
                    sumWagon += Number(order.requiredQuantities) * Number(order.cost)
                    return(
                        <div className="firstDiv">
                        <div className="innerDiv1">
                            <p id="name">DZIRE</p>
                        </div>
                        <ArrowForwardIcon className="forwardArrow"style={{fontSize:'70px',margin:"20px",color:"orange"}}/>
                        <div className="innerDiv2">
                        <p id="name">{sumDzire}</p>
                        </div>
                    </div>
                        )
                }
                
                
            })
        }
              
        </>
    )
}

export default RevenueRow
