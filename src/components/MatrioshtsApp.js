import React from 'react';
import AceEditor from 'react-ace';
import Action from './Traducir';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools"

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
      console.log(this.state.valor);
  }

  render() {

    return (
      <div>
        <AceEditor
    onChange={this.onChange}
    mode="typescript"
    theme="twilight"
    name="UNIQUE_ID_OF_DIV"
        />
        <Action
         traducir={this.traducir}   
        />
      </div>
    );
  }
}
