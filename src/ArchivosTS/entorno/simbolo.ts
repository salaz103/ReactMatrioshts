import tipo from './tipo';

export class simbolo{

    tipoSimbolo:tipo;
    id:string;
    valor:object;

    constructor(id_e:string,tipo_e:tipo,valor?:object){
        this.id=id_e;
        this.tipoSimbolo=tipo_e;
        this.valor=valor;
    }

    
    getId(){
        return this.id;
    }

    getTipo(){
        return this.tipoSimbolo;
    }

    getValor(){
        return this.valor;
    }

    setValor(valor_e){
        this.valor= valor_e;
    }

}

export default simbolo;