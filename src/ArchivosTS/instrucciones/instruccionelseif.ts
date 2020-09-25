import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionelseif implements instruccion{

    condicion:expresion;
    listainstrucciones:instruccion[];
    instruccionelseif:instruccion;

    constructor(cond:expresion,lista:instruccion[],instr:instruccion){
        this.condicion=cond;
        this.listainstrucciones=lista;
        this.instruccionelseif=instr;
    }


    ejecutar(ambito: entorno): object {
        
        //ANTES DE REVISAR SI LAS CONDICIONES SON BOOLEANAS 
        //TENGO QUE REVISAR SI LA INSTRUCCIONELSEIF VIENE "UNDEFINED" Ó NO
        //1. SI VIENE "UNDEFINED" ES POR QUE NO TRAE UN ELSE
        //2. SI NO ES POR QUE TRAE UN ELSE
        if(this.instruccionelseif==undefined){

            //AQUI COMIENZA LA EVALUACION INICIAL
            const valorcondicion= this.condicion.obtenerValor(ambito);
            const tipocondicion= this.condicion.obtenerTipo(ambito);
            if(tipocondicion==tipo_valor.BOOLEAN){
                let valorc= valorcondicion as Boolean;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES YA NO HAGO NADA POR QUE ESTOY EN EL PRIMER CASO
                //DONDE NO TRAE UN ELSE
                if(valorc.valueOf()){
                    const tselseif= new entorno("ELSE-IF",ambito);
                    for (let i = 0; i < this.listainstrucciones.length; i++) {
                        this.listainstrucciones[i].ejecutar(tselseif);                     
                    }
                }



            }else{
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
            }


        }else{
            //SIGNIFICA QUE ESTA INSTRUCCION ELSE IF() VIENE CON UN ELSE

            //AQUI COMIENZA LA EVALUACION INICIAL
            const valorcondicion= this.condicion.obtenerValor(ambito);
            const tipocondicion= this.condicion.obtenerTipo(ambito);
            if(tipocondicion==tipo_valor.BOOLEAN){
                let valorc= valorcondicion as Boolean;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES AQUI SI TENGO QUE IR A EJECUTAR AL ELSE 
                if(valorc.valueOf()){
                    const tselseif= new entorno("ELSE-IF",ambito);
                    for (let i = 0; i < this.listainstrucciones.length; i++) {
                        this.listainstrucciones[i].ejecutar(tselseif);                     
                    }
                }else{
                    //AQUI ESTOY EJECUTANDO AL ELSE
                    this.instruccionelseif.ejecutar(ambito);
                }



            }else{
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
            }


        }


        return null;
    }
    
}