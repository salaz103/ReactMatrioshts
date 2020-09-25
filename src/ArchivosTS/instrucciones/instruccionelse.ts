import entorno from "../entorno/entorno";
import instruccion from "./instruccion";

export class instruccionelse implements instruccion{

    listaelse:instruccion[];

    constructor(lista:instruccion[]){
        this.listaelse=lista;
    }

    ejecutar(ambito: entorno): object {
        //SI LLAMAN A ESTE METODO DEL ELSE, SIGNIFICA QUE NINGUNA OTRA CONDICION FUE VERDADERA
        //EN ALGUN IF O ELSE IF() DE ARRIBA
        const tselse= new entorno("ELSE",ambito);
        //ENTONCES AQUI SOLO EJECUTO LAS INSTRUCCIONES
        for (let i = 0; i < this.listaelse.length; i++) {
            this.listaelse[i].ejecutar(tselse);
        }
        return null;
    }

    
}