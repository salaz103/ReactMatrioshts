"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionifelse = /** @class */ (function () {
    function instruccionifelse(condicion, listat, listaf) {
        this.condicion = condicion;
        this.listatrue = listat;
        this.listafalse = listaf;
    }
    instruccionifelse.prototype.ejecutar = function (ambito) {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        var valorcondicion = this.condicion.obtenerValor(ambito);
        var tipocondicion = this.condicion.obtenerTipo(ambito);
        //console.log(valorcondicion);
        if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
            var valorc = valorcondicion;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            if (valorc.valueOf()) {
                //SI ENTRO AQUI, SE EJECUTAN LAS INSTRUCCIONES DEL TRUE
                var tsif_1 = new entorno_1["default"]("if", ambito);
                this.listatrue.forEach(function (instruccion) {
                    instruccion.ejecutar(tsif_1);
                });
            }
            else {
                //SI LA CONDICION NO ES VERDADERA, SE EJECUTA EL "ELSE"
                //ES DECIR LAS INSTRUCCIONES DEL FALSE
                var tselse_1 = new entorno_1["default"]("else", ambito);
                this.listafalse.forEach(function (instruccion) {
                    instruccion.ejecutar(tselse_1);
                });
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA CONDICION ' + String(valorcondicion) + ' , NO ES BOOLEANA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - LA CONDICION " + String(valorcondicion) + "NO ES BOOLEANA");
        }
        return null;
    };
    return instruccionifelse;
}());
exports.instruccionifelse = instruccionifelse;
