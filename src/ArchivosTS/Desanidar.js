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
    //*******************INSTRUCCIONES*******************************
    else if (ast.tipo == 'IMPRIMIR') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[4]);
        recolector = "console.log(" + expresion + "); \n";
        return recolector;
    }
    else if (ast.tipo == 'DECLARACION_VARIABLE') {
        var recolector = '';
        var tipovariable = desanidar(ast.hijos[0]);
        var listavariables = desanidar(ast.hijos[1]);
        recolector = tipovariable + " " + listavariables + ";\n";
        return recolector;
    }
    else if (ast.tipo == 'ASIGNACION') {
        var recolector = '';
        var id = ast.hijos[0];
        var expresion = desanidar(ast.hijos[2]);
        recolector = id + "=" + expresion + ";\n";
        return recolector;
    }
    else if (ast.tipo == 'FUNCION') {
    }
    // ****************LISTAS - NODOS INTERMEDIOS*********************
    else if (ast.tipo == 'LISTA_VARIABLES') {
        var recolector_2 = '';
        if (ast.hijos.length == 1) {
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(function (variable) {
                recolector_2 += desanidar(variable);
            });
        }
        else {
            //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
            //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
            var contador_1 = 0;
            var hijos_1 = ast.hijos.length;
            ast.hijos.forEach(function (variable) {
                contador_1++;
                if (contador_1 == hijos_1) {
                    recolector_2 += desanidar(variable);
                }
                else {
                    recolector_2 += desanidar(variable) + ",";
                }
            });
        }
        return recolector_2;
    }
    else if (ast.tipo == 'VARIABLE_FULL') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        var expresion = desanidar(ast.hijos[4]);
        recolector = id + ":" + tipodato + "=" + expresion;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_CON_EXPRESION') {
        var recolector = '';
        var id = ast.hijos[0];
        var expresion = desanidar(ast.hijos[2]);
        recolector = id + "=" + expresion;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_SIN_EXPRESION') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        recolector = id + ":" + tipodato;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_ID') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id;
        return recolector;
    }
    //*****************NODOS HOJA, SUS HIJOS YA NO TRAEN MAS HIJOS************************
    else if (ast.tipo == 'COMILLA_DOBLE') {
        var valor = "\"" + ast.hijos[0] + "\"";
        return valor;
    }
    else if (ast.tipo == 'COMILLA_SIMPLE') {
        var valor = "'" + ast.hijos[0] + "'";
        return valor;
    }
    else if (ast.tipo == 'IDENTIFICADOR') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'NUMERO') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'LET') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'CONST') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'STRING') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'NUMBER') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'BOOLEAN') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'VOID') {
        var valor = ast.hijos[0];
        return valor;
    }
    return '';
}
exports.desanidar = desanidar;
