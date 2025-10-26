import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import User_DashboardContents from './User_DashboardContents'
import axios from 'axios';
import { url } from '../../common/constants';


function User_Dashboard() {
    const [productsCount, setProductsCount] = useState(0);
    const [plantsCount, setPlantsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [suppliedOrderCount, setSuppliedOrderCount] = useState(0)
    const [upcomingdeliveryCount, setUpcomingdeliveryCount] = useState(0)

    const [upcomingdeliveries, setUpcomingdeliveries] = useState(0)
    const [totalStock, setTotalStock] = useState(0)
    const [balenoStock, setBalenoStock] = useState(0)
    const [breezaStock, setBreezaStock] = useState(0)
    const [swiftStock, setSwiftStock] = useState(0)
    const [wagonStock, setWagonStock] = useState(0)
    const [dZireStock, setDZireStock] = useState(0)
    const [suppliedOrder, setSuppliedOrder] = useState(0)


    useEffect(() => {
        getclientCounts();
        getUpcomingDeliveries();
        getTotalStock();
        getIndividualCount();
        getSuppliedOrders();
    }, [])



    const getSuppliedOrders = () => {
        axios.get(url + "/suppliedOrder").then((response) => {
            const result = response.data;
            console.log("**************")
            console.log(result.data)
            if (result.status = "success") {
                const size = result.data.length;
                setSuppliedOrder(size);
            }

        })
    }
    const getclientCounts = () => {
        axios.get(url + "/clients").then((response) => {
            const result = response.data;

            if (result.status = "success") {
                const size = result.data.length;
                setClientsCount(size);
            }
        })
    }


    const getUpcomingDeliveries = () => {
        axios.get(url + "/upcomingdeliveries").then((response) => {
            const result = response.data;

            if (result.status = "success") {
                const size = result.data.length;
                setUpcomingdeliveries(size);
            }
        })
    }

    const getTotalStock = () => {
        axios.get(url + "/product").then((response) => {
            const result = response.data;
            if (result.status = "success") {

                var sum = 0;
                result.data.map((rslt) => {

                    sum = sum + rslt.stock
                })
                setTotalStock(sum)

            }
        })
    }


    const getIndividualCount = () => {
        axios.get(url + "/product").then((response) => {
            const result = response.data;

            if (result.status = "success") {
                // setCarsProduced(result.data);
                var Balenosum = 0;
                var Breezasum = 0;
                var Swiftsum = 0;
                var Wagonsum = 0;
                var Dziresum = 0;
                result.data.map((rslt) => {
                    console.log(rslt)
                    if (rslt.productName === "Baleno") {
                        Balenosum = Balenosum + rslt.stock
                    }
                    if (rslt.productName === "Breeza") {
                        Breezasum = Breezasum + rslt.stock
                    }
                    if (rslt.productName === "Swift") {
                        Swiftsum = Swiftsum + rslt.stock
                    }
                    if (rslt.productName === "Wagon") {
                        Wagonsum = Wagonsum + rslt.stock
                    }
                    if (rslt.productName === "DZire") {
                        Dziresum = Dziresum + rslt.stock
                    }

                })
                setBalenoStock(Balenosum)
                setBreezaStock(Breezasum)
                setSwiftStock(Swiftsum)
                setWagonStock(Wagonsum)
                setDZireStock(Dziresum)

            }
        })
    }

    return (
        <div className="dashboard-container">

            <User_DashboardContents
                balenoStock={balenoStock}
                breezaStock={breezaStock}
                swiftStock={swiftStock}
                wagonStock={wagonStock}
                dZireStock={dZireStock}
                totalStock={totalStock}
                suppliedOrder={suppliedOrder} upcomingdeliveries={upcomingdeliveries} />


        </div>
    )
}

export default User_Dashboard
