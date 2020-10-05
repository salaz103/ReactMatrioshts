"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var instruccionreturn = /** @class */ (function () {
    function instruccionreturn(e) {
        this.exp = e;
        this.tipo = tipo_1.tipo_instruccion.RETURN;
    }
    instruccionreturn.prototype.ejecutar = function (ambito) {
        if (this.exp == undefined) {
            //SIGNIFICA QUE ES UN RETURN SIN EXPRESION
            return new Object(this.tipo);
        }
        else {
            ///SIGNIFICA QUE ES UN RETURN CON EXPRESION
            //LO PRIMERO QUE TENGO QUE HACER ES EVALUAR ESA EXPRESION
            var valor = this.exp.obtenerValor(ambito);
            return valor;
        }
    };
    return instruccionreturn;
}());
exports.instruccionreturn = instruccionreturn;
