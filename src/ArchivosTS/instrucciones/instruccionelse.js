"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var instruccionelse = /** @class */ (function () {
    function instruccionelse(lista) {
        this.listaelse = lista;
    }
    instruccionelse.prototype.ejecutar = function (ambito) {
        //SI LLAMAN A ESTE METODO DEL ELSE, SIGNIFICA QUE NINGUNA OTRA CONDICION FUE VERDADERA
        //EN ALGUN IF O ELSE IF() DE ARRIBA
        var tselse = new entorno_1["default"]("ELSE", ambito);
        //ENTONCES AQUI SOLO EJECUTO LAS INSTRUCCIONES
        for (var i = 0; i < this.listaelse.length; i++) {
            var valori = this.listaelse[i].ejecutar(tselse);
            if (valori && valori.valueOf() == tipo_1.tipo_instruccion.BREAK) {
                return valori;
            }
            else if (valori && valori.valueOf() == tipo_1.tipo_instruccion.CONTINUE) {
                return valori;
            }
            else if (valori != null) {
                return valori;
            }
        }
        return null;
    };
    return instruccionelse;
}());
exports.instruccionelse = instruccionelse;
