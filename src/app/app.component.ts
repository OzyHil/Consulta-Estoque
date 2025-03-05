import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Produto } from './models/produto.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'Sistema de Consulta ao Estoque';

    // Lista de produtos fictícios
    produtos: Produto[] = [
      { nome: 'Produto 1', imagemUrl: 'https://via.placeholder.com/150', codigo: 12345 },
      { nome: 'Produto 2', imagemUrl: 'https://via.placeholder.com/150', codigo: 45689 },
      { nome: 'Produto 3', imagemUrl: 'https://via.placeholder.com/150', codigo: 78977 },
      { nome: 'Produto 4', imagemUrl: 'https://via.placeholder.com/150', codigo: 55489 }
    ];
  
    // Filtro para pesquisa
    nomePesquisa: string = '';
  
    // Filtra os produtos conforme a pesquisa
    get produtosFiltrados():Produto[] {
      return this.produtos.filter(produto => produto.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase()));
    }
}
