"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var instruccionif = /** @class */ (function () {
    function instruccionif(exp, listai) {
        this.exp = exp;
        this.instrucciones = listai;
    }
    instruccionif.prototype.ejecutar = function (ambito) {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        var valorcondicion = this.exp.obtenerValor(ambito);
        var tipocondicion = this.exp.obtenerTipo(ambito);
        if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
            var valorc = valorcondicion;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            if (valorc.valueOf()) {
                var tsif_1 = new entorno_1["default"]("if", ambito);
                this.instrucciones.forEach(function (instruccion) {
                    instruccion.ejecutar(tsif_1);
                });
            }
        }
        else {
            console.log("ERROR - LA CONDICION " + String(valorcondicion) + "NO ES BOOLEANA");
        }
        return null;
    };
    return instruccionif;
}());
exports.instruccionif = instruccionif;
