import React,{useState,useEffect} from 'react'
import TopNavBar from "../components/TopNavBar/TopNavBar" 
import { Pie,Bar } from 'react-chartjs-2'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    selectedCarogery,
    updateTransactions,
    UpdateInflow,UpdateOutflow,updateDiff
  } from '../Redux/Actions/actions'
import "../components/Styles/universalStyles.css"


 function ChartsView(props) {
    const [currentMonth, SetCurrentMonth] = useState()
    const [currentMonthrTransactions, setCurrentMonthrTransactions] = useState({})
    const [labels, setLabels] = useState([])
    const [inflowData, setInflowData] = useState([])
    const [outflowData, setoutflowData] = useState([])



    useEffect(() => {
        filterTransactions(currentMonth)
      }, [currentMonth,props.lTransactions])

      useEffect(()=>{
        caliculateINOUT()
      },[currentMonthrTransactions])
      useEffect(()=>{
       
        
      },[inflowData])

    const data = {
        labels: ['expense', 'income',],
        datasets: [
          {
            label: 'Overall income/expense',
            data: [props.outflowR, props.inflowR],
            backgroundColor: [
              '#f55742',
              '#42f5b3',
              
            ],
            borderWidth: 1,
          },
        ],
      }

      const inflowBar = {
        labels: labels,
        datasets: [
          {
            label: 'Income Bar Chart',
            data: inflowData,
            backgroundColor: "#42f5b3",
           
            borderWidth: 1,
          },
        ],
      }
      const outflowBar = {
        labels: labels,
        datasets: [
          {
            label: 'Expense Bar Chart',
            data: outflowData,
            backgroundColor: "#f55742",
           
            borderWidth: 1,
          },
        ],
      }

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

     let  updateMonthDays=()=>{
          
      }

      let caliculateINOUT=()=>{
        let inflow=0
        let outflow=0
        
        let objectKeys = Object.keys(currentMonthrTransactions)
       
        let length=new Date(new Date(currentMonth).getFullYear(),new Date(currentMonth).getMonth()+1, 0 ).getDate()

        setLabels(Array.from({length: length}, (_, i) => i+1))

        let inflowD=Array.from({length: length+1}, (_, i) => 0)
        let outflowD=Array.from({length: length+1}, (_, i) => 0)
        objectKeys.map((key)=>{
           
          currentMonthrTransactions[key].map((element)=>{
           
              
              if(Math.sign(element["amount"])===-1){
                  outflow=outflow+element["amount"]
                  outflowD[new Date(key).getDate()]=outflowD[new Date(key).getDate()]+element["amount"]
                 
  
              }else{
                 
                  inflow=inflow+element["amount"]
                  inflowD[new Date(key).getDate()]=inflowD[new Date(key).getDate()]+element["amount"]
  
              }
          })
         
          
        })
          props.UpdateInflow(inflow)
         
          props.updateDiff(Math.abs(inflow)-Math.abs(outflow))
          props.UpdateOutflow(outflow)
       
        
        setInflowData(inflowD)
        setoutflowData(outflowD)
       
    }

    return (
        <div className="flex-col width100">
             <div style={{position:"sticky" , width:"100%"}}>
                <TopNavBar></TopNavBar>
             </div>
            <div className='flex-col card-shadow pd1r width50 resp-width fix-bottom' style={{marginTop:"100px"}}>
            <div className='flex-col input-cont m2b'>
                <p className='heading-B'>SELECT MONTH</p>
                <input
                type='month'
                onChange={(e) => {
                    SetCurrentMonth(e.target.value)
                }}
                />
             </div>
                <div className="flex-col width100">
                  <div className="flex-col width100" style={{marginBottom:"0.5rem", padding:"0.5rem"}}>
                    <Pie data={data} />
                    </div>
                  <div className="flex-col width100" style={{marginBottom:"0.5rem", padding:"0.5rem"}}> 
                  <div className="heading-B green-font"><p>{`Income ${props.inflowR}`}</p></div>
                    <Bar data={inflowBar}></Bar>
                    
                  </div>
                  <div className="flex-col width100" style={{marginBottom:"0.5rem", padding:"0.5rem"}}>
                  <div className="heading-B red-font"><p>{`Expense ${props.outflowR}`}</p></div>
                    <Bar data={outflowBar}></Bar>
                  </div>
                </div>


            </div>
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
    connect(mapStatetoProps, {selectedCarogery, updateTransactions,updateDiff,UpdateInflow,UpdateOutflow })(
        ChartsView
    )
  )
