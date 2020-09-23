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

\'[^\']*\'            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }
\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ console.error('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }



/lex

%{
  //***********************EXPRESIONES********************************
const cadena= require('../ArchivosTS/expresiones/cadena');
const valorLogico= require('../ArchivosTS/expresiones/valorLogico');
const numero= require('../ArchivosTS/expresiones/numero');
const aritmetica= require('../ArchivosTS/expresiones/operaciones/aritmetica');
const relacional= require('../ArchivosTS/expresiones/operaciones/relacional');
const logica= require('../ArchivosTS/expresiones/operaciones/logica');
const unaria= require('../ArchivosTS/expresiones/operaciones/unaria');
const identificador= require('../ArchivosTS/expresiones/identificador');
  //***********************INSTRUCCIONES***************************
const imprimir= require('../ArchivosTS/instrucciones/imprimir');
const declaracion= require('../ArchivosTS/instrucciones/declaracion');
const asignacion = require('../ArchivosTS/instrucciones/asignacion');
const instruccionif= require('../ArchivosTS/instrucciones/instruccionif');
const instruccionifelse= require('../ArchivosTS/instrucciones/instruccionifelse');
const instruccionswitch= require('../ArchivosTS/instrucciones/instruccionswitch');
const instruccionwhile= require('../ArchivosTS/instrucciones/instruccionwhile');
const incremento_decremento= require('../ArchivosTS/instrucciones/incremento_decremento');

  //*****************************OTROS*********************************
const tipo_valor= require('../ArchivosTS/entorno/tipo').tipo_valor;
const tipo_variable= require('../ArchivosTS/entorno/tipo').tipo_variable;
const operador= require('../ArchivosTS/entorno/tipo').operador;
const variable= require('../ArchivosTS/instrucciones/variable');
const caso= require('../ArchivosTS/instrucciones/caso');
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
lista : lista instruccion {$1.push($2); $$=$1;}
      | instruccion {$$=[$1];}
      ;

instruccion:  declaraciones {$$=$1;}
            | instruccionif {$$=$1;}
            | instruccionswitch {$$=$1;}
            | instruccionfor 
            | instruccionwhile {$$=$1;}
            | imprimir     {$$=$1;}
            | declararfuncion 
            | IDENTIFICADOR RMASMAS RPUNTOCOMA 
              {$$= new incremento_decremento.incremento_decremento($1,operador.INCREMENTO);}
            | IDENTIFICADOR RMENOSMENOS RPUNTOCOMA
              {$$= new incremento_decremento.incremento_decremento($1,operador.DECREMENTO);}
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
            | RBREAK RPUNTOCOMA
            | RCONTINUE RPUNTOCOMA
            | instruccionreturn 
            | asignacion    {$$=$1;}
            ;



//LISTO
declaraciones: tipovariable listavariables RPUNTOCOMA {$$=new declaracion.declaracion($1,$2);} ;


//LISTO
listavariables:   listavariables RCOMA variable {$1.push($3); $$=$1;} 
                | variable {$$=[$1];}
                ;


//LISTO          
variable:  IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion 
            {$$=new variable.variable($1,$3,$5);}
         | IDENTIFICADOR RIGUAL expresion
           {$$=new variable.variable($1,undefined,$3);}    
         | IDENTIFICADOR RDOSPUNTOS tipodato
           {$$=new variable.variable($1,$3,undefined);} 
         | IDENTIFICADOR 
           {$$=new variable.variable($1);} 
         ;

//LISTO
tipovariable: RLET   {$$=tipo_variable.LET;}
            | RCONST {$$=tipo_variable.CONST;} 
            ;

//LISTO
asignacion: IDENTIFICADOR RIGUAL expresion RPUNTOCOMA {$$ = new asignacion.asignacion($1,$3);}
            ;

//LISTO
instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC {$$= new instruccionif.instruccionif($3,$6);}
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC RELSE RLLAVEA lista RLLAVEC
               {$$= new instruccionifelse.instruccionifelse($3,$6,$10);}
             ;


instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC
                   {$$= new instruccionswitch.instruccionswitch($3,$6);}
                   ;

casos: casos caso {$1.push($2); $$=$1;}
      | caso {$$=[$1];}
      ; 

caso:   RCASE expresion RDOSPUNTOS lista RBREAK RPUNTOCOMA
        {$$= new caso.caso($2,$4);}
      | RDEFAULT RDOSPUNTOS lista RBREAK RPUNTOCOMA
        {$$= new caso.caso(undefined,$3);}
        ;

instruccionfor: RFOR RPARA tipovariable IDENTIFICADOR RIGUAL expresion RPUNTOCOMA expresion RPUNTOCOMA IDENTIFICADOR RMASMAS RPARC 
                RLLAVEA  lista RLLAVEC
                
              | RFOR RPARA tipovariable IDENTIFICADOR ROF IDENTIFICADOR RPARC RLLAVEA lista RLLAVEC

              | RFOR RPARA tipovariable IDENTIFICADOR RIN IDENTIFICADOR RPARC RLLAVEC lista RLLAVEC
              ;

//LISTO
instruccionwhile:  RWHILE RPARA expresion RPARC RLLAVEA lista RLLAVEC 
                   {$$= new instruccionwhile.instruccionwhile($3,$6);}
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC 
                  ;

                 //FUNCION SIN TIPO DATO Y SIN PARAMETROS
declararfuncion: RFUNCTION IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
               //FUNCION CON TIPO DE DATO Y PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               //FUNCION SIN TIPO DE DATO Y CON PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC  RLLAVEA lista RLLAVEC
               //FUNCION CON TIPO DE DATO Y SIN PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
                 ;

//LISTO
parametros: parametros RCOMA parametro 
          | parametro ;


//LISTO
parametro: IDENTIFICADOR RDOSPUNTOS tipodato ;


tipodato:  
          //LISTO
           RSTRING {$$=tipo_valor.STRING;}
           //LISTO  
          |RNUMBER {$$=tipo_valor.NUMBER;}
          //LISTO
          |RBOOLEAN {$$=tipo_valor.BOOLEAN;}
          //LISTO
          |RVOID   {$$=tipo_valor.VOID;}
          ;


//LISTO
imprimir  : RCONSOLE RPUNTO RLOG RPARA expresion RPARC RPUNTOCOMA {$$=new imprimir.imprimir($5);}
            ;  

//LISTO
instruccionreturn: RRETURN RPUNTOCOMA 
                  |RRETURN expresion RPUNTOCOMA 
                  ; 

listaexpresiones: listaexpresiones RCOMA expresion
                | expresion
                ;

expresion: 
           /*EXPRESIONES ARITMETICAS*/
           ///FALTA PONERLO EN LA TRADUCCION
           RMENOS expresion %prec UMENOS  {$$= new unaria.unaria(operador.MENOS,$2);} 
          | expresion RMAS expresion      {$$= new aritmetica.aritmetica($1,operador.MAS,$3);}
          |expresion RMENOS expresion     {$$= new aritmetica.aritmetica($1,operador.MENOS,$3);}
          |expresion RPOR expresion       {$$= new aritmetica.aritmetica($1,operador.POR,$3);}
          |expresion RDIVISION expresion  {$$= new aritmetica.aritmetica($1,operador.DIVISION,$3);}
          |expresion RMODULO expresion    {$$= new aritmetica.aritmetica($1,operador.MODULO,$3);}
          |expresion REXPONENTE expresion {$$= new aritmetica.aritmetica($1,operador.EXPONENTE,$3);}
          /*|IDENTIFICADOR RMASMAS
          |IDENTIFICADOR RMENOSMENOS*/

          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion       {$$= new relacional.relacional($1,operador.MAYORQUE,$3);}
          |expresion RMENORQUE expresion       {$$= new relacional.relacional($1,operador.MENORQUE,$3);}
          |expresion RMAYORIGUALQUE expresion  {$$= new relacional.relacional($1,operador.MAYORIGUALQUE,$3);}
          |expresion RMENORIGUALQUE expresion  {$$= new relacional.relacional($1,operador.MENORIGUALQUE,$3);}
          |expresion RIGUALQUE expresion       {$$= new relacional.relacional($1,operador.IGUALQUE,$3);}
          |expresion RDIFERENTEQUE expresion   {$$= new relacional.relacional($1,operador.DIFERENTEQUE,$3);}
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion    {$$= new logica.logica($1,operador.AND,$3);}   
          |expresion ROR expresion     {$$= new logica.logica($1,operador.OR,$3);}      
          |RNOT expresion              {$$= new unaria.unaria(operador.NOT,$2);}        
          /*RESTANTES*/
          |RPARA expresion RPARC  {$$=$2;}
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
          |NUM                  {$$=new numero.numero(Number($1),tipo_valor.NUMBER);}  
          |RTRUE                {$$=new valorLogico.valorLogico("TRUE",tipo_valor.BOOLEAN);} 
          |RFALSE               {$$=new valorLogico.valorLogico("FALSE",tipo_valor.BOOLEAN);}  
          |CADENACOMILLADOBLE   {$$=new cadena.cadena($1,tipo_valor.STRING);} 
          |CADENACOMILLASIMPLE  {$$=new cadena.cadena($1,tipo_valor.STRING);}   
          |IDENTIFICADOR        {$$=new identificador.identificador($1);}  
          //LLAMADA A FUNCIONES 
          | IDENTIFICADOR RPARA listaexpresiones RPARC 
          ;