"use strict";
exports.__esModule = true;
var simbolo_1 = require("../entorno/simbolo");
var tipo_1 = require("../entorno/tipo");
var declaracion = /** @class */ (function () {
    function declaracion(tipov, vars) {
        this.tipovariable = tipov;
        this.variables = vars;
    }
    declaracion.prototype.ejecutar = function (ambito) {
        var _this = this;
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL
        this.variables.forEach(function (variable) {
            if (ambito.existe(variable.id)) {
                //ESTA VARIABLE YA EXISTE
                console.log("ERROR - LA VARIABLE " + variable.id + " ya existe en este ambito" + ambito.nombre);
            }
            else {
                //SIGNIFICA LA VARIABLE NO EXISTE EN ESTE AMBITO, SE PUEDE GUARDAR
                //LO PRIMERO QUE SE HARA ES OBTENER EL VALOR DE LA EXPRESION, SI ES QUE TRAE
                var expresion = void 0;
                ///VERIFICAR SI TRAE UNA EXPRESION
                if (variable.exp != undefined) {
                    expresion = variable.exp.obtenerValor(ambito);
                }
                //VERIFICAR SI ES CONST O LET- con this.tipovariable
                if (_this.tipovariable == tipo_1.tipo_variable.CONST) {
                    //SI ENTRO AQUI ES POR QUE ES CONST, HAY QUE VERIFICAR SI TRAE UN VALOR
                    if (variable.exp != undefined) {
                        //SIGNIFICA QUE SI TRAE UN VALOR, LA PODEMOS GUARDAR
                        //ANTES DE GUARDARLA HAY QUE VERIFICAR SI TRAE TIPO DE DATO,
                        var tipodato = void 0;
                        if (variable.tipodato == undefined) {
                            //SI NO TRAJERA TIPO DE DATO, SE TOMA EL TIPO DE DATO DE LA EXPRESION
                            // AQUI LA EXPRESION SI ES OBLIGATORIA QUE VENGA
                            tipodato = variable.exp.obtenerTipo(ambito);
                            //AQUI SE GUARDA LA NUEVA CONS CUANDO ESTA NO TRAE TIPO DE DATO
                            //POR LO QUE SE LE ASIGNO EL TIPO DE DATO DE LA EXPRESION
                            var nuevosimbolo = new simbolo_1["default"](variable.id, false, tipodato, expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: " + variable.id + " GUARDADA");
                        }
                        else {
                            //SIGNIFICA QUE SI TRAE UN TIPO DE DATO
                            //ANTES DE PODERLA GUARDAR TAMBIEN SE DEBE VERIFICAR QUE EL TIPO DE DATO
                            //Y EL VALOR SEAM COMPATIBLES
                            if (variable.tipodato == variable.exp.obtenerTipo(ambito)) {
                                //SI SON COMPATIBLES SE PUEDE GUARDAR LA VARIABLE CONST
                                tipodato = variable.tipodato;
                                //AHORA YA SE PUEDE GUARDAR
                                var nuevosimbolo = new simbolo_1["default"](variable.id, false, tipodato, expresion);
                                ambito.agregarSimbolo(nuevosimbolo);
                                console.log("VARIABLE CONST: " + variable.id + " GUARDADA");
                            }
                            else {
                                console.log("ERROR- LA VARIABLE CONST: " + variable.id + " SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                            }
                        }
                    }
                    else {
                        console.log("ERROR - VARIABLE CONST: " + variable.id + " DEBE DECLARARSE CON VALOR");
                    }
                }
                else if (_this.tipovariable == tipo_1.tipo_variable.LET) {
                    //LAS VARIABLES LET SE PUEDEN GUARDAR CON O SIN VALOR
                    //AQUI VAMOS A VERIFICAR LAS COMBINACIONES, LO UNICO QUE SI TIENE QUE VENIR
                    //COMO MINIMO ES EL IDs
                    var tipodato = void 0;
                    if (variable.tipodato == undefined && variable.exp == undefined) {
                        //SIGNIFICA QUE SOLO TRAE EL ID
                        tipodato = undefined;
                        var nuevosimbolo = new simbolo_1["default"](variable.id, true, tipodato, expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: " + variable.id + " GUARDADA");
                    }
                    else if (variable.tipodato == undefined && variable.exp != undefined) {
                        //SIGNIFICA QUE NO TRAE TIPO DE DATO PERO SI VALOR, ENTONCES SE LE PUEDE ASIGNAR 
                        //EL TIPO DE DATO DE LA EXPRESION
                        tipodato = variable.exp.obtenerTipo(ambito);
                        var nuevosimbolo = new simbolo_1["default"](variable.id, true, tipodato, expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: " + variable.id + " GUARDADA");
                    }
                    else if (variable.tipodato != undefined && variable.exp == undefined) {
                        //SIGNIFICA QUE SI TRAE EL TIPO DE DATO PERO NO TRAE EXPRESION
                        tipodato = variable.tipodato;
                        var nuevosimbolo = new simbolo_1["default"](variable.id, true, tipodato, expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: " + variable.id + " GUARDADA");
                    }
                    else if (variable.tipodato != undefined && variable.exp != undefined) {
                        //SIGNIFICA QUE TRAE EL TIPO DE DATO Y LA EXPRESION
                        //AQUI HAY QUE VALIDAR QUE EL 
                        //TIPO DE DATO Y EL TIPO DE DATO DE LA EXPRESION SEAN IGUALES
                        if (variable.tipodato == variable.exp.obtenerTipo(ambito)) {
                            //SI LOS TIPOS DE DATOS SON IGUALES ENTONCES PODEMOS GUARDAR LA NUEVA VARIABLE
                            tipodato = variable.tipodato;
                            var nuevosimbolo = new simbolo_1["default"](variable.id, true, tipodato, expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE LET: " + variable.id + " GUARDADA");
                        }
                        else {
                            console.log("ERROR- LA VARIABLE LET: " + variable.id + " SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                        }
                    }
                }
            }
        });
        return null;
    };
    return declaracion;
}());
exports.declaracion = declaracion;
