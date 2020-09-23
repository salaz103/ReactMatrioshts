import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionwhile implements instruccion{

    expresioncondicion:expresion;
    lista:instruccion[];

    constructor(exp:expresion,listawhile:instruccion[]){
        this.expresioncondicion=exp;
        this.lista=listawhile;
    }


    ejecutar(ambito: entorno): object {

        return null;
    }


}