import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AgenteDTO } from 'src/app/pages/agents-uploader/dto/agente.dto';
import { AgentsUploaderService } from './agents-uploader.service';
import * as converter from 'xml-js';
import { CompraDTO } from 'src/app/pages/agents-uploader/dto/compra.dto';
import { RegiaoDTO } from 'src/app/pages/agents-uploader/dto/regiao.dto';
import { LoaderService } from 'src/app/loader/loader.service';
import { map, catchError } from 'rxjs/operators';

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
          console.log(this.uploadAgentes(this.createAndSendData(newArrayAgentes)));
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

  private processChildNodes(children: any): CompraDTO[] {
    return children.map((child: any) => {
      return { valor: child._text };
    });
  }

  private processRegioes(regioes: any): RegiaoDTO[] {
    const regioesDTO: RegiaoDTO[] = [];
    regioes.forEach((regiao: any) => {
      regioesDTO.push({
        sigla: regiao._attributes.sigla,
        comprasDTO: this.processChildNodes(regiao.compra.valor),
        geracoesDTO: this.processChildNodes(regiao.geracao.valor),
      });
    });
    return regioesDTO;
  }

  private createAndSendData(agentes: any): AgenteDTO[] {
    return agentes.map((agente: any) => {
      const regioesDTO = this.processRegioes(agente.regiao);
      return new AgenteDTO(
        parseInt(agente.codigo._text),
        agente.data._text,
        regioesDTO
      );
    });
  }
}
