import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto } from './models/produto.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Importando HttpClientModule
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor], // Adicionando HttpClientModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'Sistema de Consulta ao Estoque';
  produtos: Produto[] = [];
  nomePesquisa = '';

  constructor(private produtoService: ProdutoService, private http: HttpClient) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  get produtosFiltrados() {
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
    );
  }
}