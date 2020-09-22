import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";

export class variable{

    id:string;
    tipodato:tipo_valor;
    exp:expresion;


    constructor(id:string)
    constructor(id:string,tipodato?:tipo_valor)
    constructor(id:string,tipodato?:tipo_valor,exp?:expresion){

        this.id=id;
        this.tipodato=tipodato;
        this.exp=exp;
    }


}