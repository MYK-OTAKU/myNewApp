import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:3200/api/commandes';

  constructor(private http: HttpClient) {}

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.baseUrl}/`, commande);
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/`);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/${id}`);
  }

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
