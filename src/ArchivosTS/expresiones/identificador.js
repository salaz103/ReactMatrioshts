"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var identificador = /** @class */ (function () {
    function identificador(identificador) {
        this.id = identificador;
    }
    identificador.prototype.obtenerValor = function (ambito) {
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        for (var entornoactual = ambito; entornoactual != null; entornoactual = ambito.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);
            //PRIMERO BUSCO EL ID EN EL AMBITO DONDE ESTOY
            if (entornoactual.existe(this.id)) {
                //AHORA QUE YA LO TENGO, TENDRIA QUE VALIDAR SI ESE ID TIENE UNA EXPRESION
                var sim = entornoactual.getSimbolo(this.id);
                if (sim.getTipo() == tipo_1.tipo_valor.STRING) {
                    this.tipo = tipo_1.tipo_valor.STRING;
                    return sim.getValor();
                }
            }
            else {
                //ERROR - LA VARIABLE NO EXISTE
            }
        }
        return null;
    };
    identificador.prototype.obtenerTipo = function (ambito) {
        return this.tipo;
    };
    return identificador;
}());
exports.identificador = identificador;
