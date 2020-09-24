"use strict";
exports.__esModule = true;
var variable = /** @class */ (function () {
    function variable(id, l, c, tipodato, exp) {
        this.id = id;
        this.tipodato = tipodato;
        this.exp = exp;
        //POSICION
        this.linea = l;
        this.columna = c;
    }
    return variable;
}());
exports.variable = variable;
