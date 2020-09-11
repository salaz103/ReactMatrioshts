/* lexical grammar */
%lex
%options flex case-sensitive
%option yylineno
%locations

%%
///COMENTARIOS SIMPLES, MULTIPLE LINEA Y ESPACIOS EN BLANCO
\s+											
"//".*										
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			


//////TIPO DE DATO
"string"              return 'RSTRING';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"true"                return 'RTRUE';
"false"               return 'RFALSE';
"void"                return 'RVOID';
"Array"               return 'RARRAY';
"["                   return 'RCORCHETEA';
"]"                   return 'RCORCHETEC';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
"("                   return 'RPARA';
")"                   return 'RPARC';
//DECLARACION DE VARIABLES
"let"                 return 'RLET';
"const"               return 'RCONST';
//OPERACIONES ARITMETICAS
"+"                   return 'RMAS';
"-"                   return 'RMENOS';
"*"                   return 'RPOR';
"/"                   return 'RDIVISION';
"**"                  return 'REXPONENTE';
"%"                   return 'RMODULO';
"++"                  return 'RMASMAS';
"--"                  return 'RMENOSMENOS';
//OPERACIONES RELACIONALES
">"                   return 'RMAYORQUE';
"<"                   return 'RMENORQUE';
">="                  return 'RMAYORIGUALQUE';
"<="                  return 'RMENORIGUALQUE';
"=="                  return 'RIGUALQUE';
"!="                  return 'RDIFERENTEQUE';
//OPERACIONES LOGICAS
"AND"                 return 'RAND';
"OR"                  return 'ROR';
"NOT"                 return 'RNOT';
//OPERADOR TERNARIO
"?"                   return 'RINTERROGACION';
":"                   return 'RDOSPUNTOS';
//ESTRUCTURAS DE CONTROL
"if"                  return 'RIF';
"else"                return 'RELSE';
"while"               return 'RWHILE';
"do"                  return 'RDO';
"switch"              return 'RSWITCH';
"case"                return 'RCASE';
"default"             return 'RDEFAULT';
"for"                 return 'RFOR';
"in"                  return 'RIN';
"of"                  return 'ROF';  
//SENTENCIAS DE TRANSFERENCIA
"break"               return 'RBREAK';
"continue"            return 'RCONTINUE';
"return"              return 'RRETURN';
//FUNCIONES
"graficar_ts"         return 'RGRAFICAR';
"function"            return 'RFUNCTION';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"."                   return 'RPUNTO';
","                   return 'RCOMA';
";"                   return 'RPUNTOCOMA';
"="                   return 'RIGUAL';

"'"[^\"]*"'"          { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }
\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
[0-9]+("."[0-9]+)?\b  return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ console.error('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }



/lex

%{
const nodobase= require('../arbolBase/nodobase').nodobase;
%}


/* operator associations and precedence */
%left 'RINTERROGACION'
%left 'ROR'
%left 'RAND'
%right 'RNOT'
%left  'RMENORQUE' 'RMAYORQUE' 'RMENORIGUALQUE' 'RMAYORIGUALQUE' 'RDIFERENTEQUE' 'RIGUALQUE'

//OPERACIONES ARITMETICAS
%left 'RMAS' 'RMENOS'
%left 'RPOR' 'RDIVISION' 'RMODULO'
%left 'REXPONENTE'
%left  UMENOS


%start s

%% /* language grammar */


s : lista EOF {  console.log($1); return $1; }               
  ;

lista : lista instruccion { $1.hijos.push($2); $$=$1;  /*$1.push($2); $$=$1;*/}
      | instruccion {$$=nodobase.nuevonodo('INSTRUCCIONES',[$1],yylineno);  /*$$=[$1]*/}
      ;

instruccion: declaracionlet {$$=$1}
            | declaracionconst {$$=$1}
            | asignacion {$$=$1}
            | instruccionif
            | instruccionswitch
            | instruccionfor
            | imprimir {$$=$1;}
            | declararfuncion
            ;

declaracionlet: RLET IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion RPUNTOCOMA 
                {$$= nodobase.nuevonodo('DECLARACIONLET',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
          |  RLET IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACIONLET',[$1,$2,$3,$4,$5],yylineno);}
          |  RLET IDENTIFICADOR RDOSPUNTOS tipodato RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACIONLET',[$1,$2,$3,$4,$5],yylineno);}  
          |  RLET IDENTIFICADOR RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACIONLET',[$1,$2,$3],yylineno);}        
          ;
declaracionconst: RCONST IDENTIFICADOR DOSPUNTOS tipodato RIGUAL expresion RPUNTOCOMA
                  {$$=nodobase.nuevonodo('DECLARACIONCONST',[$1,$2,$3,$4,$5,$6,$7],yylineno)}
               |  RCONST IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
                  {$$=nodobase.nuevonodo('DECLARACIONCONST',[$1,$2,$3,$4,$5],yylineno)}
               ;

asignacion: IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
            {$$=nodobase.nuevonodo('ASIGNACION',[$1,$2,$3,$4],yylineno)}
            ;

instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC RELSE RLLAVEA lista RLLAVEC;


instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC;

casos: casos caso
      | caso; 

caso: RCASE expresion RDOSPUNTOS lista RBREAK RPUNTOCOMA
      | RDEFAULT RDOSPUNTOS lista RBREAK RPUNTOCOMA;

instruccionfor: RFOR RPARA IDENTIFICADOR RIGUAL expresion RPUNTOCOMA expresion RPUNTOCOMA IDENTIFICADOR RMASMAS RPARC 
                RLLAVEA  lista RLLAVEC; 

declararfuncion: RFUNCTION IDENTIFICADOR PARABRE PARCIERRA RLLAVEA lista RLLAVEC
                 {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7],yylineno);};


tipodato:  RSTRING {$$= nodobase.nuevonodo('STRING',[$1],yylineno);}
          |RNUMBER {$$= nodobase.nuevonodo('NUMBER',[$1],yylineno);}
          |RBOOLEAN {$$= nodobase.nuevonodo('BOOLEAN',[$1],yylineno);}
          |RVOID   {$$= nodobase.nuevonodo('VOID',[$1],yylineno);}
          ;

imprimir  : RCONSOLE PUNTO RLOG PARABRE expresion PARCIERRA PUNTOCOMA
            {$$= nodobase.nuevonodo('IMPRIMIR',[$1,$2,$3,$4,$5,$6,$7],yylineno);} ;



expresion: 
           /*EXPRESIONES ARITMETICAS*/
           expresion RMAS expresion
          |expresion RMENOS expresion
          |expresion RPOR expresion
          |expresion RDIVISION expresion
          |expresion RMODULO expresion
          |expresion REXPONENTE expresion
          /*|IDENTIFICADOR RMASMAS
          |IDENTIFICADOR RMENOSMENOS*/
          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion
          |expresion RMENORQUE expresion
          |expresion RMAYORIGUALQUE expresion
          |expresion RMENORIGUALQUE expresion
          |expresion RIGUALQUE expresion
          |expresion RDIFERENTEQUE expresion
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion
          |expresion ROR expresion
          |RNOT expresion

          |RPARA expresion RPARC
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
          |NUM
          |RTRUE
          |RFALSE
          |CADENACOMILLADOBLE
          |CADENACOMILLASIMPLE
          |IDENTIFICADOR;