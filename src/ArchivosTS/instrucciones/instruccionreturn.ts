import entorno from "../entorno/entorno";
import { tipo_instruccion } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionreturn implements instruccion{

    exp:expresion;
    tipo:tipo_instruccion;

    constructor(e:expresion){
        this.exp=e;
        this.tipo=tipo_instruccion.RETURN;
    }



    ejecutar(ambito: entorno): object {
        
        if(this.exp==undefined){
            //SIGNIFICA QUE ES UN RETURN SIN EXPRESION
            return new Object(this.tipo);
        }else{
            ///SIGNIFICA QUE ES UN RETURN CON EXPRESION
            //LO PRIMERO QUE TENGO QUE HACER ES EVALUAR ESA EXPRESION
            let valor= this.exp.obtenerValor(ambito);
            return valor;
        }

    }

}