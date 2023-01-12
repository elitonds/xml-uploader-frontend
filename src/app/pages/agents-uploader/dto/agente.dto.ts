import { RegiaoDTO } from "./regiao.dto";

export class AgenteDTO {
    
    codigo?: number;
    data?: string;
    regioes?: RegiaoDTO[] = [];

    constructor(codigo: number, data: string, regioesDTO: RegiaoDTO[]) {
        this.codigo = codigo;
        this.data = data;
        this.regioes = regioesDTO;
    }

}