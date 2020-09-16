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

\'[^\"]*\'          { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }
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


s : lista EOF { return $1; }               
  ;


//DESANIDADO
lista : lista instruccion { $1.hijos.push($2); $$=$1;  /*$1.push($2); $$=$1;*/}
      | instruccion {$$=nodobase.nuevonodo('INSTRUCCIONES',[$1],yylineno);  /*$$=[$1]*/} 
      ;

instruccion: declaraciones {$$=$1} //LISTO
            | asignacion   {$$=$1} //LISTO
            | instruccionif {$$=$1}
            | instruccionswitch 
            | instruccionfor 
            | instruccionwhile {$$=$1;}
            | imprimir {$$=$1;}  //LISTO
            | declararfuncion {$$=$1}
            | IDENTIFICADOR RMASMAS RPUNTOCOMA
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
            | RBREAK RPUNTOCOMA
            | RCONTINUE RPUNTOCOMA
            | instruccionreturn {$$=$1}
            ;



//LISTO
declaraciones: tipovariable listavariables RPUNTOCOMA {$$=nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2,$3],yylineno);};


//LISTO
listavariables:   listavariables RCOMA variable {$1.hijos.push($3); $$=$1;}
                | variable {$$=nodobase.nuevonodo('LISTA_VARIABLES',[$1],yylineno);};


//LISTO          
variable: IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion {$$= nodobase.nuevonodo('VARIABLE_FULL',[$1,$2,$3,$4,$5],yylineno);}
         | IDENTIFICADOR RIGUAL expresion    {$$= nodobase.nuevonodo('VARIABLE_CON_EXPRESION',[$1,$2,$3],yylineno);}
         | IDENTIFICADOR RDOSPUNTOS tipodato {$$= nodobase.nuevonodo('VARIABLE_SIN_EXPRESION',[$1,$2,$3],yylineno);}
         | IDENTIFICADOR {$$= nodobase.nuevonodo('VARIABLE_ID',[$1],yylineno);}
         ;

//LISTO
tipovariable: RLET   {$$= nodobase.nuevonodo('LET',[$1],yylineno);}  //LISTO
            | RCONST {$$= nodobase.nuevonodo('CONST',[$1],yylineno);} //LISTO
            ;

//LISTO
asignacion: IDENTIFICADOR RIGUAL expresion RPUNTOCOMA
            {$$=nodobase.nuevonodo('ASIGNACION',[$1,$2,$3,$4],yylineno)};

instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
               {$$=nodobase.nuevonodo('IF_SIMPLE',[$1,$2,$3,$4,$5,$6,$7],yylineno)}
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC instruccionelse
               {$$=nodobase.nuevonodo('IF_ELSE',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno)};

