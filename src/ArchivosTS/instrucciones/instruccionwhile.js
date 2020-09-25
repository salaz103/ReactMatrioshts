"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionwhile = /** @class */ (function () {
    function instruccionwhile(exp, listawhile) {
        this.expresioncondicion = exp;
        this.lista = listawhile;
    }
    instruccionwhile.prototype.ejecutar = function (ambito) {
        //PRIMERO TENEMOS QUE VERIFICAR QUE LA EXPRESION SEA DE TIPO BOOLEANA
        //SIEMPRE ANTES DE OBTENER EL TIPO, HAY QUE EJECUTAR LA EXPRESION
        //YA QUE CUANDO SE EJECUTA ES CUANDO SE LE COLCA EL TIPO
        console.log("INICIANDO WHILE");
        var valorexpresion = this.expresioncondicion.obtenerValor(ambito);
        var tipoexpresion = this.expresioncondicion.obtenerTipo(ambito);
        if (tipoexpresion == tipo_1.tipo_valor.BOOLEAN) {
            /*console.log("LISTA INSTRUCCIONES WHILE");
            console.log(this.lista);
            console.log("VALOR EXPRESION DE LA CONDICION");
            console.log(JSON.stringify(this.expresioncondicion.obtenerValor(ambito)));*/
            while (this.expresioncondicion.obtenerValor(ambito).valueOf()) {
                var tswhile = new entorno_1["default"]("WHILE", ambito);
                for (var i = 0; i < this.lista.length; i++) {
                    this.lista[i].ejecutar(tswhile);
                }
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA");
        }
        return null;
    };
    return instruccionwhile;
}());
exports.instruccionwhile = instruccionwhile;
