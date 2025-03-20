import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requisicao } from '../models/requisicao.model'; // Ajuste o caminho conforme necessário
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {
  private apiUrl = 'http://localhost:3100/requisicoes';

  constructor(private http: HttpClient) { }

  getRequisicoes(): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(this.apiUrl);
  }

  getRequisicoesPorIntervaloDeData(dataInicial: string, dataFinal: string): Observable<Requisicao[]> {
    const url = `${this.apiUrl}/por-data?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    return this.http.get<Requisicao[]>(url);
  }

  addRequisicao(requisicoes: Requisicao[]): Observable<Requisicao[]> {
    return this.http.post<Requisicao[]>(this.apiUrl, requisicoes);
  }
  
}
