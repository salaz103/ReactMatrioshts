"use strict";
exports.__esModule = true;
var tipo_valor;
(function (tipo_valor) {
    tipo_valor["NUMBER"] = "NUMBER";
    tipo_valor["STRING"] = "STRING";
    tipo_valor["BOOLEAN"] = "BOOLEAN";
    tipo_valor["TYPE"] = "TYPE";
    tipo_valor["VOID"] = "VOID";
})(tipo_valor || (tipo_valor = {}));
exports.tipo_valor = tipo_valor;
var tipo_variable;
(function (tipo_variable) {
    tipo_variable["CONST"] = "CONST";
    tipo_variable["LET"] = "LET";
})(tipo_variable || (tipo_variable = {}));
exports.tipo_variable = tipo_variable;
var operador;
(function (operador) {
    //OPERADORES ARITMETICOS
    operador["MAS"] = "MAS";
    operador["MENOS"] = "MENOS";
    operador["POR"] = "POR";
    operador["DIVISION"] = "DIVISION";
    operador["MODULO"] = "MODULO";
    operador["EXPONENTE"] = "EXPONENTE";
    //OPERADORES RELACIONES
    operador["MAYORQUE"] = "MAYORQUE";
    operador["MENORQUE"] = "MENORQUE";
    operador["MAYORIGUALQUE"] = "MAYORIGUALQUE";
    operador["MENORIGUALQUE"] = "MENORIGUALQUE";
    operador["DIFERENTEQUE"] = "DIFERENTEQUE";
    operador["IGUALQUE"] = "IGUALQUE";
    //OPERADORES LOGICOS
    operador["NOT"] = "NOT";
    operador["AND"] = "AND";
    operador["OR"] = "OR";
})(operador || (operador = {}));
exports.operador = operador;
