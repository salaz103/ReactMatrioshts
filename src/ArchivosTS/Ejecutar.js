"use strict";
exports.__esModule = true;
var entorno_1 = require("./entorno/entorno");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
function inicioEjecucion(ast) {
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    app_1.almacen.dispatch(ts_js_1.limpiarconsola());
    //CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
    var entornoGlobal = new entorno_1["default"]("global");
    console.log("Recibiendo el AST para EJECUTAR:");
    console.log(ast);
    ejecutar(ast, entornoGlobal);
}
function ejecutar(ast, entorno) {
    ast.forEach(function (instruccion) {
        instruccion.ejecutar(entorno);
    });
}
exports["default"] = inicioEjecucion;
