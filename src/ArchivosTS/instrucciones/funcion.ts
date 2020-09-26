import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import instruccion from "./instruccion";
import { parametro } from "./parametro";

export class funcion implements instruccion{

    nombre:string;
    listainstrucciones:instruccion[];
    parametros:parametro[];
    tipodato:tipo_valor;

    constructor(n:string,lista:instruccion[],par:parametro[],t:tipo_valor){
        this.nombre=n;
        this.listainstrucciones=lista;
        this.parametros=par;
        this.tipodato=t;
        
    }


    ejecutar(ambito: entorno): object {
        
        return null;
    }


}