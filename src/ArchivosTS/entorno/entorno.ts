import simbolo from './simbolo';
import {tipo_valor} from './tipo';

class entorno{

    apuntadorPadre:entorno;
    ts:simbolo[];
    nombre:string;

    constructor(nombre:string,ambitoPadre?:entorno){
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.ts=[];
        this.nombre= nombre;
    }

    agregarSimbolo(nuevoSimbolo:simbolo){
        this.ts.push(nuevoSimbolo)
    }

    setValor(id:string,valor:object){
        const simbolo= this.ts.filter(simbolo=>simbolo.id==id)[0];

    }

    existe(id:string):boolean{

        for (let i = 0; i < this.ts.length; i++) {
            if(this.ts[i].id==id){
                return true;
            }
        }
        return false;
    }

    getSimbolo(id:string):simbolo{

        //FORMA 1
        // for(let e:entorno= this;e!=null;e=e.apuntadorPadre){
        //     for (let i = 0; i < this.ts.length; i++) {
        //         if(this.ts[i].getId()==id){
        //             return this.ts[i];
        //         }
        //     }
        // }

        //AQUI ESTA BUSCANDO EL SIMBOLO EN EL AMBITO QUE LE ESTOY PASANDO
        for (let i = 0; i < this.ts.length; i++) {
            if(this.ts[i].getId()==id){
                return this.ts[i];
            }
        }
    }

}


export default entorno;