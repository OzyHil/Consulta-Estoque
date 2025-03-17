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

  constructor(private produtoService: ProdutoService, private empresaService: EmpresaService,
    private transferenciaService: TransferenciaService, private departamentoService: DepartamentosService, private centroDeCustoService: CentroDeCustoService) { }

  ngOnInit() {
    this.produtosSelecionados = history.state.produtos; // Aqui você acessa os produtos selecionados
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