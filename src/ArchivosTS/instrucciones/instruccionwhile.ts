import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
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
        //PRIMERO TENEMOS QUE VERIFICAR QUE LA EXPRESION SEA DE TIPO BOOLEANA
        //SIEMPRE ANTES DE OBTENER EL TIPO, HAY QUE EJECUTAR LA EXPRESION
        //YA QUE CUANDO SE EJECUTA ES CUANDO SE LE COLCA EL TIPO
        console.log("INICIANDO WHILE");
        const valorexpresion= this.expresioncondicion.obtenerValor(ambito);
        const tipoexpresion= this.expresioncondicion.obtenerTipo(ambito);

        if(tipoexpresion==tipo_valor.BOOLEAN){
            /*console.log("LISTA INSTRUCCIONES WHILE");
            console.log(this.lista);
            console.log("VALOR EXPRESION DE LA CONDICION");
            console.log(JSON.stringify(this.expresioncondicion.obtenerValor(ambito)));*/
            while(this.expresioncondicion.obtenerValor(ambito).valueOf()){
                const tswhile=new entorno("WHILE",ambito);
                for (let i = 0; i < this.lista.length; i++) {
                    this.lista[i].ejecutar(tswhile);
                }
            }

        }else{
            console.log("ERROR - LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA");
        }

        return null;
    }


}