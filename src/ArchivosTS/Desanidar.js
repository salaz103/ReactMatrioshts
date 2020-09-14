"use strict";
exports.__esModule = true;
function desanidar(ast) {
    //PRIMERO RECIBIMOS LA RAIZ DEL AST
    if (ast.tipo == 'INSTRUCCIONES') {
        var recolector_1 = '';
        ast.hijos.forEach(function (instruccion) {
            recolector_1 += desanidar(instruccion);
        });
        return recolector_1;
    }
    //INSTRUCCIONES
    else if (ast.tipo == 'IMPRIMIR') {
        var recolector = '';
        //MANDO A LEER LA EXPRESION
        var expresion = desanidar(ast.hijos[4]);
        recolector = "console.log(" + expresion + "); \n";
        return recolector;
    }
    //NODOS HOJA, ES DECIR QUE SON VALORES TERMINALES
    else if (ast.tipo == 'COMILLA_DOBLE') {
        var valor = "\"" + ast.hijos[0] + "\"";
        return valor;
    }
    else if (ast.tipo == 'COMILLA_SIMPLE') {
        var valor = "'" + ast.hijos[0] + "'";
        return valor;
    }
    return '';
}
exports.desanidar = desanidar;
