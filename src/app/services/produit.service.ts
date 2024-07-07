import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:3200/api/produits';

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<any>(`${this.baseUrl}/`).pipe(
      map(response => {
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

  getProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }


  addProduit(produit: FormData): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/`, produit);
  }

  editProduit(id: number, produit: FormData): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/${id}`, produit);
  }


  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
