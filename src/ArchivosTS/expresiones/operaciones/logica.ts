import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";

export class logica extends operacion implements expresion{

    tipo:tipo_valor;

    constructor(expiz:expresion,op:operador,expder:expresion){
        super(expiz,op,expder);
    }

    obtenerValor(ambito:entorno){
        const valorizquierdo= this.expresionizquierda.obtenerValor(ambito);
        const valorderecha= this.expresionderecha.obtenerValor(ambito);

        const tipoiz= this.expresionizquierda.obtenerTipo(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);

        //PRIMERO VEMOS SI ES AND,OR
        if(this.tipooperador==operador.AND){

            if(tipoiz==tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
                const i= valorizquierdo as Boolean;
                const d= valorderecha as Boolean;
                const res= i.valueOf() && d.valueOf();
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
            }
            
    
        }else if(this.tipooperador==operador.OR){

           if(tipoiz==tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
            const i= valorizquierdo as Boolean;
            const d= valorderecha as Boolean;
            const res= i.valueOf() || d.valueOf();
            this.tipo=tipo_valor.BOOLEAN;
            return new Boolean(res);
            }else{
                //ERROR SEMANTICO
            }

        }
      
        return null;
    }

    obtenerTipo(){
        return this.tipo;
    }

}