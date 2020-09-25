import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class instruccionif implements instruccion{

    exp:expresion;
    instrucciones:instruccion[];

    constructor(exp:expresion, listai:instruccion[]){
        this.exp=exp;
        this.instrucciones=listai;
    }


    ejecutar(ambito: entorno): object {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        const valorcondicion= this.exp.obtenerValor(ambito);
        const tipocondicion= this.exp.obtenerTipo(ambito);
        if(tipocondicion==tipo_valor.BOOLEAN){
            let valorc= valorcondicion as Boolean;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            if(valorc.valueOf()){
                const tsif= new entorno("if",ambito);
                this.instrucciones.forEach(instruccion => {
                        instruccion.ejecutar(tsif);
                });
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA CONDICION '+ String(valorcondicion)+' EN EL IF, NO ES BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA CONDICION "+ String(valorcondicion) +"NO ES BOOLEANA");
        }
        return null;
    }

}