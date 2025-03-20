import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';  // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3100/produtos/';  // Caminho do arquivo JSON no diretório 'assets'
  private produtoSelecionado!: Produto | null;
  
  constructor(private http: HttpClient) { }

  // Método para obter os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  setProduto(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  getProduto(): Produto | null {
    return this.produtoSelecionado;
  }
}
