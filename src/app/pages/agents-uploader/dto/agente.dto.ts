import { CompraGeracaoDTO } from "./compra-geracao.dto";

export class AgenteDTO {
    
    codigo: number;
    data: string;
    geracoes: CompraGeracaoDTO[] = [];
    compras: CompraGeracaoDTO[] = [];

    constructor(codigo: number, data: string) {
        this.codigo = codigo;
        this.data = data;
    } 

}