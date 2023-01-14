import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { AgenteDTO } from 'src/app/pages/agents-uploader/dto/agente.dto';
import { CompraGeracaoDTO } from 'src/app/pages/agents-uploader/dto/compra-geracao.dto';
import * as converter from 'xml-js';
import { AgentsUploaderService } from './agents-uploader.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents-uploader.component.html',
  styleUrls: ['./agents-uploader.component.scss'],
})
export class AgentsUploaderComponent {
  @ViewChild('files') fileChooser: any;

  arquivoPreview: any;

  constructor(
    private service: AgentsUploaderService,
    private toastr: ToastrService,
    public loaderService: LoaderService
  ) {}

  public readFileXml(event: any) {
    this.loaderService.isLoading.next(true);

    for (const file of event.target.files) {
      const reader: FileReader = new FileReader();
      reader.onload = (xmlComponent: any) => {
        const xml = xmlComponent.target.result;
        const xmlData = converter.xml2json(xml, { compact: true, spaces: 2 });
        const JSONData: any = JSON.parse(xmlData);
        const newArrayAgentes = Array.isArray(JSONData.agentes.agente)
          ? JSONData.agentes.agente
          : [JSONData.agentes.agente];
      };
      reader.readAsText(file);
    }
  }

  private clearFileField() {
    this.fileChooser.nativeElement.value = '';
  }

  private uploadAgentes(agentesData: AgenteDTO[]) {
    this.service
      .uploadAgentes(agentesData)
      .pipe(map(() => this.toastr.success('Arquivos enviados com sucesso')))
      .subscribe({
        error: (error) => {
          this.toastr.error('Erro: ' + error.message);
        },
      });
    this.clearFileField();
  }

  private processChildNodes(children: any, regiao: string): CompraGeracaoDTO[] {
    return children.map((child: any) => {
      return { valor: child._text, regiao };
    });
  }

  private processRegioes(regioes: any, agenteDto: AgenteDTO) {
    regioes.forEach((regiao: any) => {
      agenteDto.compras.push(
        ...this.processChildNodes(regiao.compra.valor, regiao._attributes.sigla)
      );
      agenteDto.geracoes.push(
        ...this.processChildNodes(
          regiao.geracao.valor,
          regiao._attributes.sigla
        )
      );
    });
  }

  private createAndSendData(agentes: any): AgenteDTO[] {
    return agentes.map((agente: any) => {
      const agenteDto = new AgenteDTO(
        parseInt(agente.codigo._text),
        agente.data._text
      );
      this.processRegioes(agente.regiao, agenteDto);
      return agenteDto;
    });
  }
}
