import React,{useState,useEffect} from 'react'
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import "./AddTModalStyle.css"
import Select from 'react-select';
import "../Styles/universalStyles.css"
import {selectedCarogery,updateTransactions} from "../../Redux/Actions/actions"
import {useFirestore} from "react-redux-firebase"
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


 function AddTransactionsModal(props) {

  const [catogery, setCatogery] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate]=useState("")
  const [note, setNote] = useState("")
  const [disableSave,setDisableSave]=useState(true)
    let firestore=useFirestore()
    const {uid} = useSelector(state => state.firebase.auth);

let CheckForm=()=>{
      
      if(catogery !=="" && amount!=="" && date!==""){
       
        return setDisableSave(false)
        
      }
     return setDisableSave(true)

    }

useEffect(()=>{
 
  CheckForm()
},[amount,date,catogery])

  
    if(!props.tModalBool){
        return null;
    }

    

    let SaveTransaction=()=>{
      setDisableSave(true)
      
      let id=uuidv4()
      let data={
        id:id,
        amount: catogery.type==="Expense" ? -Math.abs(amount) : Math.abs(amount),
        date:date,
        name:catogery.name,
        type:catogery.type,
        note:note
      }
      let tempTransactions={...props.lTransactions}
      if(date in tempTransactions){
        tempTransactions[date].push(data)
      }else{
        tempTransactions[date]=[]
        tempTransactions[date].push(data)
      }


      
      
      props.updateTransactions(tempTransactions)
      
      firestore.collection("users").doc(uid).collection("transactions").doc(id).set(data).then((res)=>{
        
        setDisableSave(false)
        props.selectedCarogery(false)

      })
    }

    const options = [
        {
          label: "Income",
          options: [
            { label: "salary", value: {
              name:"salary", type:"income"
            } },
            { label: "award", value: {
              name:"award", type:"income"
            } },
            { label: "gift", value: {
              name:"gift", type:"income"
            } },
            { label: "other", value: {
              name:"other", type:"income"
            } }
          ]
        },
        {
            label: "Expense",
            options: [
              { label: "Current Bill", value: {
                name:"Current Bill", type:"Expense"
              } },
              { label: "Water Bill", value: {
                name:"Water Bill", type:"Expense"
              } },
              { label: "Food", value: {
                name:"Food", type:"Expense"
              } },
              { label: "Other", value: {
                name:"Other", type:"Expense"
              } },
            ]
          }
      ];
      const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
      };
      const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
      };
      const formatGroupLabel = data => (
        <div style={groupStyles}>
          <span>{data.label}</span>
          <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
      );
    return (
        <div style={{backgroundColor:"rgb(62 55 55 / 46%)"}}>
        <div className="flex-col pd1r zmax"  >
          <div className="card-shadow pd1r" style={{background: "white"}}>
          <div className="flex-col">
              <p className="heading-B">Add Transaction</p>
          </div>
          
          <div className="gird-2">
              <div className="select-cont pd1r m1r">
                <p>Select Category</p>
                <Select
                  styles={{ width: "200px"}}
                  options={options}
                  formatGroupLabel={formatGroupLabel}
                  onChange={(data)=>{
                    setCatogery(data.value)
                  }}
                /> 
                
              </div>
              <div className="input-cont pd1r">
                  <p>Amount</p>
                  <input type="number" min="0" placeholder="0.0" onChange={(e)=>{
                    setAmount(e.target.value)
                  

                  }} ></input>
              </div>
              <div className="input-cont pd1r m1t">
                <p>Date</p>
                <input type="date"  onChange={(e)=>{
                  setDate(new Date(e.target.value))
                  
                  
                  }}></input>
              </div>
              <div className="input-cont pd1r m1t">
                <p>Note</p>
                <input type="text"  onChange={(e)=>{  setNote(e.target.value)}} placeholder="eg : for food"></input>
              </div>
              
          
           

            </div>
          <div className="flex-row">
          <div  className={`button-primary mr2 ${disableSave ? 'disabled' : ''}`} onClick={SaveTransaction}>
                    <p style={{margin:"0 0.5rem 0 0.5rem"}}>SAVE</p>
                </div>
                <div className="button-primary" onClick={()=>{
                   props.selectedCarogery(false)
                }}>
                    <p style={{margin:"0 0.5rem 0 0.5rem"}}>CANCEL</p>
                </div>

          </div>
          
            </div>
            
        </div>
        </div>
    )
}
const mapStatetoProps=(state,ownProps)=>{

  
    return ({tModalBool:state.tModalBool,lTransactions:state.transactions})

}
export default  withRouter(connect(mapStatetoProps,{selectedCarogery,updateTransactions}) (AddTransactionsModal))


