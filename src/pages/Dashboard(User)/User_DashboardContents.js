import React, { useEffect, useState } from 'react'


function User_DashboardContents({ upcomingdeliveries,
    totalStock, balenoStock,
    breezaStock, swiftStock,
    wagonStock, dZireStock, suppliedOrder }) {


    const [userclass, setUserClass] = useState("")
    const [supplierclass, setSupplierClass] = useState("")
    const [vendorsclass, setVendorsClass] = useState("")
    const [clientclass, setClientclass] = useState("")
    const [plantsclass, setPlantsClass] = useState("")
    const [productsclass, setProductsClass] = useState("")
    const [ordersclass, setOrdersClass] = useState("")
    const [productionclass, setProductionClass] = useState("")

    //const [upcomongProduction, setUpcomongProduction] = useState("")


    useEffect(() => {
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


    let contents = [
        {
            id: "users",
            counts: balenoStock,
            heading: "Baleno",
            className: userclass
        },
        {
            id: "suppliers",
            counts: breezaStock,
            heading: "Breeza",
            className: supplierclass

        },
        {
            id: "vendors",
            counts: swiftStock,
            heading: "Swift",
            className: vendorsclass
        },
        {
            id: "clients",
            counts: wagonStock,
            heading: "WagonR",
            className: clientclass
        },
        {
            id: "plant",
            counts: dZireStock,
            heading: "Dezire",
            className: plantsclass

        },
        {
            id: "products",
            counts: totalStock,
            heading: "Available Stock",
            className: productsclass
        },
        {
            id: "production",

            counts: upcomingdeliveries,


            heading: "Upcoming Deliveries",
            className: productionclass
        },
        {
            id: "orders",
            counts: suppliedOrder,
            heading: "Supplied Orders",
            className: ordersclass
        },

    ]


    return (
        <>
            {
                contents.map((content) => {
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

export default User_DashboardContents
