// src/app/services/table.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = 'http://localhost:3200/api/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          throw new Error('La réponse de l\'API n\'est pas un tableau.');
        }
      })
    );
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
