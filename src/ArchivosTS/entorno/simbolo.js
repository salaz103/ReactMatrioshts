"use strict";
exports.__esModule = true;
var simbolo = /** @class */ (function () {
    function simbolo(id_e, tipo_e, valor) {
        this.id = id_e;
        this.tipoSimbolo = tipo_e;
        this.valor = valor;
    }
    simbolo.prototype.getId = function () {
        return this.id;
    };
    simbolo.prototype.getTipo = function () {
        return this.tipoSimbolo;
    };
    simbolo.prototype.getValor = function () {
        return this.valor;
    };
    simbolo.prototype.setValor = function (valor_e) {
        this.valor = valor_e;
    };
    return simbolo;
}());
exports.simbolo = simbolo;
exports["default"] = simbolo;
