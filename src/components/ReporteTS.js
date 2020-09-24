import React from 'react';
import {connect} from 'react-redux';




const ReporteTS= (props)=>(
    <div>
       <table>
         <tbody>
        <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Tipo Variable</th>
        </tr>
        {renderTableData(props.entornos.entornos.ts)}
        </tbody>
       </table>
    </div>
);


function renderTableData(ts) {

    if(ts){
        return ts.map((simbolo, index) => {
            const { id, tipovalor, valor,reasignable } = simbolo //destructuring
            return (
               <tr key={id}>
                  <td>{id}</td>
                  <td>{tipovalor}</td>
                  <td>{valor}</td>
                  <td>{reasignable?"LET":"CONST"}</td>
               </tr>
            )
         })
    }
    
 }


const mapStatetoProps= (state)=>{
    return{
      entornos: state.storecodigo,
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteTS);

export default ListadoConectadoCodigo;