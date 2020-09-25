import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class instruccionifelse implements instruccion{

    condicion:expresion;
    listatrue:instruccion[];
    elseif_else:instruccion;

    constructor(condicion:expresion,listat:instruccion[],elseifoelse:instruccion){
        this.condicion=condicion;
        this.listatrue= listat;
        this.elseif_else=elseifoelse;
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
                //SI LA CONDICION NO ES VERDADERA SE EJECUTA LO OTRO
                //PERO PUEDE QUE AQUI VENGA UN ELSE IF O SOLO UN ELSE
                //SOLO MANDO A EJECUTAR ESE ELSE O ELSE IF Y QUE ELLOS HAGAN SUS NUEVOS AMBITOS
                this.elseif_else.ejecutar(ambito);
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA CONDICION '+ String(valorcondicion)+' , NO ES BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA CONDICION "+ String(valorcondicion) +"NO ES BOOLEANA");
        }

        return null;
    }

}