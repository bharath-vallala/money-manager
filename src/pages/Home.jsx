import React from 'react'
import TopNavBar from "../components/TopNavBar/TopNavBar"
import ViewTransaction from "../components/ViewTransactions/viewTransactions"
export default function Home() {
   

    return (
        <div className="container">
            <div style={{position:"sticky"}}>
                <TopNavBar></TopNavBar>
            </div>
            <div className="flex-col" style={{position: "absolute" ,top:0,left:0}}>
               
            </div>
            <div className="flex-col">
                <ViewTransaction></ViewTransaction>

            </div>
            
            
        </div>
    )
}
