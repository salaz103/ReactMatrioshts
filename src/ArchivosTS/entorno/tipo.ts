 enum tipo_valor{
    NUMBER="NUMBER",
    STRING ="STRING",
    BOOLEAN ="BOOLEAN",
    TYPE ="TYPE",
    VOID="VOID",
    ANY="ANY"
}

enum tipo_variable{
    CONST="CONST",
    LET ="LET"
}

enum tipo_instruccion{
    BREAK= "BREAK",
    CONTINUE="CONTINUE",
    RETURN="RETURN"
}

enum operador{
    //OPERADORES ARITMETICOS
    MAS="MAS",
    MENOS="MENOS",
    POR="POR",
    DIVISION="DIVISION",
    MODULO= "MODULO",
    EXPONENTE= "EXPONENTE",
    INCREMENTO="INCREMENTO",
    DECREMENTO="DECREMENTO",
    //OPERADORES RELACIONES
    MAYORQUE="MAYORQUE",
    MENORQUE="MENORQUE",
    MAYORIGUALQUE="MAYORIGUALQUE",
    MENORIGUALQUE="MENORIGUALQUE",
    DIFERENTEQUE="DIFERENTEQUE",
    IGUALQUE="IGUALQUE",
    //OPERADORES LOGICOS
    NOT="NOT",
    AND="AND",
    OR="OR"
}



export {tipo_valor,operador,tipo_variable,tipo_instruccion};