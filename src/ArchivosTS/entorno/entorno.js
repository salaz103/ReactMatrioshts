"use strict";
exports.__esModule = true;
var simbolo_1 = require("./simbolo");
var entorno = /** @class */ (function () {
    function entorno(simbolos) {
        this.apuntadorPadre = simbolos;
        this.ts = [];
    }
    entorno.prototype.agregarSimbolo = function (id, tipo, valor) {
        var nuevoSimbolo = new simbolo_1["default"](id, tipo, valor);
        this.ts.push(nuevoSimbolo);
    };
    return entorno;
}());
