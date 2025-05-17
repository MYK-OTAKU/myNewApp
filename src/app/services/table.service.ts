// src/app/services/table.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = 'https://rmsbackend-silk.vercel.app/api/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/`).pipe(
      map(response => {
        console.log('Response from backend:', response);
        if (Array.isArray(response)) {
          return response;
        } else if (response.données && Array.isArray(response.données)) {
          return response.données;
        } else {
          throw new Error('La réponse de l\'API n\'est pas un tableau.');
        }
      })
    );
  }

  getTable(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addTable(table: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, table);
  }

  editTable(id: number, table: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, table);
  }

  deleteTable(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
