import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import {connect} from 'react-redux';
import {agregarCodigo} from '../actions/ts';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import a from './ArchivosTS/Desanidar';

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


  traducir=()=>{
      let b= a();
      console.log("Leyendo desde un archivo TS: "+ b);
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


export default connect(null,{agregarCodigo})(Traduccion2)
