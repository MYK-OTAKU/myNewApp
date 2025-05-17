import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../authentifiaction/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private baseUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) } : {};
  }

  creerUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.baseUrl, utilisateur, this.getAuthHeaders())
      .pipe(catchError(this.handleError<Utilisateur>('creerUtilisateur')));
  }

  mettreAJourUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${id}`, utilisateur, this.getAuthHeaders())
      .pipe(catchError(this.handleError<Utilisateur>('mettreAJourUtilisateur')));
  }

  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError<Utilisateur>('getUtilisateur')));
  }

  getUtilisateurs(): Observable<any> {
    return this.http.get<any>(this.baseUrl, this.getAuthHeaders())
      .pipe(catchError(this.handleError<any>('getUtilisateurs', { données: [] })));
  }

  deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError<any>('deleteUtilisateur')));
  }

  getUserProfile(): Observable<any> {
    console.log('Fetching user profile from:', `${this.baseUrl}/profil`);
    return this.http.get<any>(`${this.baseUrl}/profil`, this.getAuthHeaders()).pipe(
      map(response => {
        console.log('Response from backend:', response);
        return response;
      }),
      catchError(this.handleError<any>('getUserProfile'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
