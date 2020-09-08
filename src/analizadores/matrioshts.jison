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
"function"            return 'RFUNCTION';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"void"                return 'RVOID';
"[]"                  return 'RARRAY';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"return"              return 'RRETURN';
"let"                 return 'RLET';
"const"               return 'RCONST';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
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
const nodobase= require('../arbolBase/nodobase').nodobase;

%}
/* operator associations and precedence */


%start s

%% /* language grammar */


s : lista EOF {  console.log($1); return $1; }               
  ;

lista : lista instruccion {$1.push($2); $$=$1;}
      | instruccion {$$=[$1]}
      ;

instruccion: declaracionlet {$$=$1}
            |declaracionconst
            | imprimir {$$=$1;}
            | declararfuncion
            ;

declaracionlet: RLET IDENTIFICADOR DOSPUNTOS tipodato IGUAL expresion PUNTOCOMA 
                {$$= nodobase.nuevonodo('DECLARACION',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
          |  RLET IDENTIFICADOR IGUAL expresion PUNTOCOMA
          |  RLET IDENTIFICADOR DOSPUNTOS tipodato PUNTOCOMA
          |  RLET IDENTIFICADOR PUNTOCOMA
          ;
declaracionconst: RCONST IDENTIFICADOR DOSPUNTOS tipodato IGUAL expresion PUNTOCOMA
               |  RCONST IDENTIFICADOR IGUAL expresion PUNTOCOMA
               ;

declararfuncion: RFUNCTION IDENTIFICADOR PARABRE PARCIERRA RLLAVEA lista RLLAVEC
                 {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7],yylineno);};


tipodato:  RSTRING {$$= nodobase.nuevonodo('STRING',[$1],yylineno);}
          |RNUMBER {$$= nodobase.nuevonodo('NUMBER',[$1],yylineno);}
          |RBOOLEAN {$$= nodobase.nuevonodo('BOOLEAN',[$1],yylineno);}
          |RVOID   {$$= nodobase.nuevonodo('VOID',[$1],yylineno);}
          ;

imprimir  : RCONSOLE PUNTO RLOG PARABRE expresion PARCIERRA PUNTOCOMA
            {$$= nodobase.nuevonodo('IMPRIMIR',[$1,$2,$3,$4,$5,$6,$7],yylineno);} ;

expresion : NUM {$$= nodobase.nuevonodo('NUMERO',[Number($1)],yylineno); }
          | CADENACOMILLADOBLE {$$= nodobase.nuevonodo('CADENA',[$1],yylineno);}
          ;
