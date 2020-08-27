/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'num';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"("                   return 'PARABRE';
")"                   return 'PARCIERRA';
"."                   return 'PUNTO';
","                   return 'COMA';
";"                   return 'PUNTOCOMA';
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

instruccion: imprimir;

imprimir  : RCONSOLE PUNTO RLOG PARABRE expresion PARCIERRA PUNTOCOMA ;

expresion : num {console.log($1);};
