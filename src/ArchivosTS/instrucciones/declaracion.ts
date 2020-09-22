import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_valor, tipo_variable } from "../entorno/tipo";
import instruccion from "./instruccion";
import { variable } from "./variable";

export class declaracion implements instruccion{

    tipovariable:tipo_variable;
    variables:variable[];

    constructor(tipov:tipo_variable,vars:variable[]){
        this.tipovariable=tipov;
        this.variables= vars;
    }
    

    ejecutar(ambito:entorno){
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL
        this.variables.forEach(variable => {
            
            if(ambito.existe(variable.id)){
                //ESTA VARIABLE YA EXISTE
                console.log("ERROR - LA VARIABLE " +variable.id+" ya existe en este ambito" + ambito.nombre);
            }else{
                //SIGNIFICA LA VARIABLE NO EXISTE EN ESTE AMBITO, SE PUEDE GUARDAR
                //LO PRIMERO QUE SE HARA ES OBTENER EL VALOR DE LA EXPRESION, SI ES QUE TRAE
                let expresion:object;
                ///VERIFICAR SI TRAE UNA EXPRESION
                if(variable.exp!=undefined){
                    expresion= variable.exp.obtenerValor(ambito);
                }

                //VERIFICAR SI ES CONST O LET- con this.tipovariable
                if(this.tipovariable==tipo_variable.CONST){
                    //SI ENTRO AQUI ES POR QUE ES CONST, HAY QUE VERIFICAR SI TRAE UN VALOR
                    if(variable.exp!=undefined){
                        //SIGNIFICA QUE SI TRAE UN VALOR, LA PODEMOS GUARDAR
                        //ANTES DE GUARDARLA HAY QUE VERIFICAR SI TRAE TIPO DE DATO,
                        let tipodato:tipo_valor;
                        if(variable.tipodato==undefined){
                        //SI NO TRAJERA TIPO DE DATO, SE TOMA EL TIPO DE DATO DE LA EXPRESION
                        // AQUI LA EXPRESION SI ES OBLIGATORIA QUE VENGA
                            tipodato= variable.exp.obtenerTipo(ambito);
                        //AQUI SE GUARDA LA NUEVA CONS CUANDO ESTA NO TRAE TIPO DE DATO
                        //POR LO QUE SE LE ASIGNO EL TIPO DE DATO DE LA EXPRESION
                            const nuevosimbolo= new simbolo(variable.id,false,tipodato,expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+variable.id+" GUARDADA");
                        }else{
                            //SIGNIFICA QUE SI TRAE UN TIPO DE DATO
                             //ANTES DE PODERLA GUARDAR TAMBIEN SE DEBE VERIFICAR QUE EL TIPO DE DATO
                             //Y EL VALOR SEAM COMPATIBLES
                            if(variable.tipodato==variable.exp.obtenerTipo(ambito)){
                            //SI SON COMPATIBLES SE PUEDE GUARDAR LA VARIABLE CONST
                            tipodato= variable.tipodato;
                             //AHORA YA SE PUEDE GUARDAR
                            const nuevosimbolo= new simbolo(variable.id,false,tipodato,expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+variable.id+" GUARDADA");
                            }else{
                                console.log("ERROR- LA VARIABLE CONST: "+ variable.id+" SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                            }
                        }
                            
                    }else{
                    console.log("ERROR - VARIABLE CONST: "+ variable.id+" DEBE DECLARARSE CON VALOR");
                    }

                }else if(this.tipovariable==tipo_variable.LET){
                    //LAS VARIABLES LET SE PUEDEN GUARDAR CON O SIN VALOR
                    //AQUI VAMOS A VERIFICAR LAS COMBINACIONES, LO UNICO QUE SI TIENE QUE VENIR
                    //COMO MINIMO ES EL IDs

                    let tipodato:tipo_valor;
                    
                    if(variable.tipodato== undefined && variable.exp==undefined){
                        //SIGNIFICA QUE SOLO TRAE EL ID
                        tipodato=undefined;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");
                    }else if(variable.tipodato== undefined && variable.exp!=undefined){
                        //SIGNIFICA QUE NO TRAE TIPO DE DATO PERO SI VALOR, ENTONCES SE LE PUEDE ASIGNAR 
                        //EL TIPO DE DATO DE LA EXPRESION
                        tipodato= variable.exp.obtenerTipo(ambito);
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                    }else if(variable.tipodato!=undefined && variable.exp==undefined){
                        //SIGNIFICA QUE SI TRAE EL TIPO DE DATO PERO NO TRAE EXPRESION
                        tipodato= variable.tipodato;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                    }else if(variable.tipodato!=undefined && variable.exp!=undefined){
                        //SIGNIFICA QUE TRAE EL TIPO DE DATO Y LA EXPRESION
                        //AQUI HAY QUE VALIDAR QUE EL 
                        //TIPO DE DATO Y EL TIPO DE DATO DE LA EXPRESION SEAN IGUALES
                        if(variable.tipodato==variable.exp.obtenerTipo(ambito)){
                            //SI LOS TIPOS DE DATOS SON IGUALES ENTONCES PODEMOS GUARDAR LA NUEVA VARIABLE
                        tipodato= variable.tipodato;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                        }else{
                        console.log("ERROR- LA VARIABLE LET: "+ variable.id+" SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                        }
                    }


                }
                
            }
        });

        return null;
    }

}