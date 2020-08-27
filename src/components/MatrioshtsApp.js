import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import Header from './Header';
import Traducir from '../analizadores/matrioshts';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";

export default class MatrioshtsApp extends React.Component {
  state = {
    valor: " ",
    selectedOption: undefined
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
        valor:newvalue
    }))
  };

  traducir=()=>{
      //console.log(this.state.valor);
      Traducir.parse(this.state.valor);
  }

  ejecutar=()=>{
      console.log('Presiono el boton de ejecutar');
  }

  render() {

    return (
      <div>
      <Header title='ReactMatrioshTS- 201213181'/>
        <div className='container'>
        <AceEditor
            onChange={this.onChange}
            width='650px'
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
