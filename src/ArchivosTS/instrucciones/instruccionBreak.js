"use strict";
exports.__esModule = true;
var instruccionbreak = /** @class */ (function () {
    function instruccionbreak(t) {
        this.tipo = t;
    }
    instruccionbreak.prototype.ejecutar = function (ambito) {
        return new Object(this.tipo);
    };
    return instruccionbreak;
}());
exports.instruccionbreak = instruccionbreak;
