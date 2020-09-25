export const agregarCodigo=(codigografo='')=>({
    type:'CODIGO_EJECUCION',
    codigografo
});

export const guardartextotraduccion=(textot='')=>({
    type:'TEXTO_TRADUCCION',
    textot
});

export const codigoconsola=(codigoconsola='')=>({
    type:'CONSOLA',
    codigoconsola
});

export const limpiarconsola=()=>({
    type:'LIMPIAR_CONSOLA',
});

export const tsfinal=(entorno)=>({
    type:'ENTORNOFINAL',
    entorno
});

export const reportets=(simbolosactuales)=>({
    type:'ENTORNOACTUAL',
    simbolosactuales
});

export const errores=(error_e)=>({
    type:'ERROR',
    error_e
});