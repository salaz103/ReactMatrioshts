import entorno from './entorno/entorno';
import {almacen} from '../../src/app';
import {limpiarconsola} from '../actions/ts.js';


//CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
const entornoGlobal= new entorno();

function inicioEjecucion(ast:any){
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());


console.log("Recibiendo el AST para EJECUTAR:");
console.log(ast);
ejecutar(ast,entornoGlobal);
}


function ejecutar(ast:any,entorno:entorno){

    ast.forEach(instruccion => {
        instruccion.ejecutar(entorno);
    });

}

export default inicioEjecucion;