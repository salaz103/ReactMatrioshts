import simbolo from './simbolo';
import {tipo_valor} from './tipo';

class entorno{

    apuntadorPadre:entorno;
    ts:simbolo[];

    constructor(simbolos?:entorno){
        this.apuntadorPadre = simbolos != null ? simbolos : null;
        this.ts=[];
    }

    agregarSimbolo(id:string,tipo:tipo_valor,valor:object){
        const nuevoSimbolo= new simbolo(id,tipo,valor);
        this.ts.push(nuevoSimbolo)
    }

    setValor(id:string,valor:object){
        const simbolo= this.ts.filter(simbolo=>simbolo.id==id)[0];

    }


}


export default entorno;