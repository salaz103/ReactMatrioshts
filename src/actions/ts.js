export const agregarCodigo=(codigografo='')=>({
    type:'CODIGO_EJECUCION',
    codigografo
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