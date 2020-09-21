"use strict";
exports.__esModule = true;
var simbolo_1 = require("./simbolo");
var entorno = /** @class */ (function () {
    function entorno(simbolos) {
        this.apuntadorPadre = simbolos != null ? simbolos : null;
        this.ts = [];
    }
    entorno.prototype.agregarSimbolo = function (id, tipo, valor) {
        var nuevoSimbolo = new simbolo_1["default"](id, tipo, valor);
        this.ts.push(nuevoSimbolo);
    };
    entorno.prototype.setValor = function (id, valor) {
        var simbolo = this.ts.filter(function (simbolo) { return simbolo.id == id; })[0];
    };
    return entorno;
}());
exports["default"] = entorno;
