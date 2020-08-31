const codigoReducerDefaultState={
    codigo:'',
    s:'date'
};

const expensesReducer=(state=codigoReducerDefaultState,action)=>{
    switch(action.type){
        case 'CODIGO_EJECUCION':
            return {
                ...state,
                codigo:action.codigo
            }
        default:
            return state;
    }
};

export default expensesReducer;