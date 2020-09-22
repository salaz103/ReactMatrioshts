"use strict";
exports.__esModule = true;
var entorno = /** @class */ (function () {
    function entorno(nombre, ambitoPadre) {
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.ts = [];
        this.nombre = nombre;
    }
    entorno.prototype.agregarSimbolo = function (nuevoSimbolo) {
        this.ts.push(nuevoSimbolo);
    };
    entorno.prototype.setValor = function (id, valor) {
        var simbolo = this.ts.filter(function (simbolo) { return simbolo.id == id; })[0];
    };
    entorno.prototype.existe = function (id) {
        for (var i = 0; i < this.ts.length; i++) {
            if (this.ts[i].id == id) {
                return true;
            }
        }
        return false;
    };
    entorno.prototype.getSimbolo = function (id) {
        //FORMA 1
        // for(let e:entorno= this;e!=null;e=e.apuntadorPadre){
        //     for (let i = 0; i < this.ts.length; i++) {
        //         if(this.ts[i].getId()==id){
        //             return this.ts[i];
        //         }
        //     }
        // }
        //AQUI ESTA BUSCANDO EL SIMBOLO EN EL AMBITO QUE LE ESTOY PASANDO
        for (var i = 0; i < this.ts.length; i++) {
            if (this.ts[i].getId() == id) {
                return this.ts[i];
            }
        }
    };
    return entorno;
}());
exports["default"] = entorno;
