import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identificavel } from '../models/identificavel.model';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = 'http://localhost:3000/transferencias'; // Ajuste a URL

  constructor(private http: HttpClient) { }

  getTransferencias(): Observable<Identificavel[]> {
    return this.http.get<Identificavel[]>(this.apiUrl);
  }

  getTransferenciaPorCodigo(codigo: string): Observable<Identificavel | undefined> {
    return this.http.get<Identificavel[]>(this.apiUrl).pipe(
      map((transferencia: Identificavel[]) => transferencia.find(trans => trans.codigo === codigo))
    );
  }
}
