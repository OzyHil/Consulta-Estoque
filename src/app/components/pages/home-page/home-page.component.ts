// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgFor } from '@angular/common';
// import { HttpClient } from '@angular/common/http';  // Importando HttpClientModule
// import { Produto } from '../../../models/produto.model';
// import { ProdutoService } from '../../../services/produto.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [FormsModule, NgFor],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.css'
// })
// export class HomePageComponent {
//   titulo = 'Sistema de Consulta ao Estoque';
//   produtos: Produto[] = [];
//   nomePesquisa = '';
//   codigoProduto = 0
//   constructor(private produtoService: ProdutoService, private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     this.produtoService.getProdutos().subscribe(data => {
//       this.produtos = data;
//     });
//   }

//   get produtosFiltrados() {
//     return this.produtos.filter(p => 
//       p.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
//     );
//   }

//   mudarRota(codigoProduto : string) {
//     this.router.navigate(['requisicao/fex', codigoProduto]);
//     console.log("mudou");
    
//   }
// }
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements AfterViewInit {
  titulo = 'Sistema de Consulta ao Estoque';
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  produtosCarregados: Produto[] = [];
  nomePesquisa = '';
  pageSize = 30;
  page = 1;

  @ViewChild('sentinela', { static: false }) sentinela!: ElementRef;

  constructor(private produtoService: ProdutoService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
      this.aplicarFiltro(); // Chama a filtragem inicial
    });
  }

  ngAfterViewInit() {
    this.observarScroll();
  }

  aplicarFiltro() {
    this.produtosFiltrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
    );

    this.page = 1; // Reinicia a paginação
    this.produtosCarregados = [];
    this.carregarMais();
  }

  carregarMais() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const novosProdutos = this.produtosFiltrados.slice(start, end);

    if (novosProdutos.length) {
      this.produtosCarregados = [...this.produtosCarregados, ...novosProdutos];
      this.page++;
    }
  }

  observarScroll() {
    if (this.sentinela) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.carregarMais();
        }
      });

      observer.observe(this.sentinela.nativeElement);
    }
  }

  mudarRota(codigoProduto: string) {
    this.router.navigate(['requisicao/fex', codigoProduto]);
  }
}
