const codigoReducerDefaultState={
    codigografo:'digraph G{}',
    codigoconsola:'',
    entornos:{},
    simbolos:[],
    errores:[],
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
                codigoconsola: '',
                simbolos: []
            }
        case 'ENTORNOFINAL':
            return{
                ...state,
                entornos: action.entorno
            }
        case 'ENTORNOACTUAL':
            return{
                ...state,
                simbolos: [... state.simbolos,action.simbolosactuales]
            }
        case 'ERROR':
            return{
                ...state,
                errores: state.errores.concat(action.error_e)
            }
        default:
            return state;
    }
};

export default reducerGeneral;