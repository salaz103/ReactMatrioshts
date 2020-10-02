"use strict";
exports.__esModule = true;
var entorno = /** @class */ (function () {
    function entorno(nombre, ambitoPadre) {
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.ts = [];
        this.tablafunciones = [];
        this.nombre = nombre;
    }
    entorno.prototype.agregarSimbolo = function (nuevoSimbolo) {
        this.ts.push(nuevoSimbolo);
    };
    entorno.prototype.agregarFuncion = function (funcion) {
        this.tablafunciones.push(funcion);
    };
    entorno.prototype.asignarValor = function (id, valor, tipo) {
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            for (var i = 0; i < entornoactual.ts.length; i++) {
                if (entornoactual.ts[i].getId() == id) {
                    entornoactual.ts[i].setTipo(tipo);
                    entornoactual.ts[i].setValor(valor);
                    return;
                }
            }
        }
    };
    entorno.prototype.getEntornoGlobal = function () {
        for (var e = this; e != null; e = e.apuntadorPadre) {
            if (e.apuntadorPadre == null) {
                return e;
            }
        }
    };
    entorno.prototype.existe = function (id) {
        //RECORRIENDO LOS ENTORNOS
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);
            //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
            for (var i = 0; i < entornoactual.ts.length; i++) {
                if (entornoactual.ts[i].getId() == id) {
                    return true;
                }
            }
        }
        //SI REGRESA FALSE ES POR QUE NO ENCONTRO EL ID EN NINGUN AMBITO
        return false;
    };
    entorno.prototype.existeLocal = function (id) {
        //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
        for (var i = 0; i < this.ts.length; i++) {
            if (this.ts[i].getId() == id) {
                return true;
            }
        }
    };
    entorno.prototype.getSimbolo = function (id) {
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            for (var i = 0; i < entornoactual.ts.length; i++) {
                if (entornoactual.ts[i].getId() == id) {
                    return entornoactual.ts[i];
                }
            }
        }
    };
    entorno.prototype.existeFuncion = function (id) {
        //RECORRIENDO LOS ENTORNOS
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS PARA BUSCAR FUNCION: ");
            console.log(entornoactual);
            //RECORRIENDO LA TABLA DE FUNCIONES DEL ENTORNO ACTUAL
            for (var i = 0; i < entornoactual.tablafunciones.length; i++) {
                if (entornoactual.tablafunciones[i].nombre == id) {
                    //AQUI REGRESO LA DECLARACION DE FUNCION {function(...){..}}
                    return entornoactual.tablafunciones[i];
                }
            }
        }
        //SI REGRESA NULL ES POR QUE NO ENCONTRO LA FUNCION
        return null;
    };
    return entorno;
}());
exports["default"] = entorno;
