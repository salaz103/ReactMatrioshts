"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var operacion_1 = require("./operacion");
var aritmetica = /** @class */ (function (_super) {
    __extends(aritmetica, _super);
    function aritmetica(expiz, op, expder) {
        return _super.call(this, expiz, op, expder) || this;
    }
    aritmetica.prototype.obtenerValor = function (ambito) {
        var valorizquierdo = this.expresionizquierda.obtenerValor(ambito);
        var valorderecha = this.expresionderecha.obtenerValor(ambito);
        var tipoiz = this.expresionizquierda.obtenerTipo(ambito);
        var tipoder = this.expresionderecha.obtenerTipo(ambito);
        if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
            var res = Number(valorizquierdo) + Number(valorderecha);
            this.tipo = tipo_1.tipo_valor.NUMBER;
            return new Number(res);
        }
        return null;
    };
    aritmetica.prototype.obtenerTipo = function () {
        return this.tipo;
    };
    return aritmetica;
}(operacion_1["default"]));
exports.aritmetica = aritmetica;
