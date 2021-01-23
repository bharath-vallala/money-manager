import {
    firebaseReducer
  } from 'react-redux-firebase'
import {firestoreReducer } from 'redux-firestore'
import { createStore, combineReducers, compose,applyMiddleware } from 'redux'



const tModal=(state=null,action)=>{
    switch(action.type){
        case "MODAL-T" :
            return action.payload
        default :
            return state
    }

}
const BModal=(state=null,action)=>{
    switch(action.type){
        case "MODAL-B" :
            return action.payload
        default :
            return state
    }

}

const UPTRANSACTIONSREDUCER=(state={},action)=>{
    switch(action.type){
        case "UPTRANSACTIONS" :
            return action.payload
        default :
            return state
    }
}
const inflowRED=(state=0,action)=>{
    switch(action.type){
        case "INFLOW" :
            return action.payload
        default :
            return state
    }
}
const outflowRED=(state=0,action)=>{
    switch(action.type){
        case "OUTFLOW" :
            return action.payload
        default :
            return state
    }
}
const diffRED=(state=0,action)=>{
    switch(action.type){
        case "DIFF" :
                return action.payload
        default :
            return state
    }
}


const rootReducer = combineReducers({
    firebase:firebaseReducer,
   firestore: firestoreReducer, // <- needed if using firestore,
   tModalBool:tModal,
   bModalBool:BModal,
   transactions:UPTRANSACTIONSREDUCER,
   inflowR:inflowRED,
   outflowR:outflowRED,
   diffR:diffRED
})

export default rootReducer