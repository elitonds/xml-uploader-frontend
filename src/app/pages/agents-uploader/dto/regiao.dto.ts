import { CompraDTO } from './compra.dto';
import { GeracaoDTO } from './geracao.dto';

export class RegiaoDTO {
    
    sigla?: string;
    geracoesDTO?: GeracaoDTO[] = [];
    comprasDTO?: CompraDTO[] = [];

}