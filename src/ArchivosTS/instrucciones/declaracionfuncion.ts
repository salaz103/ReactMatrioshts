import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import instruccion from "./instruccion";
import { instruccionreturn } from "./instruccionreturn";
import { parametro } from "./parametro";

export class declaracionfuncion implements instruccion{

    nombre:string;
    listainstrucciones:instruccion[];
    parametros:parametro[];
    tipodato:tipo_valor;

    constructor(n:string,lista:instruccion[],par:parametro[],t:tipo_valor){
        this.nombre=n;
        this.listainstrucciones=lista;
        this.parametros=par;
        this.tipodato= t!=null?t:tipo_valor.VOID;
    }



    ejecutar(ambito: entorno): object {
        //AQUI YA SE REALIZARON LAS VALIDACIONES Y EL AMBITO QUE ESTAMOS RECIBIENDO ES EL NUEVO
        for (let i = 0; i < this.listainstrucciones.length; i++) {
            
            if(this.listainstrucciones[i] instanceof instruccionreturn){
                return this.listainstrucciones[i].ejecutar(ambito);
            }else{
                let valor=this.listainstrucciones[i].ejecutar(ambito);
                if(valor!=null){
                    return valor;
                }
                //PREGUNTO SI ES CONTINUE O BREAK
            }
        }
        
        return null;
    }


    //EJECUTAR Y OBTENER VALOR SON PARA CUANDO SE LLAMA A LA FUNCION PERO COMO UNA EXPRESION
   /* obtenerValor(ambito:entorno):object{
        return null;
    }

    obtenerTipo(ambito:entorno):tipo_valor{
        return this.tipodato;
    }*/


}