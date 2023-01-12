import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgenteDTO } from 'src/app/pages/agents-uploader/dto/agente.dto';

@Injectable({
  providedIn: 'root'
})
export class AgentsUploaderService {

  private apiURL = 'http://localhost:8080/';
  
  constructor(private http: HttpClient) { }

  public uploadAgentes(data : AgenteDTO[]) {
    let headers = new HttpHeaders({
      "Content-Type":  "application/json",
      "Accept": "application/json"
    });
    
    let httpOptions = {
      headers: headers
    };    
    return this.http.post(`${this.apiURL}agentes` , data, httpOptions);
  }
}
