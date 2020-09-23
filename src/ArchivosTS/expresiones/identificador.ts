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
        let sim:simbolo;
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        if(ambito.existe(this.id)){
            console.log("SI ENCONTRE EL ID: "+this.id);
            sim=ambito.getSimbolo(this.id);
        }

        

    //AQUI COMIENZAN LAS OPERACIONES PARA VER SI ENCONTRO O NO EL SIMBOLO
    if(sim){
        //SI EL SIMBOLO NO ES NULO SIGNFICA QUE SI LO ENCONTRE Y AQUI PUEDO REGRESAR EL VALOR
        if(sim.getTipo()==tipo_valor.STRING){
            this.tipo=tipo_valor.STRING;
            return sim.getValor();
        }else if(sim.getTipo()==tipo_valor.NUMBER){
            this.tipo=tipo_valor.NUMBER;
            return sim.getValor();
        }else if(sim.getTipo()==tipo_valor.BOOLEAN){
            this.tipo=tipo_valor.BOOLEAN;
            return sim.getValor();
        }

    }else{
        console.log("ERROR- IDENTIFICADOR "+ this.id+" NO EXISTE");
    }
        return null;
    }

    
    obtenerTipo(ambito: entorno): tipo_valor {
        return this.tipo;
    }

}