import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identificavel } from '../models/identificavel.model'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/empresas';  // Ajuste a URL

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Identificavel[]> {
    return this.http.get<Identificavel[]>(this.apiUrl);
  } 
  
  getEmpresaPorCodigo(codigo: string): Observable<Identificavel | undefined> {
    return this.http.get<Identificavel[]>(this.apiUrl).pipe(
      map((empresas: Identificavel[]) => empresas.find(emp => emp.codigo === codigo))
    );
  }

}
