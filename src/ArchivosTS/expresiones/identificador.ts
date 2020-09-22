import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_valor } from "../entorno/tipo";
import expresion from "./expresion";

export class identificador implements expresion{

    id:string;
    tipo:tipo_valor;
    constructor(identificador:string){
        this.id=identificador;
    }


    obtenerValor(ambito: entorno): object {

        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        for (let entornoactual = ambito; entornoactual!=null ; entornoactual=ambito.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);
            
            //PRIMERO BUSCO EL ID EN EL AMBITO DONDE ESTOY
            if(entornoactual.existe(this.id)){

            //AHORA QUE YA LO TENGO, TENDRIA QUE VALIDAR SI ESE ID TIENE UNA EXPRESION
            const sim:simbolo= entornoactual.getSimbolo(this.id);
            if(sim.getTipo()==tipo_valor.STRING){
                this.tipo=tipo_valor.STRING;
                return sim.getValor();
            }

        }else{
            //ERROR - LA VARIABLE NO EXISTE
        }
    }


        


        return null;
    }

    
    obtenerTipo(ambito: entorno): tipo_valor {
        return this.tipo;
    }

}