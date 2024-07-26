import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UtilisateurService } from '../../services/utilisateurs/utilisateur.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authentifiaction/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Utilisez OnPush pour optimiser la détection des changements
})
export class SidebarComponent implements OnInit {
  user: any = {};
  sidebarVisible: boolean = true; // Assurez-vous que la valeur par défaut est `true`

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.sidebarService.sidebarVisible$.subscribe(
      (visible) => {
        this.sidebarVisible = visible;
        this.cd.markForCheck(); // Marquez la détection des changements
      }
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    console.log('SidebarComponent initialized');
    this.utilisateurService.getUserProfile().subscribe({
      next: (data: any) => {
        console.log('User profile data fetched:', data);
        if (data && data.données) {
          this.user = data.données;
          this.cd.markForCheck(); // Marquez la détection des changements
          console.log('User profile data assigned:', this.user);
        } else {
          console.error('User profile data is not complete:', data);
        }
      },
      error: (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Assurez-vous de rediriger l'utilisateur vers la page de connexion après la déconnexion
  }
}
