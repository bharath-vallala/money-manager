import React,{useState,useEffect} from 'react'
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {selectedBudget} from "../../Redux/Actions/actions"
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {useFirestore} from "react-redux-firebase"
import { useSelector } from "react-redux";
import "../Styles/universalStyles.css"


 function AddBudget(props) {
    const [disableSave,setDisableSave]=useState(true)
    const [amount, setAmount] = useState("")
    const [month, setMonth]=useState("")
    let firestore=useFirestore()
    const {uid} = useSelector(state => state.firebase.auth);

    useEffect(()=>{
        CheckForm()
    },[amount,month])

    let CheckForm=()=>{
      
        if(amount !=="" && month!==""){
         
          return setDisableSave(false)
          
        }
       return setDisableSave(true)
  
      }

    let saveBudget=()=>{
        let data={budget:amount}

        firestore.collection("users").doc(uid).collection("budgets").doc(month).set(data).then((res)=>{
        
            setDisableSave(false)
            props.selectedBudget(false)
    
          })

    }
    
    const options = [
        {
            label: "Expense",
            options: [
              { label: "Current Bill", value: {
                name:"Current Bill", type:"Expense"
              } },
              { label: "Food", value: {
                name:"Food", type:"Expense"
              } }
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

    if(!props.bModalBool){
        return null;
    }
    return (
        <div style={{backgroundColor:"rgb(62 55 55 / 46%)"}}>
        <div className="flex-col pd1r zmax"  >
            <div className="flex-col card-shadow pd1r width50 fix-width" style={{background: "white"}}>
                <div className="flex-col">
                <p className="heading-B">Add Budget for Expences</p>
                </div>
            
              
              <div className="input-cont pd1r" style={{width:"80%"}}>
                  <p>Amount</p>
                  <input type="number" min="0" placeholder="0.0" onChange={(e)=>{
                    setAmount(e.target.value)
                  

                  }} ></input>
              </div>
              
            
            <div className="input-cont pd1r m1t" style={{width:"80%"}}>
                <p>Date</p>
                <input type="month"  onChange={(e)=>{
                  setMonth(e.target.value)
                  
                  
                  }}></input>
              </div>
              <div className="flex-row" style={{marginTop:"1rem"}}>
              <div  className={`button-primary mr2 ${disableSave ? 'disabled' : ''}`}
                    onClick={saveBudget}
                >
                    <p style={{margin:"0 0.5rem 0 0.5rem"}}>SAVE</p>
                </div>
                <div className="button-primary" onClick={()=>{
                    props.selectedBudget(false)
                }}>
                    <p style={{margin:"0 0.5rem 0 0.5rem"}}>CANCEL</p>
                </div>
                </div>
            </div>
        </div>
            <button onClick={()=>{
                props.selectedBudget(false)
            }}>cancel</button>
        </div>
    )
}

const mapStatetoProps=(state,ownProps)=>{

  
    return ({bModalBool:state.bModalBool})

}

export default  withRouter(connect(mapStatetoProps,{selectedBudget}) (AddBudget))
