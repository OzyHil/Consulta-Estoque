import { Component } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { Identificavel } from '../../../models/identificavel.model';
import { TransferenciaService } from '../../../services/transferencia.service';
import { EmpresaService } from '../../../services/empresa.service';
import { DepartamentosService } from '../../../services/departamento.service';
import { NgFor } from '@angular/common';
import { CentroDeCustoService } from '../../../services/centro-de-custo.service';
import { FormsModule } from '@angular/forms';
import { RequisicaoService } from '../../../services/requisicao.service';
import { Requisicao } from '../../../models/requisicao.model';

@Component({
  selector: 'app-requisicao-page',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './requisicao-page.component.html',
  styleUrl: './requisicao-page.component.css'
})
export class RequisicaoPageComponent {
  titulo = 'Formulário de Requisição';
  produtosSelecionados: Produto[] = [];
  empresa?: Identificavel;
  transferencia?: Identificavel;
  departamento?: Identificavel;
  centroDeCusto?: Identificavel[];
  responsavel: string = '';
  recebedor: string = '';

  constructor(
    private produtoService: ProdutoService,
    private empresaService: EmpresaService,
    private transferenciaService: TransferenciaService,
    private departamentoService: DepartamentosService,
    private centroDeCustoService: CentroDeCustoService,
    private requisicaoService: RequisicaoService) { }

  ngOnInit() {
    this.produtosSelecionados = history.state.produtos;
    this.buscarEmpresaPorCodigo('0010');
    this.buscarTransferenciaPorCodigo('90250');
    this.buscarDepartamentosPorCodigo('003');
    this.buscarCentroDeCustos();
  }

  buscarEmpresaPorCodigo(codigo: string): void {
    this.empresaService.getEmpresaPorCodigo(codigo).subscribe(data => {
      if (data) {
        this.empresa = data;
      } else {
      }
    });
  }
  buscarTransferenciaPorCodigo(codigo: string): void {
    this.transferenciaService.getTransferenciaPorCodigo(codigo).subscribe(data => {
      if (data) {
        this.transferencia = data;
      } else {
      }
    });
  }
  buscarDepartamentosPorCodigo(codigo: string): void {
    this.departamentoService.getDepartamentoPorCodigo(codigo).subscribe(data => {
      if (data) {
        this.departamento = data;
      } else {
      }
    });
  }
  buscarCentroDeCustos(): void {
    this.centroDeCustoService.getCentroDeCustos().subscribe(data => {
      if (data) {
        this.centroDeCusto = data;
      } else {
      }
    });
  }

  adicionarRequisicao() {
    const dataAtual = new Date().toISOString().split('T')[0]; // Formata a data no padrão "YYYY-MM-DD"
    const requisicoes: Requisicao[] = [];

    for (const produto of this.produtosSelecionados) {
      const novaRequisicao: Requisicao = {
        codigoEmpresa: this.empresa?.codigo || '',
        codigoProduto: produto.codigo,
        codigoDerivacao: '',
        codigoDepartamento: this.departamento?.codigo || '',
        dataMovimentada: dataAtual,
        sequenciaMovimento: '',
        codigoTransferencia: this.transferencia?.codigo || '',
        numeroDocumento: '',
        observacaoMovimento: '',
        quatidadeMovimento: '',
        valorMovimentado: '',
        usuarioResponsavel: this.responsavel,
        usuarioRecebedor: this.recebedor
      };      
      requisicoes.push(novaRequisicao);
    }

    this.requisicaoService.addRequisicao(requisicoes).subscribe({
      next: (response) => {
        console.log("Requisições adicionadas com sucesso:", response);
      },
      error: (err) => {
        console.error("Erro ao adicionar requisições:", err);
      }
    });
  }

  baixarArquivo(): void {
    const dataAtual = new Date().toLocaleDateString();
    let conteudo = '';

    for (const produto of this.produtosSelecionados) {
      conteudo += `${this.empresa?.codigo},${produto.codigo},VCODDER,${this.departamento?.codigo},${dataAtual},VSEQMOV,${this.transferencia?.codigo},VNUMDOC,VOBSMVP,QTDMOV,VVLRMOV,${this.responsavel},${this.recebedor}\n`;
    }

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arquivo.txt';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}