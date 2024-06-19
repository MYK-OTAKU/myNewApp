import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { P1Component } from './p1/p1.component';
import { P2Component } from './p2/p2.component';
import { P3Component } from './p3/p3.component';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, MenuComponent, MaincontentComponent, P1Component, P2Component, P3Component],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  sidebarVisible: boolean = true; // Default to true for larger screens

constructor(private sidebarService: SidebarService) {
  this.sidebarService.sidebarVisible$.subscribe(
    (visible) => (this.sidebarVisible = visible)
  );
}

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.adjustSidebarForScreenSize(event.target.innerWidth);
}

adjustSidebarForScreenSize(width: number) {
  if (width <= 900 && width >= 650) {
    this.sidebarVisible = true;
  } else if (width < 650) {
    this.sidebarVisible = false;
  } else {
    this.sidebarVisible = true;
  }
}

}
