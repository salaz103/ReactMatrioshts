import React from 'react';
import {connect} from 'react-redux';


const ReporteAST= (props)=>(
    <div>
        <h1>CODIGO {props.codigo.codigo}</h1>
        <h1>{props.codigo.length}</h1>
    </div>
);

const mapStatetoProps= (state)=>{
    return{
        codigo: state.codigo,
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteAST);

export default ListadoConectadoCodigo;