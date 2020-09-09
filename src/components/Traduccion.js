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

  busquedaInstrucciones=(hijos)=>{
    for (let i = 0; i < hijos.length; i++) {
      if(hijos[i]instanceof(Array)){
        //AQUI ESTAMOS REGRESANDO UN ARREGLO DE OBJETOS [{},{}]
        return hijos[i];
      }
    }
  };

  /*traeFunciones=(instrucciones)=>{
    for (let i = 0; i < instrucciones.length; i++) {
      if(instrucciones[i].tipo=='FUNCION'){
        return true;
      }
    }
    return false;
  }*/

  /*recorriendoFunciones=(hijos)=>{
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
   }*/

  /*buscandoFunciones=(nombrePadre,nodoPadre,instruccionesPadre)=>{
    let existeFunciones= this.traeFunciones(instruccionesPadre);
    if(existeFunciones){
      //recorrer las instrucciones en busqueda de funciones y enviar a este mismo metodo solo las funciones
    }else{
      //RECORRO EL NODO PADRE A EXCEPCION DE LAS FUNCIONES QUE TRAE
      console.log("NODO PADRE- HIJOS");
      console.log(nodoPadre.hijos);
      this.recorriendoFunciones(nodoPadre.hijos);
    }
  }*/

  busquedaFunciones=(instrucciones)=>{
    //ESTAMOS RECIBIENDO UN ARREGLO DE OBJETOS - [{},{}] SERIAN LAS INSTRUCCIONES DE UNA FUNCION
    for (let i = 0; i < instrucciones.length; i++) {
      if(instrucciones[i].tipo=='FUNCION'){
        //SI ES UNA FUNCION REGRESAMOS TRUE
        return true;
      }
    }
    //SI REGRESAMOS FALSE ES POR QUE NO VIENEN FUNCIONES EN LAS INSTRUCCIONES
    return false;
  }

  /*desanidarFunciones=(nodo)=>{
    console.log("NODO PADRE- HIJOS");
    console.log(nodo.hijos);
    const nodoinstrucciones= this.instrucciones(nodo.hijos);
    const nombrePadre= nodo.hijos[1];
    this.buscandoFunciones(nombrePadre,nodo,nodoinstrucciones);

    return("desanidando");
  };*/

  lecturaFunciones=(nodoPadre)=>{
    //AQUI ESTOY RECIBIENDO UN NODO {FUNCION,HIJOS,POS}
    const hijos= nodoPadre.hijos;
    for (let i = 0; i < hijos.length; i++) {
      
      if(hijos[i]instanceof (Array)){
        //SIGNIFICA QUE AQUI ESTOY LEYENDO LAS INSTRUCCIONES DE LA FUNCION
        const instrucciones= hijos[i];
        for (let a = 0; a < instrucciones.length; a++) {
          this.lecturaFunciones(instrucciones[a]);
        }
      }else{
        //SE LEEN LOS HIJOS QUE NO SON UN ARRAY, ES DECIR QUE NO TRAEN HERMANOS
        if(hijos[i]instanceof(Object)){
          //SI SOLO VIENE UN OBJETO ES DECIR QUE ES UNA HOJA, PUEDE SER UN ID, NUMERO, CADENA
          console.log(String(hijos[i].hijos))
        }else{
          //ESTA LECTURA ES DE LOS HIJOS DEL PADRE, ES DECIR RFUNCTION, NOMBRE, ETC.
          console.log(hijos[i]);
        }
        
      }
      
    }

  }

  cambioDeNombre=(nombrePadre,nodoFuncion)=>{
    const nuevoNombre= nombrePadre+"_"+nodoFuncion.hijos[1];
    nodoFuncion.hijos[1]= nuevoNombre;
    return nodoFuncion;
  }

  inicioBusqueda=(nodoPadre)=>{ //ESTE NODO PADRE ES UN OBJETO {TIPO,HIJOS,POS}
    const instruccionesActuales= this.busquedaInstrucciones(nodoPadre.hijos); //AQUI ESTAMOS ENVIANDO UN ARREGLO [$1,$2]
    //AHORA YA TENEMOS EL ARREGLO DE OBJETOS, QUE SON LAS INSTRUCCIONES [{},{}]
    //TENEMOS QUE VERIFICAR SI EN ESTAS INSTRUCCIONES VIENE UNA FUNCION
    const vieneFuncion= this.busquedaFunciones(instruccionesActuales);
    if(vieneFuncion){
      //SI VIENE UNA FUNCION ENTONCES TENEMOS QUE IMPRIMIR ANTES ESA FUNCION Y CAMBIAR SU NOMBRE
      //TENDRIA QUE RECORRER LAS INSTRUCCIONES POR QUE PUEDE QUE VENGA MAS DE UNA FUNCION
      const nombrePadre= nodoPadre.hijos[1];
      
      for (let i = 0; i < instruccionesActuales.length; i++) {
        if(instruccionesActuales[i].tipo=='FUNCION'){
            const nuevoNodoFuncion= this.cambioDeNombre(nombrePadre,instruccionesActuales[i]);
            this.inicioBusqueda(nuevoNodoFuncion);
        }
        
      } 
      
    }else{
      //SI NO VIENE FUNCION, PODEMOS IMPRIMIR ESTA FUNCION DE FORMA NORMAL
      //LO QUE VOY A ENVIAR AQUI ES UN OBJETO {FUNCION,HIJOS,POS}
      //ESTA LECTURA SIGNIFICA QUE EN LAS INSTRUCCIONES NO VIENEN FUNCIONES, ES EL CASO MINIMO
      //nodoPadre.hijos[1]="nuevoNombre";
      this.lecturaFunciones(nodoPadre);
    }

    //HABRIA QUE QUITAR EL ELSE Y POR DEFAULT IMPRIMIR LA FUNCION PADRE PERO SIN LAS INSTRUCCIONES FUNCION
    

    
  }
  

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
        // let recolectorFunciones = this.desanidarFunciones(nodo);
        // console.log(recolectorFunciones);
        this.inicioBusqueda(nodo);
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


