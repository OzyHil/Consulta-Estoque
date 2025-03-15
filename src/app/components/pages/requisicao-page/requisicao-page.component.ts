import { Component } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { Identificavel } from '../../../models/identificavel.model';
import { TransferenciaService } from '../../../services/transferencia.service';
import { EmpresaService } from '../../../services/empresa.service';
import { DepartamentosService } from '../../../services/departamento.service';

@Component({
  selector: 'app-requisicao-page',
  imports: [],
  templateUrl: './requisicao-page.component.html',
  styleUrl: './requisicao-page.component.css'
})
export class RequisicaoPageComponent {
  titulo = 'Formulário de Requisição';
  produto!: Produto;
  empresa?: Identificavel;
  transferencia?: Identificavel;
  departamento?: Identificavel;

  constructor(private produtoService: ProdutoService, private empresaService: EmpresaService,
    private transferenciaService: TransferenciaService, private departamentoService: DepartamentosService) { }

  ngOnInit() {
    const produtoRecebido = this.produtoService.getProduto();

    if (produtoRecebido) {
      this.produto = produtoRecebido;
    } else {
      console.warn('Nenhum produto recebido!');
      // Aqui você pode definir um objeto vazio ou redirecionar para outra página
      this.produto = { codigo: '0', nome: '', imagemUrl: '', id: ' ' }; // Exemplo de objeto vazio
    }
    this.buscarEmpresaPorCodigo('10');
    this.buscarTransferenciaPorCodigo('90250');
    this.buscarDepartamentosPorCodigo('003');
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
  baixarArquivo(): void {
    const dataAtual = new Date().toLocaleDateString();
    const conteudo = `${this.empresa?.codigo},${this.produto?.codigo},VCODDER,${this.departamento?.codigo},${dataAtual},VSEQMOV,${this.transferencia?.codigo},VNUMDOC,VOBSMVP,QTDMOV,VVLRMOV,${this.departamento?.codigo}}`;
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arquivo.txt';
    a.click();
    
    window.URL.revokeObjectURL(url);
  }
  
}

