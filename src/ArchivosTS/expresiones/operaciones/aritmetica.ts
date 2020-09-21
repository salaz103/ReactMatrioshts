import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";

export class aritmetica extends operacion implements expresion{

    tipo:tipo_valor;

    constructor(expiz:expresion,op:operador,expder:expresion){
        super(expiz,op,expder);
    }

    obtenerValor(ambito:entorno){
        const valorizquierdo= this.expresionizquierda.obtenerValor(ambito);
        const valorderecha= this.expresionderecha.obtenerValor(ambito);

        const tipoiz= this.expresionizquierda.obtenerTipo(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);


        if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
            const res= Number(valorizquierdo) + Number(valorderecha);
            this.tipo=tipo_valor.NUMBER;
            return new Number(res);
        }

        return null;
    }

    obtenerTipo(){
        return this.tipo;
    }

}