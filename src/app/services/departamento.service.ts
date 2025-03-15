import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identificavel } from '../models/identificavel.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  private apiUrl = 'http://localhost:3000/departamentos'; // Ajuste a URL

  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<Identificavel[]> {
    return this.http.get<Identificavel[]>(this.apiUrl);
  }

  getDepartamentoPorCodigo(codigo: string): Observable<Identificavel | undefined> {
    return this.http.get<Identificavel[]>(this.apiUrl).pipe(
      map((departamento: Identificavel[]) => departamento.find(dep => dep.codigo === codigo))
    );
  }
}
