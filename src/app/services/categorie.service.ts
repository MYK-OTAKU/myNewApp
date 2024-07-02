// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:3200/api/categories'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
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

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, category);
  }

  editCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

