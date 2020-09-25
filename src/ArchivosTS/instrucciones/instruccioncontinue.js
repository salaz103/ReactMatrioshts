"use strict";
exports.__esModule = true;
var instruccioncontinue = /** @class */ (function () {
    function instruccioncontinue(t) {
        this.tipo = t;
    }
    instruccioncontinue.prototype.ejecutar = function (ambito) {
        return new Object(this.tipo);
    };
    return instruccioncontinue;
}());
exports.instruccioncontinue = instruccioncontinue;