instruccionelse: RELSE instruccionif {$$=nodobase.nuevonodo('ELSE_IF',[$1,$2],yylineno)}
                | RELSE RLLAVEA lista RLLAVEC  {$$=nodobase.nuevonodo('ELSE',[$1,$2,$3,$4],yylineno)}
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
                   {$$= nodobase.nuevonodo('WHILE',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC 
                   {$$= nodobase.nuevonodo('DO_WHILE',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno);}
                  ;

                 //FUNCION SIN TIPO DATO Y SIN PARAMETROS
declararfuncion: RFUNCTION IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
                 {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
               //FUNCION CON TIPO DE DATO Y PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10],yylineno);}
               //FUNCION SIN TIPO DE DATO Y CON PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC  RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno);}
               //FUNCION CON TIPO DE DATO Y SIN PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8,$9],yylineno);}
                 ;

parametros: parametros RCOMA parametro {$1.hijos.push($2); $$=$1;}
          | parametro {$$=nodobase.nuevonodo('LISTA_PARAMETROS',[$1],yylineno);};

parametro: IDENTIFICADOR RDOSPUNTOS tipodato {$$= nodobase.nuevonodo('PARAMETRO',[$1,$2,$3],yylineno);};


tipodato:  
          //LISTO
           RSTRING {$$= nodobase.nuevonodo('STRING',[$1],yylineno);}
           //LISTO  
          |RNUMBER {$$= nodobase.nuevonodo('NUMBER',[$1],yylineno);}
          //LISTO
          |RBOOLEAN {$$= nodobase.nuevonodo('BOOLEAN',[$1],yylineno);}
          //LISTO
          |RVOID   {$$= nodobase.nuevonodo('VOID',[$1],yylineno);}
          ;


//DESANIDADO
imprimir  : RCONSOLE RPUNTO RLOG RPARA expresion RPARC RPUNTOCOMA
            {$$= nodobase.nuevonodo('IMPRIMIR',[$1,$2,$3,$4,$5,$6,$7],yylineno);} ;  

instruccionreturn: RRETURN RPUNTOCOMA {$$= nodobase.nuevonodo('RETURN_SOLO',[$1,$2],yylineno);}
                  |RRETURN expresion RPUNTOCOMA {$$= nodobase.nuevonodo('RETURN_EXP',[$1,$2,$3],yylineno);}
                  ; 

listaexpresiones: listaexpresiones RCOMA expresion
                | expresion
                ;

expresion: 
           /*EXPRESIONES ARITMETICAS*/
           expresion RMAS expresion    {$$= nodobase.nuevonodo('MAS',[$1,$2,$3],yylineno);}
          |expresion RMENOS expresion  {$$= nodobase.nuevonodo('MENOS',[$1,$2,$3],yylineno);}
          |expresion RPOR expresion    {$$= nodobase.nuevonodo('POR',[$1,$2,$3],yylineno);}
          |expresion RDIVISION expresion {$$= nodobase.nuevonodo('DIVISON',[$1,$2,$3],yylineno);}
          |expresion RMODULO expresion   {$$= nodobase.nuevonodo('MODULO',[$1,$2,$3],yylineno);}
          |expresion REXPONENTE expresion {$$= nodobase.nuevonodo('EXPONENTE',[$1,$2,$3],yylineno);}
          /*|IDENTIFICADOR RMASMAS
          |IDENTIFICADOR RMENOSMENOS*/

          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion  {$$= nodobase.nuevonodo('MAYORQUE',[$1,$2,$3],yylineno);}
          |expresion RMENORQUE expresion  {$$= nodobase.nuevonodo('MENORQUE',[$1,$2,$3],yylineno);}
          |expresion RMAYORIGUALQUE expresion {$$= nodobase.nuevonodo('MAYORIGUALQUE',[$1,$2,$3],yylineno);}
          |expresion RMENORIGUALQUE expresion {$$= nodobase.nuevonodo('MENORIGUALQUE',[$1,$2,$3],yylineno);}
          |expresion RIGUALQUE expresion   {$$= nodobase.nuevonodo('IGUALQUE',[$1,$2,$3],yylineno);}
          |expresion RDIFERENTEQUE expresion  {$$= nodobase.nuevonodo('DIFERENTEQUE',[$1,$2,$3],yylineno);}
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion        {$$= nodobase.nuevonodo('AND',[$1,$2,$3],yylineno);}
          |expresion ROR expresion         {$$= nodobase.nuevonodo('OR',[$1,$2,$3],yylineno);}
          |RNOT expresion                  {$$= nodobase.nuevonodo('NOT',[$1,$2],yylineno);}
          /*RESTANTES*/
          |RPARA expresion RPARC  {$$= nodobase.nuevonodo('PAREXPRESION',[$1,$2,$3],yylineno);}
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
          |NUM                    {$$= nodobase.nuevonodo('NUMERO',[$1],yylineno);} //LISTO
          |RTRUE                  {$$= nodobase.nuevonodo('TRUE',[$1],yylineno);}
          |RFALSE                 {$$= nodobase.nuevonodo('FALSE',[$1],yylineno);}
          |CADENACOMILLADOBLE  {$$= nodobase.nuevonodo('COMILLA_DOBLE',[$1],yylineno);} //LISTO
          |CADENACOMILLASIMPLE {$$= nodobase.nuevonodo('COMILLA_SIMPLE',[$1],yylineno);} //LISTO
          |IDENTIFICADOR       {$$= nodobase.nuevonodo('IDENTIFICADOR',[$1],yylineno);}  //LISTO
          //LLAMADA A FUNCIONES 
          | IDENTIFICADOR RPARA listaexpresiones RPARC 
          ;