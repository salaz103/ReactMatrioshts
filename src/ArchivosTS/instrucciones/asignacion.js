"use strict";
exports.__esModule = true;
var asignacion = /** @class */ (function () {
    function asignacion(id, ex) {
        this.id = id;
        this.expresion = ex;
    }
    asignacion.prototype.ejecutar = function (ambito) {
        //1. RECORRER LOS AMBITOS PARA VER SI EXISTE EL ID
        var sim;
        if (ambito.existe(this.id)) {
            sim = ambito.getSimbolo(this.id);
        }
        //2. OPERACIONES DESPUES DE HABER BUSCADO EL ID PARA ACTUALIZAR
        if (sim) {
            if (sim.reasignable == true) {
                //SIGNIFICA QUE ES UNA VARIABLE LET
                //PRIMERO HAY QUE VALIDAR SI TRAE UN TIPO DE DATO
                if (sim.getTipo()) {
                    //SI TRAE UN TIPO, HAY QUE VALIDAR QUE EL TIPO DE LA EXPRESION, SEA IGUAL AL QUE TIENE
                    //Y ASI PODER SETEAR LA NUEVA ASIGNACION
                    if (sim.getTipo() == this.expresion.obtenerTipo(ambito)) {
                        ambito.asignarValor(this.id, this.expresion.obtenerValor(ambito), sim.getTipo());
                    }
                    else {
                        console.log("ERROR - EL TIPO DE LA VARIABLE " + sim.getId() + " NO ES IGUAL AL TIPO DEL VALOR");
                    }
                }
                else {
                    //SI NO TRAE UN TIPO DE VALOR, HAY QUE SACAR EL TIPO DE VALOR DE LA EXPRESION Y ASIGNARSELO
                    //A LA VARIABLE
                    var tipo = this.expresion.obtenerTipo(ambito);
                    ambito.asignarValor(this.id, this.expresion.obtenerValor(ambito), tipo);
                }
            }
            else {
                //SIGNIFCA QUE ES UNA VARIABLE CONST Y ESTAS NO SE PUEDEN REASIGNAR
                console.log("ERROR - VARIABLE CONST: " + sim.getId() + " NO SE PUEDE REASIGNAR");
            }
        }
        else {
            console.log("ERROR- VARIABLE: " + this.id + " NO PUEDE SER ASIGNADA POR QUE NO EXISTE");
        }
        return null;
    };
    return asignacion;
}());
exports.asignacion = asignacion;
