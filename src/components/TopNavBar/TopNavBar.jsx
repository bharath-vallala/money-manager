import React,{useEffect} from 'react'
import  "./topNavStyles.css"
import { useSelector } from "react-redux";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {selectedCarogery} from "../../Redux/Actions/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie,faHome } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import {selectedBudget} from "../../Redux/Actions/actions"

 function TopNavBar(props) {

    let userDetails=useSelector(state => state.firebase.auth)
    const history = useHistory();

    useEffect(()=>{
       
    },[props.tModalBool])

    return (
        <div className="topNavContainer card-shadowN jsContentsb">
            
            
            <div className="flex-row  align-right ">
            <div className="pd1r fix-padding" style={{cursor:"pointer"}} onClick={()=>{
                    history.push("/")
                }}>
                    <FontAwesomeIcon icon={faHome} color={"hsl(0,0%,50%)"} size={"2x"}></FontAwesomeIcon>
            </div>

                <div className="pd1r fix-padding" style={{cursor:"pointer",marginRight:"0.5rem" }} onClick={()=>{
                    history.push("/chart")
                }}>
                    <FontAwesomeIcon icon={faChartPie} color={"hsl(0,0%,50%)"} size={"2x"}></FontAwesomeIcon>
                </div>
                
                <div className="button-primary" style={{marginRight:"0.5rem"}} onClick={()=>{
                    props.selectedCarogery(true)
                }}>
                    <p>Add Transactions</p>
                </div>
                <div className="button-primary" onClick={()=>{
                    props.selectedBudget(true)
                }}>
                    <p>Add Budget</p>
                </div>
            </div>

            <div className="flex-row  align-left pd1r fix-padding">
                <div className="flex-row ml2 fix-margin">
                <img className="avatar" src={userDetails.photoURL}></img>
                <p className="avatar-name gone">{userDetails.displayName}</p>
                </div>
            </div>
            
        </div>
    )
}
const mapStatetoProps=(state,ownProps)=>{
  
    return ({tModalBool:state.tModalBool})

}

export default  withRouter(connect(mapStatetoProps,{selectedCarogery,selectedBudget}) (TopNavBar))
