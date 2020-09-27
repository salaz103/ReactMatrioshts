import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import { instruccionreturn } from "./instruccionreturn";

export class llamarfuncion implements instruccion{

    nombrefuncion:string;
    parametros:expresion[];
    tipo:tipo_valor;

    constructor(id:string, lista:expresion[]){
        this.nombrefuncion=id;
        this.parametros= lista;
    }

    obtenerTipo(ambito:entorno):tipo_valor{
        return this.tipo;
    }

    obtenerValor(ambito:entorno):object{
        //ESTE METODO ES DE UNA EXPRESION, ESTO ES POR QUE SIGNIFICA QUE AQUI SI HAY QUE DEVOLVER UN VALOR
        //QUIERE DECIR QUE PUEDE QUE ESTO SEA ASIGNADO A UNA VARIABLE O QUE SEA EL RESULTADO A DEVOLVER
        //DE UN RETURN
        return this.ejecutar(ambito);
    }

    ejecutar(ambito: entorno): object {
        //CUANDO LLAME A UNA FUNCION, LO PRIMERO QUE DEBO HACER ES BUSCAR ESA FUNCION EN MI ENTORNO
        let funcion= ambito.existeFuncion(this.nombrefuncion);
        //SI LA FUNCION EXISTE, ANTES DE EJECUTARLA HAY QUE HACER VARIAS VALIDACIONES
        /*
            1. VALIDAR SI LA FUNCION ENTRANTE VIENE CON PARAMETROS O NO
            2. VALIDAR QUE LA CANTIDAD DE PARAMETROS ENTRANTES SEA IGUAL A LA QUE LA FUNCION TIENE
            3. VALIDAR QUE EL TIPO DE DATO ENTRANTE EN LOS PARAMETROS SEA SIMILAR AL TIPO DE DATO
               DE LOS PARAMETROS DE LA FUNCIÓN       
        */
        if(funcion){

            //AQUI TENDRIA QUE VALIDARSE SI ES UNA FUNCION HIJA, ES DECIR, SI EN SU NOMBRE
            //TRAE UN _ PARA IR A EJECUTAR AL PADRE Y TRAER ESOS VALORES A LA TS PARA EJECUTAR A LA HIJA

        
            if(this.parametros==undefined){


                //SIGNIFICA QUE LA FUNCION ENTRANTE NO TIENE PARAMETROS
                //POR LO QUE LA FUNCION GUARDADA NO DEBERIA DE TENER PARAMETROS
                if(funcion.parametros==undefined){
                    //SIGNIFICA QUE LA FUNCION TAMPOCO TRAE PARAMETROS
                    //ENTONCES PODEMOS MANDAR A EJECUTAR
                    //CREAMOS EL NUEVO AMBITO QUE APUNTA AL PADRE
                    let tsfuncion= new entorno(funcion.nombre,ambito);
                    this.tipo=funcion.tipodato;
                    return funcion.ejecutar(tsfuncion);
                }else{
                    //ERROR - LA FUNCION ESPERA funcion.parametros.length parametros y se recibieron 0
                }



                
            }else{
                //SIGNIFICA QUE LA FUNCION ENTRANTE SI TRAE PARAMETROS
                
                //AQUI ESTOY VALIDANDO QUE LA FUNCION GUARDADA TAMBIEN TENGA PARAMETROS
                if(funcion.parametros){

                    //AHORA VALIDO QUE LOS PARAMETROS QUE ESTOY RECIBIENDO SEAN LA MISMA CANTIDAD QUE LOS QUE
                    //LA FUNCION GUARDADA TIENE
                    if(funcion.parametros.length==this.parametros.length){

                        //AHORA HAY QUE VALIDAR QUE EL TIPO DE DATO DE LOS PARAMETROS ENTRANTES SEAN IGUAL
                        //AL TIPO DE DATO DE LOS PARAMETROS DE LA FUNCION
                        /**************   VALIDACION 3 PENDIENTE******************/
                    
                        let entornonuevo:simbolo[]=[];


                        //SI TODO ESTA CORRECTO ENTONCES LO QUE DEBEMOS HACER ES EN UNA NUEVA TS
                        //ALMACENAR LOS PARAMETROS DE LA FUNCION GUARDADA CON EL VALOR DE LOS ENTRANTES
                        this.tipo=funcion.tipodato;
                        let tsfuncion= new entorno(funcion.nombre,ambito);
                        for (let i = 0; i < this.parametros.length; i++) {
                            let valor= this.parametros[i].obtenerValor(ambito);
                            let simbolonuevo= new simbolo(funcion.parametros[i].id,true,funcion.parametros[i].tipo,valor);
                            //entornonuevo.agregarSimbolo(simbolonuevo);
                            entornonuevo.push(simbolonuevo);
                        }

                        tsfuncion.ts=entornonuevo;
                        //AHORA QUE YA TENGO LA NUEVA TS CON SUS SIMBOLOS Y VALORES
                        //YA PUEDO MANDAR A EJECUTARLA
                        //PERO LA TENGO QUE DEVOLVER
                        return funcion.ejecutar(tsfuncion);

                    }else{
                        //ERROR - LA CANTIDAD DE PARAMETROS NO COINCIDE
                    }


                }else{
                    //ERROR- LA FUNCION funcion.nombre no requiere parametros
                }



            }



        }else{
            //ERROR - LA FUNCION NO EXISTE
        }
        return null;
    }
    
}