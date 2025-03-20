import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identificavel } from '../models/identificavel.model';

@Injectable({
  providedIn: 'root'
})
export class CentroDeCustoService {
  private apiUrl = 'http://localhost:3100/centro_de_custos'; // Ajuste a URL

  constructor(private http: HttpClient) { }

  getCentroDeCustos(): Observable<Identificavel[]> {
    return this.http.get<Identificavel[]>(this.apiUrl);
  }

  getCentroDeCustoPorCodigo(codigo: string): Observable<Identificavel | undefined> {
    return this.http.get<Identificavel[]>(this.apiUrl).pipe(
      map((centro: Identificavel[]) => centro.find(cc => cc.codigo === codigo))
    );
  }
}
