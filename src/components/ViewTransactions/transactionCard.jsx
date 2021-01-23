import React from 'react'
import "./transactionCardStyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'

export default function TransactionCard(props) {
   

           let formatHeading =()=>{
               let array=props.date.split(" ")
               return array
               //return `${array[0] +" " +array[1]+" " +array[2] +" "+array[3]}`
           }


    let renderCard=()=>{
      return  props.data.map((item)=>{
          let isincome = item.type==="income" ? true : false
          let color="#f03e3e"
          let classs="red"
          if(isincome){
              color="#17d437"
              classs="green"
          }
            return (<div className="flex-row width100 jsContentsb ">
                <div className="flex-row">
                    <FontAwesomeIcon icon={faMoneyBill} color={color} size="2x"></FontAwesomeIcon>
                     <p className="heading-N">{item.name}</p>
                </div>
                
                <p className={`${classs}`}>  {`₹${item.amount}`}</p>

            </div>)

        })
    }

    if (! props.data) {
        return (
            <div>
                nothing found
            </div>
        )

        
    }


    return (
        <div className="flex-col width100 m2b" style={{padding:"1rem"}}>
            <div className="flex-col pd1r heading-B border-bottom align-itemsFS width100">
                <div className="flex-row">
                <p className="heading-grey">{formatHeading()[2]}</p>
                <div className="flex-row">
                    <p className="small-text">{formatHeading()[0]}</p>
                    <p className="small-text">{formatHeading()[1]}</p>
                    <p className="small-text">{formatHeading()[3]}</p>
                </div>

                </div>
                
            </div>
            
            
            {renderCard()}
            
            
        </div>
    )
}
