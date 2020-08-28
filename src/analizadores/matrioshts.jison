/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'num';
[A-Za-z]+[0-9A-Za-z]* return 'IDENTIFICADOR';
//////TIPO DE DATO
"string"              return 'RSTRING';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"void"                return 'RVOID';
"[]"                  return 'RARRAY';
///////
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"let"                 return 'RLET';
"const"               return 'RCONST';
"("                   return 'PARABRE';
")"                   return 'PARCIERRA';
"."                   return 'PUNTO';
":"                   return 'DOSPUNTOS';
","                   return 'COMA';
";"                   return 'PUNTOCOMA';
"="                   return 'IGUAL';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */


%start s

%% /* language grammar */


s : lista EOF                   
  ;

lista : lista instruccion
      | instruccion
      ;

instruccion: declaracion
            | asignacion
            | imprimir
            | declararfuncion;

declaracion: tipo IDENTIFICADOR DOSPUNTOS tipodato IGUAL expresion PUNTOCOMA
          |  tipo IDENTIFICADOR IGUAL expresion PUNTOCOMA
          |  tipo IDENTIFICADOR DOSPUNTOS tipodato PUNTOCOMA
          |  tipo IDENTIFICADOR PUNTOCOMA
          ;

tipo: RCONST
      | RLET
      ;

tipodato:  RSTRING
          |RNUMBER
          |RBOOLEAN
          |RVOID
          ;

imprimir  : RCONSOLE PUNTO RLOG PARABRE expresion PARCIERRA PUNTOCOMA ;

expresion : num {console.log($1);};
