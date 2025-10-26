import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import DashboardContents from './DashboardContents'
import axios from 'axios';
import { url } from '../../common/constants';


function Dashboard() {
    const [productsCount, setProductsCount] = useState(0);
    const [plantsCount, setPlantsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0)
const[suppliersCount,setSuppliersCount]=useState(0)
   
const [registeredUsers,setRegisteredUsers]=useState(0)
    const [registeredVendors,setRegisteredVendors]=useState(0)
    const [clientOrders, setClientOrders] = useState(0);
const [carsProduced, setCarsProduced] = useState(0);

useEffect(()=>{
        getProductsCount();
        getPlantsCount();
        getclientCounts();
        getsuppliersCounts();
        getRegisteredUsers();
        getRegisteredVendors();
        getclientOrdersCounts();
        getAllCarsProduced();


    },[])
    const getRegisteredVendors=()=>{
        axios.get(url+"/vendors").then((response)=>{
            const result = response.data;
             if(result.status= "success"){
                 const size = result.data.length;
                 setRegisteredVendors(size);
             }
        })
    }
    const getRegisteredUsers=()=>{
        axios.get(url+"/user").then((response)=>{
            const result = response.data;
             if(result){
                 const size = result.length;
                 setRegisteredUsers(size);
             }
        })
    }

   const getProductsCount =()=>{
       axios.get(url+"/product").then((response)=>{
           const result = response.data;
            if(result.status= "success"){
                const size = result.data.length;
                setProductsCount(size);
            }
       })
   }

   const getPlantsCount=()=>{
    axios.get(url+"/plant").then((response)=>{
        const result = response.data;
         if(result.status= "success"){
             const size = result.data.length;
             setPlantsCount(size);
         }
    })
   }

   const getclientCounts=()=>{
    axios.get(url+"/clients").then((response)=>{
        const result = response.data;
        console.log(result)
         if(result.status= "success"){
             const size = result.data.length;
             setClientsCount(size);
         }
    })
   }
   const getsuppliersCounts=()=>{
    axios.get(url+"/supplier").then((response)=>{
        const result = response.data;
        console.log(result)
         if(result.status= "success"){
             const size = result.data.length;
             setSuppliersCount(size);
         }
    })
   }
   const getclientOrdersCounts=()=>{
    axios.get(url+"/upcomingdeliveries").then((response)=>{
        const result = response.data;
        console.log(result)
         if(result.status= "success"){
             const size = result.data.length;
             setClientOrders(size);


            }
        })
       }
    
       const getAllCarsProduced = () =>{
        axios.get(url+"/productionhistory").then((response)=>{
          const result = response.data;
          if(result.status ="success"){
           // setCarsProduced(result.data);
            var sum=0;
            result.data.map((rslt)=>{
              sum = sum + rslt.producedStock
            })
            setCarsProduced(sum)
          
          }
        })
      }
    

    return (
        <div className="dashboard-container">
           <DashboardContents registeredUsers={registeredUsers} registeredVendors={registeredVendors} carsProduced={carsProduced} clientOrdersCounts ={clientOrders}plantsCount={plantsCount} productsCount={productsCount} clientsCount={clientsCount} suppliersCount={suppliersCount}/>
        </div>
    )
}

export default Dashboard
