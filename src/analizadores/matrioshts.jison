/* lexical grammar */
%lex
%options flex case-sensitive
%option yylineno
%locations

%%
\s+                   /* skip whitespace */


//////TIPO DE DATO
///PRIMERO LAS PALABRAS RESERVADAS
"string"              return 'RSTRING';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"void"                return 'RVOID';
"[]"                  return 'RARRAY';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"return"              return 'RRETURN';
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
\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
[0-9]+("."[0-9]+)?\b  return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';


/lex

%{
const nodobase= require('../arbolBase/nodobase');

%}
/* operator associations and precedence */


%start s

%% /* language grammar */


s : lista EOF {return $1;}               
  ;

lista : lista instruccion {$$= new nodobase({tipo:'LISTA',descendientes:[$1,$2],posicion:yylineno});}
      | instruccion {$$=$1}
      ;

instruccion: declaracionlet
            |declaracionconst
            | imprimir {$$=$1;}
            ;

declaracionlet: RLET IDENTIFICADOR DOSPUNTOS tipodato IGUAL expresion PUNTOCOMA
          |  RLET IDENTIFICADOR IGUAL expresion PUNTOCOMA
          |  RLET IDENTIFICADOR DOSPUNTOS tipodato PUNTOCOMA
          |  RLET IDENTIFICADOR PUNTOCOMA
          ;
declaracionconst: RCONST IDENTIFICADOR DOSPUNTOS tipodato IGUAL expresion PUNTOCOMA
               |  RCONST IDENTIFICADOR IGUAL expresion PUNTOCOMA
               ;

tipodato:  RSTRING
          |RNUMBER
          |RBOOLEAN
          |RVOID
          ;

imprimir  : RCONSOLE PUNTO RLOG PARABRE expresion PARCIERRA PUNTOCOMA 
            {$$= new nodobase({tipo:'IMPRIMIR',descendientes:[$1,$2,$3,$4,$5,$6,$7],posicion:yylineno}); console.log($$)} ;

expresion : NUM {console.log($1);}
          | CADENACOMILLADOBLE {$$=new nodobase({tipo:'CADENA',descendientes:[$1],posicion:yylineno}); console.log($$);}
          ;
