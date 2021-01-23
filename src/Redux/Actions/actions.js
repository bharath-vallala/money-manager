
export const selectedCarogery=(open)=>{
    return {
        type:"MODAL-T",
        payload:open
  
    }
}
export const selectedBudget=(open)=>{
    return {
        type:"MODAL-B",
        payload:open
  
    }
}

export const updateTransactions=(transactions)=>{
    return{
        type:"UPTRANSACTIONS",
        payload:transactions
    }
}
export const UpdateInflow=(inflow)=>{
    return{
        type:"INFLOW",
        payload:inflow
    }
}
export const UpdateOutflow=(outflow)=>{
    return{
        type:"OUTFLOW",
        payload:outflow
    }
}
export const updateDiff=(diff)=>{
    return{
        type:"DIFF",
        payload:diff
    }
}
