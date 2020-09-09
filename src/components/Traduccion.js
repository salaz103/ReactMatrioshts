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
    codigofinal:"",
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
        valor:newvalue
    }))
  };

  instrucciones=(hijos)=>{
    for (let i = 0; i < hijos.length; i++) {
      if(hijos[i]instanceof(Array)){
        return hijos[i];
      }
    }
  };

  traeFunciones=(instrucciones)=>{
    for (let i = 0; i < instrucciones.length; i++) {
      if(instrucciones[i].tipo=='FUNCION'){
        return true;
      }
    }
    return false;
  }

  recorriendoFunciones=(hijos)=>{
    ///TENGO QUE RECIBIR SOLO LOS HIJOS
    for (let i = 0; i < hijos.length; i++) {
      if(hijos[i]instanceof(Array)){
        for (let a = 0; a < hijos[i].length; a++) {
          //console.log(hijos[i][a].hijos);
          this.recorriendoFunciones(hijos[i][a].hijos);
        }
      }else if(hijos[i]instanceof(Object)){
        //ESTE ELSE ES PARA LEER LAS HOJAS
        if(hijos[i].tipo=='CADENA'){
          console.log('"');
          console.log(hijos[i].hijos[0]);
          console.log('"');
        }else{
        console.log(hijos[i].hijos[0]);
        }
      }else{
        console.log(hijos[i]);
      }
      
    }
   }

  buscandoFunciones=(nombrePadre,nodoPadre,instruccionesPadre)=>{
    let existeFunciones= this.traeFunciones(instruccionesPadre);
    if(existeFunciones){
      //recorrer las instrucciones en busqueda de funciones y enviar a este mismo metodo solo las funciones
    }else{
      //RECORRO EL NODO PADRE A EXCEPCION DE LAS FUNCIONES QUE TRAE
      console.log("NODO PADRE- HIJOS");
      console.log(nodoPadre.hijos);
      this.recorriendoFunciones(nodoPadre.hijos);
    }


  }

  desanidarFunciones=(nodo)=>{
    console.log("NODO PADRE- HIJOS");
    console.log(nodo.hijos);
    const nodoinstrucciones= this.instrucciones(nodo.hijos);
    const nombrePadre= nodo.hijos[1];
    this.buscandoFunciones(nombrePadre,nodo,nodoinstrucciones);

    return("desanidando");
  };

  

//FUNCION QUE SOLO DESANIDA EL CODIGO
 desanidar=(ast)=>{

  let recolector;

  ast.forEach(nodo => {
    if(nodo.tipo){
      //SI EL NODO TIENE UN TIPO, ES DECIR QUE TRAE HIJOS
      if(nodo.tipo=="CADENA"){
        //SI ES UNA CADENA, SOLO ES PARA PONERLE LAS COMILLAS ANTES
        console.log('"');
        this.desanidar(nodo.hijos);
        console.log('"');
      }else if(nodo.tipo!='FUNCION'){
        //SI ES OTRA COSA QUE NO SEA UNA FUNCION SE MANDAN A LEER LOS HIJOS
        this.desanidar(nodo.hijos)
      }else{
        //SI ES UNA FUNCION, TENEMOS QUE IR DESANIDANDO
        let recolectorFunciones = this.desanidarFunciones(nodo);
        console.log(recolectorFunciones);
      }

      }else{
        // AQUI ES LA LECTURA DE SOLO LOS HIJOS, SOLO LAS HOJAS
        console.log(nodo)
    }
  });

  //AL TERMINAR DE RECOLECTAR Y DESANIDAR LAS FUNCIONES SE TIENE QUE MANDAR EL CODIGO AL ESTADO

 }




  traducir=()=>{
      //console.log(this.state.valor);
      let ast;
      ast = Traducir.parse(this.state.valor);
      //console.log(ast);
      //this.props.agregarCodigo(this.state.valor);
       console.log("Recorriendo el arbol:");
       this.desanidar(ast);
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


