import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { operador, tipo_valor } from "../entorno/tipo";
import instruccion from "./instruccion";

export class incremento_decremento implements instruccion{

    id:string;
    tipooperador:operador;

    constructor(id:string, op:operador){
        this.id=id;
        this.tipooperador=op;
    }

    ejecutar(ambito: entorno): object {

        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        let sim:simbolo;
        if(ambito.existe(this.id)){
            sim=ambito.getSimbolo(this.id);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //3. VERIFICAR SI YA FUE INICIALIZADA LA VARIABLE, ES DECIR !=NULL

            //VALIDACION 1)
            if(sim.getReasignable()==true){

                //VALIDACION 2)
                if(sim.getTipo()==tipo_valor.NUMBER){

                    //VALIDACION 3)
                    if(sim.getValor()!=null){
                        //SI PASO TODAS LAS VALIDACIONES
                        //AHORA TOCA VER SI ES UN INCREMENTO O UN DECREMENTO
                        let valor= JSON.stringify(sim.getValor());

                        if(this.tipooperador==operador.INCREMENTO){
                            const nuevo=new Number(Number(valor)+Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());

                        }else{
                            const nuevo=new Number(Number(valor)-Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());
                        }

                    }else{
                        console.log("ERROR - ID:"+this.id+" ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA");
                    }

                }else{
                    console.log("ERROR - ID: "+this.id+" NO ES DE TIPO NUMBER");
                }

            }else{
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: "+ this.id+" ES UNA VARIABLE CONST");
            }

        }else{
            console.log("ERROR - VARIABLE: "+ this.id+" NO ESTA DEFINIDA");
        }


        return null;
    }

}