"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var identificador = /** @class */ (function () {
    function identificador(identificador) {
        this.id = identificador;
    }
    identificador.prototype.obtenerValor = function (ambito) {
        var sim;
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        if (ambito.existe(this.id)) {
            sim = ambito.getSimbolo(this.id);
        }
        //AQUI COMIENZAN LAS OPERACIONES PARA VER SI ENCONTRO O NO EL SIMBOLO
        if (sim) {
            //SI EL SIMBOLO NO ES NULO SIGNFICA QUE SI LO ENCONTRE Y AQUI PUEDO REGRESAR EL VALOR
            if (sim.getTipo() == tipo_1.tipo_valor.STRING) {
                this.tipo = tipo_1.tipo_valor.STRING;
                return sim.getValor();
            }
            else if (sim.getTipo() == tipo_1.tipo_valor.NUMBER) {
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return sim.getValor();
            }
            else if (sim.getTipo() == tipo_1.tipo_valor.BOOLEAN) {
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return sim.getValor();
            }
        }
        else {
            console.log("ERROR- IDENTIFICADOR " + this.id + " NO EXISTE");
        }
        return null;
    };
    identificador.prototype.obtenerTipo = function (ambito) {
        return this.tipo;
    };
    return identificador;
}());
exports.identificador = identificador;