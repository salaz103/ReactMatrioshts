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

    asignarValor(id:string,valor:object,tipo:tipo_valor){

        for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=this.apuntadorPadre){
            for (let i = 0; i < entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    entornoactual.ts[i].setTipo(tipo);
                    entornoactual.ts[i].setValor(valor);
                    return;
                 }
            }
         }

    }

    existe(id:string):boolean{

        //RECORRIENDO LOS ENTORNOS
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=this.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);

            //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
            for (let i = 0; i <entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    return true;
                }
            }
        } 

        //SI REGRESA FALSE ES POR QUE NO ENCONTRO EL ID EN NINGUN AMBITO
        return false;
    }

    existeLocal(id:string):boolean{
        //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
        for (let i = 0; i <this.ts.length; i++) {
            if(this.ts[i].getId()==id){
                return true;
            }
        }

    }

    
    getSimbolo(id:string):simbolo{

         for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=this.apuntadorPadre){
            for (let i = 0; i < entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    return entornoactual.ts[i];
                 }
            }
         }

    }

}


export default entorno;