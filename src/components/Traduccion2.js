import React from 'react';
import AceEditor from 'react-ace';
import { split as SplitEditor } from "react-ace";
import Action from './Action';
import Traducir from '../analizadores/matrioshts';
import {connect} from 'react-redux';
import {agregarCodigo} from '../actions/ts';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import {desanidar,AST_grafo} from '../ArchivosTS/Desanidar';

class Traduccion2 extends React.Component {
  state = {
    valorEditor1: " ",
    codigoDesanidado:"",
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
      valorEditor1:newvalue
    }))
  };

  onChange2= (codigo)=>{
    this.setState(()=>({
      codigoDesanidado:codigo
    }))
  };


  traducir=()=>{
      let ast;
      let graphviz;
      ast = Traducir.parse(this.state.valorEditor1);
      console.log(ast);
      
      let codigofinal=desanidar(ast);
      graphviz= AST_grafo(ast);
      console.log(codigofinal);
      this.onChange2(codigofinal);
      this.props.agregarCodigo(graphviz);
  }

  ejecutar=()=>{
      console.log('Presiono el boton de ejecutar');
  }

  render() {

    return (
      <div>
        <div className='container'>

        <div className='container-inline2'>
          <h1>ENTRADA</h1>
          <h1>SALIDA</h1>
        </div>

        <div className='container-inline'>
        <AceEditor
            onChange={this.onChange}
            width='1500px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor"
            fontSize='20px'
        />

        <AceEditor
            width='1500px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor"
            value={this.state.codigoDesanidado}
            fontSize='20px'
        />
        </div>
      

        <div className='inline-buttons'>
        <Action
            action={this.traducir}
            nombre='Traducir'
        />
        <Action
            action={this.ejecutar}
            nombre= 'Ejecutar'
        />
        </div>
        </div>
      </div>
    );
  }
}


export default connect(null,{agregarCodigo})(Traduccion2)
