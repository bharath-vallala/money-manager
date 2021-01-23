import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  selectedCarogery,
  updateTransactions,
  UpdateInflow,UpdateOutflow,updateDiff
} from '../../Redux/Actions/actions'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import TransactionCard from './transactionCard'



function ViewTransactions(props) {
  const [currentMonth, SetCurrentMonth] = useState()
  const [currentMonthSTR, SetCurrentMonthSTR] = useState()
  const [currentMonthrTransactions, setCurrentMonthrTransactions] = useState({})
  const[budget, setBudget]=useState(0);

  let firestore = useFirestore()
  const { uid } = useSelector((state) => state.firebase.auth)

  useEffect(() => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .orderBy('date', 'desc')
      .get()
      .then(function (querySnapshot) {
        let tempTransactions = {}
       
        querySnapshot.forEach(function (doc) {
          if (doc.data().date.toDate() in tempTransactions) {
            tempTransactions[doc.data().date.toDate()].push(doc.data())
          } else {
            tempTransactions[doc.data().date.toDate()] = []
            tempTransactions[doc.data().date.toDate()].push(doc.data())
          }
        })

        props.updateTransactions(tempTransactions)
      })
      .catch(function (error) {
       
      })
  }, [uid])

 

  useEffect(() => {
    filterTransactions(currentMonth)
   
    
   

    firestore.collection("users").doc(uid).collection("budgets").doc(currentMonth).get().then(function(doc) {
      if (doc.exists) {
          setBudget(parseInt(doc.data().budget))
          console.log("Document data:", doc.data().budget);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setBudget("NA")
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });


  }, [currentMonth,props.lTransactions])

  useEffect(()=>{
    caliculateINOUT()
  },[currentMonthrTransactions])

  let filterTransactions = (date) => {
    let month = new Date(date).getMonth()
    

    let teTr = {}
    for (const property in props.lTransactions) {
      if (new Date(property).getMonth() === month) {
        teTr[property] = props.lTransactions[property]
      }
    }

    setCurrentMonthrTransactions(teTr)
  }

  let caliculateINOUT=()=>{
      let inflow=0
      let outflow=0
     
      let objectKeys = Object.keys(currentMonthrTransactions)
     
      
      objectKeys.map((key)=>{
       
        currentMonthrTransactions[key].map((element)=>{
           
            if(Math.sign(element["amount"])===-1){
                outflow=outflow+element["amount"]

            }else{
              
                inflow=inflow+element["amount"]

            }
        })
       
        
      })
        props.UpdateInflow(inflow)
       
        props.updateDiff(Math.abs(inflow)-Math.abs(outflow))
        props.UpdateOutflow(outflow)
      
      //setInflow(inflow)
      //setoutflow(outflow)
  }

  let renderCards = () => {
    
    let objectKeys = Object.keys(currentMonthrTransactions)
    if (objectKeys.length > 0) {
      return objectKeys.map((key) => {
        return (
          <TransactionCard
            key={key}
            date={key}
            data={currentMonthrTransactions[key]}
          ></TransactionCard>
        )
      })
    }
    return <div className='heading-B'>no records found</div>
  }

  return (
    <div className='flex-col card-shadow pd1r width50 resp-width  fix-bottom' style={{marginTop:"100px"}}>
      <div className='flex-col input-cont'>
        <p className='heading-B'>SELECT MONTH</p>
        <input
          type='month'
          onChange={(e) => {
            SetCurrentMonth(e.target.value)

          }}
        />
      </div>
      <div className="flex-col width100 jsContentsb ">
              <div className="flex-row jsContentsb width100">
                <p className="heading-N">InFlow</p>
                <p className="heading-N" style={{color:"#17d437"}}>{props.inflowR}</p>
              </div>
              <div className="flex-row jsContentsb width100">
                <p className="heading-N">OutFLow</p>
                <p className="heading-N" style={{color:"#f03e3e"}}>{props.outflowR}</p>
              </div>
              <div className="flex-row jsContentsb width100">
                <p className="heading-N">Difference</p>
                <p className="heading-N" style={{color:"#333" , borderTop:"1px solid rgba(51, 51, 51, 0.349)"}}>{props.diffR}</p>
              </div>
              <div className="flex-row jsContentsb width100">
                <p className="heading-N">Budget</p>
                <p className="heading-N" style={{color:"#333" , borderTop:"1px solid rgba(51, 51, 51, 0.349)"}}>{budget}</p>
              </div>
               
               
                
                

            </div>
      {renderCards()}
      <div></div>
    </div>
  )
}

const mapStatetoProps = (state, ownProps) => {
  return { tModalBool: state.tModalBool, lTransactions: state.transactions,
    outflowR:state.outflowR,
    inflowR:state.inflowR,
    diffR:state.diffR
  }
}

export default withRouter(
  connect(mapStatetoProps, { selectedCarogery, updateTransactions,updateDiff,UpdateInflow,UpdateOutflow })(
    ViewTransactions
  )
)
