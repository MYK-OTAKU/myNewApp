// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3200/api/utilisateurs'; // Vérifiez l'URL

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    console.log('Fetching user profile from:', `${this.baseUrl}/`);
    return this.http.get<any>(`${this.baseUrl}/`).pipe(
      map(response => {
        console.log('Response from backend:', response);
        return response.data[0]; // Accède directement aux données utilisateur
      })
    );
  }
}
