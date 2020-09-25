import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionfor implements instruccion{

primerainstruccion:instruccion;
expresion:expresion;
tercerainstruccion:instruccion;
listainstrucciones:instruccion[];

    constructor(i1:instruccion,i2:expresion,i3:instruccion,lista:instruccion[]){
        this.primerainstruccion=i1;
        this.expresion=i2;
        this.tercerainstruccion=i3;
        this.listainstrucciones=lista;
    }



    ejecutar(ambito: entorno): object {

        //PRIMERO HAY QUE HACER UNA NUEVA TS 
        const tsfor= new entorno("FOR",ambito);
        this.primerainstruccion.ejecutar(tsfor);

        while(this.expresion.obtenerValor(tsfor).valueOf()){
            for (let i = 0; i < this.listainstrucciones.length; i++) {
                    this.listainstrucciones[i].ejecutar(tsfor);                
            }
            this.tercerainstruccion.ejecutar(tsfor);
        }

        return null;
    }

}