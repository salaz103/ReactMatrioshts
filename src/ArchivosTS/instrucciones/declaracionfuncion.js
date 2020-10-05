"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var instruccionreturn_1 = require("./instruccionreturn");
var declaracionfuncion = /** @class */ (function () {
    function declaracionfuncion(n, lista, par, t) {
        this.nombre = n;
        this.listainstrucciones = lista;
        this.parametros = par;
        this.tipodato = t != null ? t : tipo_1.tipo_valor.VOID;
    }
    declaracionfuncion.prototype.ejecutar = function (ambito) {
        //AQUI YA SE REALIZARON LAS VALIDACIONES Y EL AMBITO QUE ESTAMOS RECIBIENDO ES EL NUEVO
        for (var i = 0; i < this.listainstrucciones.length; i++) {
            if (this.listainstrucciones[i] instanceof instruccionreturn_1.instruccionreturn) {
                var valreturn = this.listainstrucciones[i].ejecutar(ambito);
                return valreturn;
            }
            else {
                var valor = this.listainstrucciones[i].ejecutar(ambito);
                if (valor != null) {
                    return valor;
                }
                //PREGUNTO SI ES CONTINUE O BREAK
            }
        }
        return null;
    };
    return declaracionfuncion;
}());
exports.declaracionfuncion = declaracionfuncion;
