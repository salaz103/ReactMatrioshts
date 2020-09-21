"use strict";
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var unaria = /** @class */ (function () {
    function unaria(op, expder) {
        this.expresionderecha = expder;
        this.tipooperador = op;
    }
    unaria.prototype.obtenerValor = function (ambito) {
        var valorderecha = this.expresionderecha.obtenerValor(ambito);
        var tipoder = this.expresionderecha.obtenerTipo(ambito);
        //PRIMERO VEMOS SI ES NOT O MENOS (-)
        if (this.tipooperador == tipo_1.operador.MENOS) {
            if (tipoder == tipo_1.tipo_valor.NUMBER) {
                var d = Number(valorderecha) * -1;
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(d);
            }
            else {
                //ERROR SEMANTICO
            }
        }
        else if (this.tipooperador == tipo_1.operador.NOT) {
            if (tipoder == tipo_1.tipo_valor.BOOLEAN) {
                var d = valorderecha;
                var res = !(d.valueOf());
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
            }
        }
        return null;
    };
    unaria.prototype.obtenerTipo = function () {
        return this.tipo;
    };
    return unaria;
}());
exports.unaria = unaria;
