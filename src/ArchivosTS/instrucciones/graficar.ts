import entorno from "../entorno/entorno";
import {almacen} from '../../../src/app';
import {reportets} from '../../actions/ts';
import instruccion from "./instruccion";

export class graficar implements instruccion{


    ejecutar(ambito: entorno): object {
        //EL EJECUTAR DE ESTA FUNCION VA A SER ENVIAR EL AMBITO DONDE ESTA A LA STORE 
        //DEL PROYECTO Y AHI VAMOS A RECORRER AMBITOS Y TS

        let simbolos:object[]=[];
        for (let entornoactual:entorno = ambito; entornoactual !=null ; entornoactual=entornoactual.apuntadorPadre) {
            for (let i = 0; i <entornoactual.ts.length; i++) {
                simbolos.push({
                    nombre:entornoactual.ts[i].id,
                    tipo: entornoactual.ts[i].tipovalor,
                    ambito: entornoactual.nombre,
                    valor: entornoactual.ts[i].valor,
                    reasignable: entornoactual.ts[i].reasignable
                });
            }
        } 

        //AHORA QUE YA TENGO EL ARREGLO DE OBJETOS, VOY A INGRESAR ESTE ARREGLO
        //AL ARREGLO DE MI STORE

        almacen.dispatch(reportets(simbolos));
        return null;
    }

}