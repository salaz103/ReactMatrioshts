import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class instrucciondowhile implements instruccion{

    lista_do:instruccion[];
    condicion:expresion;

    constructor(lista:instruccion[],exp:expresion){
        this.lista_do=lista;
        this.condicion=exp;
    }


    ejecutar(ambito: entorno): object {

        //EL CICLO DO WHILE, NO IMPORTANDO LA CONDICION, SIEMPRE EJECUTA AL MENOS UNA VEZ SUS INSTRUCCIONES
        const tsdowhile= new entorno("do",ambito);
        /*console.log("INICIO DEL DO-WHILE");
        console.log(tsdowhile);
        console.log("LISTA DO-WHILE");
        console.log(this.lista_do);*/
        for (let i = 0; i < this.lista_do.length; i++) {
            this.lista_do[i].ejecutar(tsdowhile);
        }


        //DESPUES HAY QUE VERIFICAR SI LA CONDICION ES BOOLEANA PARA PODER VOLVER A EJECUTAR LAS INSTRUCCIONES
        const valorexpresion= this.condicion.obtenerValor(ambito);
        const tipoexpresion= this.condicion.obtenerTipo(ambito);

        if(tipoexpresion==tipo_valor.BOOLEAN){

            do {
                const nuevats= new entorno("do-while",ambito);
                for (let i = 0; i < this.lista_do.length; i++) {
                    this.lista_do[i].ejecutar(nuevats);
                }
                
            } while (this.condicion.obtenerValor(ambito).valueOf());

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA");
        }

        return null;
    }

}