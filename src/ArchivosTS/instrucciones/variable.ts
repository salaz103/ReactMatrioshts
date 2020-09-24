import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";

export class variable{

    id:string;
    tipodato:tipo_valor;
    exp:expresion;
    linea:number;
    columna:number;


    constructor(id:string,l:number,c:number)
    constructor(id:string,l:number,c:number,tipodato?:tipo_valor)
    constructor(id:string,l:number,c:number,tipodato?:tipo_valor,exp?:expresion){

        this.id=id;
        this.tipodato=tipodato;
        this.exp=exp;

        //POSICION
        this.linea=l;
        this.columna=c;
    }


}