import nodobase from '../arbolBase/nodobase.js';

function desanidar(ast:nodobase):string{
    //PRIMERO RECIBIMOS LA RAIZ DEL AST
    if(ast.tipo=='INSTRUCCIONES'){
        let recolector='';
        ast.hijos.forEach(instruccion => {
            recolector += desanidar(instruccion);
        });

        return recolector;
    }
    //INSTRUCCIONES
    else if(ast.tipo=='IMPRIMIR'){
        let recolector='';
        //MANDO A LEER LA EXPRESION
        let expresion= desanidar(ast.hijos[4]);
        recolector= "console.log(" + expresion + "); \n"
        return recolector;
    }
    //NODOS HOJA, ES DECIR QUE SON VALORES TERMINALES
    else if(ast.tipo=='COMILLA_DOBLE'){
        let valor= "\""+ast.hijos[0]+"\"";
        return valor;
    }else if(ast.tipo=='COMILLA_SIMPLE'){
        let valor= "'"+ast.hijos[0]+"'";
        return valor;
    }

    return '';

}

export {desanidar};