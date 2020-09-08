import React from 'react';
import {connect} from 'react-redux';
import {Graphviz} from 'graphviz-react';

const ReporteAST= (props)=>(
    <div>
        <Graphviz dot={props.codigografo.codigografo}/>
    </div>
);

const mapStatetoProps= (state)=>{
    return{
      codigografo: state.codigografo,
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteAST);

export default ListadoConectadoCodigo;