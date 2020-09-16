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
    //*******************INSTRUCCIONES*******************************
    else if(ast.tipo=='IMPRIMIR'){
        let recolector='';
        let expresion= desanidar(ast.hijos[4]);
        recolector= "console.log(" + expresion + "); \n"
        return recolector;
    }else if(ast.tipo=='DECLARACION_VARIABLE'){
        let recolector='';
        let tipovariable= desanidar(ast.hijos[0]);
        let listavariables= desanidar(ast.hijos[1]);
        recolector= tipovariable+" " + listavariables +";\n"
        return recolector;
    }else if(ast.tipo=='ASIGNACION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2]);
        recolector= id+"="+expresion+";\n";
        return recolector;
    }else if(ast.tipo=='FUNCION'){
        
    }
    // ****************LISTAS - NODOS INTERMEDIOS*********************
    else if(ast.tipo=='LISTA_VARIABLES'){
        let recolector='';

        if(ast.hijos.length==1){
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(variable => {
                recolector+= desanidar(variable);
            });
        }else{
        //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable);
            }else{
                recolector+= desanidar(variable)+",";
            }
        });
        }
        return recolector;
    }else if(ast.tipo=='VARIABLE_FULL'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        let expresion= desanidar(ast.hijos[4]);
        
        recolector= id +":"+tipodato+"="+expresion;
        return recolector;
    }else if(ast.tipo=='VARIABLE_CON_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2]);

        recolector= id+"="+expresion;
        return recolector;

    }else if(ast.tipo=='VARIABLE_SIN_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        recolector= id+":"+tipodato;
        return recolector;
    }else if(ast.tipo=='VARIABLE_ID'){
        let recolector='';
        let id= ast.hijos[0];
        recolector= id;
        return recolector;
    }
    //*****************NODOS HOJA, SUS HIJOS YA NO TRAEN MAS HIJOS************************
    else if(ast.tipo=='COMILLA_DOBLE'){
        let valor= "\""+ast.hijos[0]+"\"";
        return valor;
    }else if(ast.tipo=='COMILLA_SIMPLE'){
        let valor= "'"+ast.hijos[0]+"'";
        return valor;
    }else if(ast.tipo=='IDENTIFICADOR'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='NUMERO'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='LET'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='CONST'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='STRING'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='NUMBER'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='BOOLEAN'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='VOID'){
        let valor= ast.hijos[0];
        return valor;
    }

    return '';

}

export {desanidar};