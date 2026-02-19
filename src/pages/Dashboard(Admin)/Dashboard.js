import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DashboardContents from './DashboardContents'
import axios from 'axios';
import { url } from '../../common/constants';


function Dashboard() {
    const [productsCount, setProductsCount] = useState(0);
    const [plantsCount, setPlantsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0)
    const [suppliersCount, setSuppliersCount] = useState(0)
    const [registeredUsers, setRegisteredUsers] = useState(0)
    const [registeredVendors, setRegisteredVendors] = useState(0)
    const [clientOrders, setClientOrders] = useState(0);
    const [carsProduced, setCarsProduced] = useState(0);
    const [partsCount, setPartsCount] = useState(0);
    const [vendorOrdersCount, setVendorOrdersCount] = useState(0);
    const [suppliedOrdersCount, setSuppliedOrdersCount] = useState(0);
    const [complaintsCount, setComplaintsCount] = useState(0);
    const [vehiclesCount, setVehiclesCount] = useState(0);
    const [upcomingProductionCount, setUpcomingProductionCount] = useState(0);

    useEffect(() => {
        getProductsCount();
        getPlantsCount();
        getclientCounts();
        getsuppliersCounts();
        getRegisteredUsers();
        getRegisteredVendors();
        getclientOrdersCounts();
        getAllCarsProduced();
        getPartsCount();
        getVendorOrdersCount();
        getSuppliedOrdersCount();
        getComplaintsCount();
        getVehiclesCount();
        getUpcomingProductionCount();
    }, [])

    const getRegisteredVendors = () => {
        axios.get(url + "/vendors").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setRegisteredVendors(result.data.length);
            }
        })
    }
    const getRegisteredUsers = () => {
        axios.get(url + "/user").then((response) => {
            const result = response.data;
            if (result) {
                setRegisteredUsers(result.length);
            }
        })
    }
    const getProductsCount = () => {
        axios.get(url + "/product").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setProductsCount(result.data.length);
            }
        })
    }
    const getPlantsCount = () => {
        axios.get(url + "/plant").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setPlantsCount(result.data.length);
            }
        })
    }
    const getclientCounts = () => {
        axios.get(url + "/clients").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setClientsCount(result.data.length);
            }
        })
    }
    const getsuppliersCounts = () => {
        axios.get(url + "/supplier").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setSuppliersCount(result.data.length);
            }
        })
    }
    const getclientOrdersCounts = () => {
        axios.get(url + "/upcomingdeliveries").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setClientOrders(result.data.length);
            }
        })
    }
    const getAllCarsProduced = () => {
        axios.get(url + "/productionhistory").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                var sum = 0;
                result.data.map((rslt) => { sum = sum + rslt.producedStock })
                setCarsProduced(sum)
            }
        })
    }
    const getPartsCount = () => {
        axios.get(url + "/parts").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setPartsCount(result.data.length);
            }
        })
    }
    const getVendorOrdersCount = () => {
        axios.get(url + "/orders").then((response) => {
            try {
                const result = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;
                if (result && result.data) {
                    setVendorOrdersCount(result.data.length);
                }
            } catch (e) {
                // backend serialization issue — shows 0 until fixed
            }
        }).catch(() => {})
    }
    const getSuppliedOrdersCount = () => {
        axios.get(url + "/suppliedOrder").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setSuppliedOrdersCount(result.data.length);
            }
        })
    }
    const getComplaintsCount = () => {
        axios.get(url + "/scomplaints").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setComplaintsCount(result.data.length);
            }
        })
    }
    const getVehiclesCount = () => {
        axios.get(url + "/vehicle").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setVehiclesCount(result.data.length);
            }
        })
    }
    const getUpcomingProductionCount = () => {
        axios.get(url + "/production").then((response) => {
            const result = response.data;
            if (result.status = "success") {
                setUpcomingProductionCount(result.data.length);
            }
        })
    }

    return (
        <div className="dashboard-container">
            <DashboardContents
                registeredUsers={registeredUsers}
                registeredVendors={registeredVendors}
                carsProduced={carsProduced}
                clientOrdersCounts={clientOrders}
                plantsCount={plantsCount}
                productsCount={productsCount}
                clientsCount={clientsCount}
                suppliersCount={suppliersCount}
                partsCount={partsCount}
                vendorOrdersCount={vendorOrdersCount}
                suppliedOrdersCount={suppliedOrdersCount}
                complaintsCount={complaintsCount}
                vehiclesCount={vehiclesCount}
                upcomingProductionCount={upcomingProductionCount}
            />
        </div>
    )
}

export default Dashboard
