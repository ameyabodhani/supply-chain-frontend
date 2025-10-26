import React, { useEffect, useState } from 'react'

function DashboardContents({registeredUsers,registeredVendors,plantsCount,productsCount,clientsCount,clientOrdersCounts,suppliersCount,clientOrders,carsProduced}) {

const [userclass, setUserClass] = useState("")
const [supplierclass, setSupplierClass] = useState("")
const [vendorsclass, setVendorsClass] = useState("")
const [clientclass, setClientclass] = useState("")
const [plantsclass, setPlantsClass] = useState("")
const [productsclass, setProductsClass] = useState("")
const [ordersclass, setOrdersClass] = useState("")
const [productionclass, setProductionClass] = useState("")
//const [upcomongProduction, setUpcomongProduction] = useState("")


    useEffect(()=>{
        setSupplierClass("suppliertrans")
        setUserClass("userstrans")
        setVendorsClass("vendorstrans")
        setClientclass("clientstrans")
        setPlantsClass("plantstrans")
        setProductsClass("productstrans")
        setOrdersClass("orderstrans")
        setProductionClass("productionclass")
        //setUpcomongProduction("upcomingproduction")
    })


         let contents=[
            {
                id:"users",
                counts:registeredUsers,
                heading:"Registered Users",
                className:userclass
            },
            {
                id:"suppliers",
                counts:suppliersCount,
                heading:"Registered Suppliers",
                className:supplierclass
                
            },
            {
                id:"vendors",
                counts:registeredVendors,
                heading:"Registered Vendors",
                className:vendorsclass
            },
            {
                id:"clients",
                counts:clientsCount,
                heading:"Registered Clients",
                className:clientclass
            },
            {
                id:"plant",
                counts:plantsCount,
                heading:"Plant Location",
                className:plantsclass
        
            },
            {
                id:"products",
                counts:productsCount,
                heading:"Different Cars",
                className:productsclass
            },
            {
                id:"production",
                counts:carsProduced,
                heading:"Cars Produced",
                className:productionclass
            },
            {
                id:"orders",
                counts:clientOrdersCounts,
                heading:"New Orders",
                className:ordersclass
            },
           
        ]   

   
    return (
        <>
            {
                contents.map((content)=>{
                    return (<div className={`displays ${content.className}`} id={content.id}>
                        <div className="counts">
                            <p id="counts">{content.counts}</p>
                            </div>
                        <div className="heading">
                        <p id="heading">{content.heading}</p>
                        </div>
                    </div>)
                })
            }
        </>
    )
}

export default DashboardContents
