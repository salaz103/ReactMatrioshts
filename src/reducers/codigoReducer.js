const codigoReducerDefaultState={
    codigografo:'digraph G{}',
    codigoconsola:'',
    s:'date'
};

const reducerGeneral=(state=codigoReducerDefaultState,action)=>{
    switch(action.type){
        case 'CODIGO_EJECUCION':
            return {
                ...state,
                codigografo:action.codigografo
            }
        case 'CONSOLA':
            return{
                ...state,
                codigoconsola: state.codigoconsola+ action.codigoconsola
            }
        case 'LIMPIAR_CONSOLA':
            return{
                ...state,
                codigoconsola: ''
            }
        default:
            return state;
    }
};

export default reducerGeneral;