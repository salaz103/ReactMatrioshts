import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import Traducir from '../analizadores/matrioshts';
import {connect} from 'react-redux';
import {agregarCodigo} from '../actions/ts';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import nodobase from '../arbolBase/nodobase';


class Traduccion extends React.Component {
  state = {
    valor: " ",
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
        valor:newvalue
    }))
  };

  recorrerAST=(ast)=>{
    for (const propiedad in ast) {
      if(ast[propiedad] instanceof Array){
        this.recorrerAST(ast[propiedad]);
        continue;
      }else if(ast[propiedad] instanceof nodobase){
        this.recorrerAST(ast[propiedad]);
        continue;
      }
      console.log(ast[propiedad]);
    }
  }


  traducir=()=>{
      //console.log(this.state.valor);
      let ast;
      ast = Traducir.parse(this.state.valor);
      console.log(ast);
      this.props.agregarCodigo(this.state.valor);
      // console.log("Recorriendo el arbol:");
      // this.recorrerAST(ast);
      //this.setState(this.state.valor);
      

  }

  ejecutar=()=>{
      console.log('Presiono el boton de ejecutar');
  }

  render() {

    return (
      <div>
        <div className='container'>
        <AceEditor
            onChange={this.onChange}
            width='750px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor"
            fontSize='20px'
        />
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


export default connect(null,{agregarCodigo})(Traduccion)


