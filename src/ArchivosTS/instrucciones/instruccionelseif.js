"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var instruccionelseif = /** @class */ (function () {
    function instruccionelseif(cond, lista, instr) {
        this.condicion = cond;
        this.listainstrucciones = lista;
        this.instruccionelseif = instr;
    }
    instruccionelseif.prototype.ejecutar = function (ambito) {
        //ANTES DE REVISAR SI LAS CONDICIONES SON BOOLEANAS 
        //TENGO QUE REVISAR SI LA INSTRUCCIONELSEIF VIENE "UNDEFINED" Ó NO
        //1. SI VIENE "UNDEFINED" ES POR QUE NO TRAE UN ELSE
        //2. SI NO ES POR QUE TRAE UN ELSE
        if (this.instruccionelseif == undefined) {
            //AQUI COMIENZA LA EVALUACION INICIAL
            var valorcondicion = this.condicion.obtenerValor(ambito);
            var tipocondicion = this.condicion.obtenerTipo(ambito);
            if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
                var valorc = valorcondicion;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES YA NO HAGO NADA POR QUE ESTOY EN EL PRIMER CASO
                //DONDE NO TRAE UN ELSE
                if (valorc.valueOf()) {
                    var tselseif = new entorno_1["default"]("ELSE-IF", ambito);
                    for (var i = 0; i < this.listainstrucciones.length; i++) {
                        this.listainstrucciones[i].ejecutar(tselseif);
                    }
                }
            }
            else {
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
            }
        }
        else {
            //SIGNIFICA QUE ESTA INSTRUCCION ELSE IF() VIENE CON UN ELSE
            //AQUI COMIENZA LA EVALUACION INICIAL
            var valorcondicion = this.condicion.obtenerValor(ambito);
            var tipocondicion = this.condicion.obtenerTipo(ambito);
            if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
                var valorc = valorcondicion;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES AQUI SI TENGO QUE IR A EJECUTAR AL ELSE 
                if (valorc.valueOf()) {
                    var tselseif = new entorno_1["default"]("ELSE-IF", ambito);
                    for (var i = 0; i < this.listainstrucciones.length; i++) {
                        this.listainstrucciones[i].ejecutar(tselseif);
                    }
                }
                else {
                    //AQUI ESTOY EJECUTANDO AL ELSE
                    this.instruccionelseif.ejecutar(ambito);
                }
            }
            else {
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
            }
        }
        return null;
    };
    return instruccionelseif;
}());
exports.instruccionelseif = instruccionelseif;