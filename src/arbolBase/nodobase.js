//  class nodobase{

//     constructor({tipo,descendientes,posicion}){
//         this.tipo=tipo;
//         this.descendientes=descendientes;
//         this.posicion=posicion;
//     }
// }

// module.exports= nodobase;

const nodobase = {

    nuevonodo: function(tipo,hijos,posicion){
        return{
            tipo:tipo,
            hijos:hijos,
            posicion:posicion
        }
    }
}

module.exports.nodobase= nodobase;