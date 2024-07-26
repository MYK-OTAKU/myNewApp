// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categorie } from '../../models/produit.model';

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

  getCategory(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/${id}`);
  }

  addCategory(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/`, category);
  }

  editCategory(id: number, category: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
