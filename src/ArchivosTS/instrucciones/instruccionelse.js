"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
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
            this.listaelse[i].ejecutar(tselse);
        }
        return null;
    };
    return instruccionelse;
}());
exports.instruccionelse = instruccionelse;
