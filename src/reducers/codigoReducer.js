const codigoReducerDefaultState={
    codigografo:'digraph G{}',
    s:'date'
};

const expensesReducer=(state=codigoReducerDefaultState,action)=>{
    switch(action.type){
        case 'CODIGO_EJECUCION':
            return {
                ...state,
                codigografo:action.codigografo
            }
        default:
            return state;
    }
};

export default expensesReducer;