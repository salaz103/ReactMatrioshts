"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var instruccionfor = /** @class */ (function () {
    function instruccionfor(i1, i2, i3, lista) {
        this.primerainstruccion = i1;
        this.expresion = i2;
        this.tercerainstruccion = i3;
        this.listainstrucciones = lista;
    }
    instruccionfor.prototype.ejecutar = function (ambito) {
        //PRIMERO HAY QUE HACER UNA NUEVA TS 
        var tsfor = new entorno_1["default"]("FOR", ambito);
        this.primerainstruccion.ejecutar(tsfor);
        while (this.expresion.obtenerValor(tsfor).valueOf()) {
            for (var i = 0; i < this.listainstrucciones.length; i++) {
                this.listainstrucciones[i].ejecutar(tsfor);
            }
            this.tercerainstruccion.ejecutar(tsfor);
        }
        return null;
    };
    return instruccionfor;
}());
exports.instruccionfor = instruccionfor;
