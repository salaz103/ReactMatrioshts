/* lexical grammar */
%lex
%options flex case-sensitive
%option yylineno
%locations

%%
///COMENTARIOS SIMPLES, MULTIPLE LINEA Y ESPACIOS EN BLANCO
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas		



//SENTENCIAS DE TRANSFERENCIA
"break"               return 'RBREAK';
"continue"            return 'RCONTINUE';
"return"              return 'RRETURN';
//////TIPO DE DATO
"string"              return 'RSTRING';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"true"                return 'RTRUE';
"false"               return 'RFALSE';
"void"                return 'RVOID';
"Array"               return 'RARRAY';
//FUNCIONES
"graficar_ts"         return 'RGRAFICAR';
"function"            return 'RFUNCTION';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
//DECLARACION DE VARIABLES
"let"                 return 'RLET';
"const"               return 'RCONST';

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
"&&"                 return 'RAND';
"||"                  return 'ROR';
"!"                 return 'RNOT';

//OPERADOR TERNARIO
"?"                   return 'RINTERROGACION';
":"                   return 'RDOSPUNTOS';


"."                   return 'RPUNTO';
","                   return 'RCOMA';
";"                   return 'RPUNTOCOMA';
"="                   return 'RIGUAL';

"["                   return 'RCORCHETEA';
"]"                   return 'RCORCHETEC';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
"("                   return 'RPARA';
")"                   return 'RPARC';

"'"[^\"]*"'"          { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }
\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

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
            | asignacion {$$=$1}
            | instruccionif
            | instruccionswitch
            | instruccionfor
            | instruccionwhile
            | imprimir {$$=$1;}
            | declararfuncion
            | IDENTIFICADOR RMASMAS RPUNTOCOMA
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
            | RBREAK RPUNTOCOMA
            | RCONTINUE RPUNTOCOMA
            | instruccionreturn
            ;

declaracionlet: tipovariable IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion RPUNTOCOMA 
                {$$= nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
          |  tipovariable IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2,$3,$4,$5],yylineno);}
          |  tipovariable IDENTIFICADOR RDOSPUNTOS tipodato RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2,$3,$4,$5],yylineno);}  
          |  tipovariable IDENTIFICADOR RPUNTOCOMA
                {$$= nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2,$3],yylineno);}        
          ;

tipovariable: RLET
            | RCONST
            ;
/*declaracionconst: RCONST IDENTIFICADOR DOSPUNTOS tipodato RIGUAL expresion RPUNTOCOMA
                  {$$=nodobase.nuevonodo('DECLARACIONCONST',[$1,$2,$3,$4,$5,$6,$7],yylineno)}
               |  RCONST IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
                  {$$=nodobase.nuevonodo('DECLARACIONCONST',[$1,$2,$3,$4,$5],yylineno)}
               ;*/

asignacion: IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
            {$$=nodobase.nuevonodo('ASIGNACION',[$1,$2,$3,$4],yylineno)}
            ;

instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC instruccionelse;

instruccionelse: RELSE instruccionif
                | RELSE RLLAVEA lista RLLAVEC
                ;

instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC;

casos: casos caso
      | caso; 

caso: RCASE expresion RDOSPUNTOS lista RBREAK RPUNTOCOMA
      | RDEFAULT RDOSPUNTOS lista RBREAK RPUNTOCOMA;

instruccionfor: RFOR RPARA tipovariable IDENTIFICADOR RIGUAL expresion RPUNTOCOMA expresion RPUNTOCOMA IDENTIFICADOR RMASMAS RPARC 
                RLLAVEA  lista RLLAVEC
                
              | RFOR RPARA tipovariable IDENTIFICADOR ROF IDENTIFICADOR RPARC RLLAVEA lista RLLAVEC

              | RFOR RPARA tipovariable IDENTIFICADOR RIN IDENTIFICADOR RPARC RLLAVEC lista RLLAVEC
              ;

instruccionwhile:  RWHILE RPARA expresion RPARC RLLAVEA lista RLLAVEC
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC 
                  ;

declararfuncion: RFUNCTION IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
                 {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
               //FUNCION CON TIPO DE DATO
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10],yylineno);}
               //FUNCION SIN TIPO DE DATO
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC  RLLAVEA lista RLLAVEC
                 ;

parametros: parametros RCOMA parametro
          | parametro;

parametro: IDENTIFICADOR RDOSPUNTOS tipodato;


tipodato:  RSTRING {$$= nodobase.nuevonodo('STRING',[$1],yylineno);}
          |RNUMBER {$$= nodobase.nuevonodo('NUMBER',[$1],yylineno);}
          |RBOOLEAN {$$= nodobase.nuevonodo('BOOLEAN',[$1],yylineno);}
          |RVOID   {$$= nodobase.nuevonodo('VOID',[$1],yylineno);}
          ;

imprimir  : RCONSOLE RPUNTO RLOG RPARA expresion RPARC RPUNTOCOMA
            {$$= nodobase.nuevonodo('IMPRIMIR',[$1,$2,$3,$4,$5,$6,$7],yylineno);} ;

instruccionreturn: RRETURN RPUNTOCOMA
                  |RRETURN expresion RPUNTOCOMA;

listaexpresiones: listaexpresiones RCOMA expresion
                | expresion
                ;

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
          /*RESTANTES*/
          |RPARA expresion RPARC
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
          |NUM
          |RTRUE
          |RFALSE
          |CADENACOMILLADOBLE
          |CADENACOMILLASIMPLE
          |IDENTIFICADOR
          //LLAMADA A FUNCIONES 
          | IDENTIFICADOR RPARA listaexpresiones RPARC 
          ;