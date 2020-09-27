"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_1 = require("../../actions/ts");
var graficar = /** @class */ (function () {
    function graficar() {
    }
    graficar.prototype.ejecutar = function (ambito) {
        //EL EJECUTAR DE ESTA FUNCION VA A SER ENVIAR EL AMBITO DONDE ESTA A LA STORE 
        //DEL PROYECTO Y AHI VAMOS A RECORRER AMBITOS Y TS
        //AQUI SOLO ESTOY RECORRIENDO LA TS
        var simbolos = [];
        for (var entornoactual = ambito; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            for (var i = 0; i < entornoactual.ts.length; i++) {
                simbolos.push({
                    nombre: entornoactual.ts[i].id,
                    tipo: entornoactual.ts[i].tipovalor,
                    ambito: entornoactual.nombre,
                    /*valor: Array.isArray(entornoactual.ts[i])? JSON.stringify(entornoactual.ts[i]):entornoactual.ts[i].valor,*/
                    valor: entornoactual.ts[i].valor,
                    reasignable: entornoactual.ts[i].reasignable
                });
            }
        }
        //AHORA QUE YA TENGO EL ARREGLO DE OBJETOS, VOY A INGRESAR ESTE ARREGLO
        //AL ARREGLO DE MI STORE
        app_1.almacen.dispatch(ts_1.reportets(simbolos));
        return null;
    };
    return graficar;
}());
exports.graficar = graficar;
