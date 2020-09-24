"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var instrucciondowhile = /** @class */ (function () {
    function instrucciondowhile(lista, exp) {
        this.lista_do = lista;
        this.condicion = exp;
    }
    instrucciondowhile.prototype.ejecutar = function (ambito) {
        //EL CICLO DO WHILE, NO IMPORTANDO LA CONDICION, SIEMPRE EJECUTA AL MENOS UNA VEZ SUS INSTRUCCIONES
        var tsdowhile = new entorno_1["default"]("do", ambito);
        /*console.log("INICIO DEL DO-WHILE");
        console.log(tsdowhile);
        console.log("LISTA DO-WHILE");
        console.log(this.lista_do);*/
        for (var i = 0; i < this.lista_do.length; i++) {
            this.lista_do[i].ejecutar(tsdowhile);
        }
        //DESPUES HAY QUE VERIFICAR SI LA CONDICION ES BOOLEANA PARA PODER VOLVER A EJECUTAR LAS INSTRUCCIONES
        var valorexpresion = this.condicion.obtenerValor(ambito);
        var tipoexpresion = this.condicion.obtenerTipo(ambito);
        if (tipoexpresion == tipo_1.tipo_valor.BOOLEAN) {
            do {
                var nuevats = new entorno_1["default"]("do-while", ambito);
                for (var i = 0; i < this.lista_do.length; i++) {
                    this.lista_do[i].ejecutar(nuevats);
                }
            } while (this.condicion.obtenerValor(ambito).valueOf());
        }
        else {
            console.log("ERROR - LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA");
        }
        return null;
    };
    return instrucciondowhile;
}());
exports.instrucciondowhile = instrucciondowhile;
