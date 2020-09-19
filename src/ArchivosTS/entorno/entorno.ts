import simbolo from './simbolo';
import tipo from './tipo';

class entorno{

    apuntadorPadre:entorno;
    ts:simbolo[];

    constructor(simbolos?:entorno){
        this.apuntadorPadre=simbolos;
        this.ts=[];
    }

    agregarSimbolo(id:string,tipo:tipo,valor:object){
        const nuevoSimbolo= new simbolo(id,tipo,valor);
        this.ts.push(nuevoSimbolo)
    }

}