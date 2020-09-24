import entorno from './entorno/entorno';
import {almacen} from '../../src/app';
import {limpiarconsola,tsfinal} from '../actions/ts.js';



function inicioEjecucion(ast:any){
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());

//CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
const entornoGlobal= new entorno("global",);

console.log("Recibiendo el AST para EJECUTAR:");
console.log(ast);
ejecutar(ast,entornoGlobal);
console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
console.log(entornoGlobal);

almacen.dispatch(tsfinal(Object(entornoGlobal)));


}


function ejecutar(ast:any,entorno:entorno){

    ast.forEach(instruccion => {
        instruccion.ejecutar(entorno);
    });

}

export default inicioEjecucion;