import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../app/models/produto.model';  // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://192.168.12.171:3000/produtos/';  // Caminho do arquivo JSON no diretório 'assets'

  constructor(private http: HttpClient) { }

  // Método para obter os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}
