import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { Router } from '@angular/router';
import { RequisicaoService } from '../../../services/requisicao.service';
import { Requisicao } from '../../../models/requisicao.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
// export class HomePageComponent implements AfterViewInit {
//   titulo = 'Sistema de Consulta ao Estoque';
//   produtos: Produto[] = [];
//   produtosFiltrados: Produto[] = [];
//   produtosCarregados: Produto[] = [];
//   nomePesquisa = '';
//   pageSize = 30;
//   page = 1;

//   @ViewChild('sentinela', { static: false }) sentinela!: ElementRef;

//   constructor(private produtoService: ProdutoService, private http: HttpClient, private router: Router) { }

//   ngOnInit() {
//     this.produtoService.getProdutos().subscribe(data => {
//       this.produtos = data;
//       this.aplicarFiltro(); // Chama a filtragem inicial
//     });
//   }

//   ngAfterViewInit() {
//     this.observarScroll();
//   }

//   aplicarFiltro() {
//     this.produtosFiltrados = this.produtos.filter(p =>
//       p.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
//     );

//     this.page = 1; // Reinicia a paginação
//     this.produtosCarregados = [];
//     this.carregarMais();
//   }

//   carregarMais() {
//     const start = (this.page - 1) * this.pageSize;
//     const end = start + this.pageSize;
//     const novosProdutos = this.produtosFiltrados.slice(start, end);

//     if (novosProdutos.length) {
//       this.produtosCarregados = [...this.produtosCarregados, ...novosProdutos];
//       this.page++;
//     }
//   }

//   observarScroll() {
//     if (this.sentinela) {
//       const observer = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting) {
//           this.carregarMais();
//         }
//       });

//       observer.observe(this.sentinela.nativeElement);
//     }
//   }

//   mudarRota(produto: Produto) {
//     this.produtoService.setProduto(produto);
//     this.router.navigate(['requisicao/fex', produto.codigo], { state: { produto } });
//   }

export class HomePageComponent implements AfterViewInit {
  titulo = 'Sistema de Consulta ao Estoque';
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  produtosCarregados: Produto[] = [];
  nomePesquisa = '';
  pageSize = 30;
  page = 1;
  selecionados = 0;
  dataInicial: string = '';
  dataFinal: string = '';

  // Objeto para armazenar o estado dos checkboxes
  checkboxEstado: { [codigo: string]: boolean } = {};

  @ViewChild('sentinela', { static: false }) sentinela!: ElementRef;

  constructor(private produtoService: ProdutoService, private http: HttpClient, private router: Router, private requisicaoService: RequisicaoService) { }

  ngOnInit() {
    this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
      this.aplicarFiltro(); // Chama a filtragem inicial
    });
  }

  ngAfterViewInit() {
    this.observarScroll();
  }

  // Função chamada para aplicar o filtro
  aplicarFiltro() {
    // Filtra os produtos com base na pesquisa
    this.produtosFiltrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(this.nomePesquisa.toLowerCase())
    );

    // Reseta a página e carrega os novos produtos filtrados
    this.page = 1;
    this.produtosCarregados = [];
    this.carregarMais();
  }

  // Função chamada para carregar mais produtos
  carregarMais() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const novosProdutos = this.produtosFiltrados.slice(start, end);

    // Se houver novos produtos, carrega-os
    if (novosProdutos.length) {
      this.produtosCarregados = [...this.produtosCarregados, ...novosProdutos];
      this.page++;
    }

    // Reorganiza os produtos após carregá-los
    this.reorganizarProdutos();
  }

  // Função chamada para observar o scroll da página
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

  toRequestPage() {
    // Filtra os produtos marcados
    const produtosSelecionados = this.produtosCarregados.filter(produto => this.checkboxEstado[produto.codigo]);

    // Navega para a outra página, passando os produtos selecionados no state
    this.router.navigate(['requisicao/fex'], { state: { produtos: produtosSelecionados } });
  }

  // Método para verificar o estado do checkbox
  isChecked(codigo: string): boolean {
    return this.checkboxEstado[codigo] || false;
  }

  // Método para atualizar o estado do checkbox
  toggleCheckbox(codigo: string): void {
    // Atualiza o estado do checkbox
    this.checkboxEstado[codigo] = !this.checkboxEstado[codigo];

    // Reorganiza os produtos após atualizar o checkbox
    this.reorganizarProdutos();
  }

  // Função que organiza os produtos, colocando os marcados no topo
  reorganizarProdutos() {
    // Separa os produtos marcados e não marcados
    const produtosMarcados = this.produtosCarregados.filter(produto => this.checkboxEstado[produto.codigo]);
    const produtosNaoMarcados = this.produtosCarregados.filter(produto => !this.checkboxEstado[produto.codigo]);
    this.selecionados = produtosMarcados.length;
    // Atualiza a lista de produtos carregados com os marcados no topo
    this.produtosCarregados = [...produtosMarcados, ...produtosNaoMarcados];
  }

  gerarRelatorio() {
    // Verifica se a dataInicial ou dataFinal estão vazias
    if (!this.dataInicial || !this.dataFinal) {
      console.error('As datas não podem estar vazias');
      alert('Por favor, preencha ambas as datas');
      return;
    }
    // Validação das datas
    const dataInicialValida = new Date(this.dataInicial);
    const dataFinalValida = new Date(this.dataFinal);

    if (dataInicialValida > dataFinalValida) {
      console.error('A data inicial não pode ser maior que a data final');
      alert('A data inicial não pode ser maior que a data final');
      return;
    }

    // Chama o serviço para obter as requisições
    this.requisicaoService.getRequisicoesPorIntervaloDeData(this.dataInicial, this.dataFinal)
      .subscribe(
        (requisicoes: Requisicao[]) => {
          // Formata os dados das requisições para o formato CSV
          let conteudo = "";
          for (const requisicao of requisicoes) {
            conteudo += `${requisicao.codigoEmpresa || ""},${requisicao.codigoProduto || ""},${requisicao.codigoDerivacao || ""},${requisicao.codigoDepartamento || ""},${new Date(requisicao.dataMovimentada).toLocaleDateString('pt-BR') || ""},${requisicao.sequenciaMovimento || ""},${requisicao.codigoTransferencia || ""},${requisicao.numeroDocumento || ""},${requisicao.observacaoMovimento || ""},${requisicao.quatidadeMovimento || ""},${requisicao.valorMovimentado || ""},${requisicao.usuarioResponsavel || ""},${requisicao.usuarioRecebedor || ""}\n`;
          }

          // Criar o blob com os dados
          const blob = new Blob([conteudo], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `requisicoes_${this.dataInicial}_${this.dataFinal}.txt`; // Nome do arquivo para download
          a.click();

          // Libera o URL
          window.URL.revokeObjectURL(url);
        },
        (erro) => {
          console.error('Erro ao obter as requisições:', erro);
        }
      );
  }


}

