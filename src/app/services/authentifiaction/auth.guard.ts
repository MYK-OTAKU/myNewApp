import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return of(false);
    }

    const requiredRoles = next.data['roles'];
    return this.authService.getUserProfile().pipe(
      map((response) => {
        if (!response) {
          this.router.navigate(['/login']);
          return false;
        }
        const user = response.données;
        if (requiredRoles && !requiredRoles.includes(user.role)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
        return true;
      }),
      catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
