import { Component } from '@angular/core';
import { SidebarTopComponent } from '../sidebar-top/sidebar-top.component';
import { SidebarMainComponent } from '../sidebar-main/sidebar-main.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarTopComponent,SidebarMainComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
