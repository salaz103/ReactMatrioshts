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
import {desanidar,AST_grafo,desanidadas} from '../ArchivosTS/Desanidar';

class Traduccion2 extends React.Component {
  state = {
    valor: " ",
    codigofinal:"",
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
        valor:newvalue
    }))
  };

  onChange2= (codigo)=>{
    this.setState(()=>({
        codigofinal:codigo
    }))
  };


  traducir=()=>{
      let ast;
      let graphviz;
      ast = Traducir.parse(this.state.valor);
      console.log(ast);
      
      let codigoDesanidado=desanidar(ast);
      graphviz= AST_grafo(ast);
      console.log(codigoDesanidado);
      this.onChange2(codigoDesanidado);
      let funciones= desanidadas();
      this.props.agregarCodigo(graphviz);
      console.log("FUNCIONES DESANIDADAS:");
      console.log(funciones);
      console.log("AST ORIGINAL DESPUES DE HABERLO RECORRIDO");
      console.log(ast);
  }

  ejecutar=()=>{
      console.log('Presiono el boton de ejecutar');
  }

  render() {

    return (
      <div>
        <div className='container'>


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
            value={this.state.codigofinal}
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
