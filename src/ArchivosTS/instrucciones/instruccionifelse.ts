import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionifelse implements instruccion{

    condicion:expresion;
    listatrue:instruccion[];
    listafalse:instruccion[];

    constructor(condicion:expresion,listat:instruccion[],listaf:instruccion[]){
        this.condicion=condicion;
        this.listatrue= listat;
        this.listafalse=listaf;
    }


    ejecutar(ambito: entorno): object {

        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        const valorcondicion= this.condicion.obtenerValor(ambito);
        const tipocondicion= this.condicion.obtenerTipo(ambito);
        //console.log(valorcondicion);
        if(tipocondicion==tipo_valor.BOOLEAN){
            let valorc= valorcondicion as Boolean;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            
            if(valorc.valueOf()){
                //SI ENTRO AQUI, SE EJECUTAN LAS INSTRUCCIONES DEL TRUE
                const tsif= new entorno("if",ambito);
                this.listatrue.forEach(instruccion => {
                        instruccion.ejecutar(tsif);
                });
            }else{
                //SI LA CONDICION NO ES VERDADERA, SE EJECUTA EL "ELSE"
                //ES DECIR LAS INSTRUCCIONES DEL FALSE
                const tselse= new entorno("else",ambito);
                this.listafalse.forEach(instruccion => {
                        instruccion.ejecutar(tselse);
                });
            }

        }else{
            console.log("ERROR - LA CONDICION "+ String(valorcondicion) +"NO ES BOOLEANA");
        }

        return null;
    }

}