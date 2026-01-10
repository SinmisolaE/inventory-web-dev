import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../layout/navbar/navbar';
import { SidebarComponent } from '../layout/sidebar/sidebar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to appropriate default page based on role
    if (this.router.url === '/dashboard' || this.router.url === '/dashboard/') {
      const user = this.authService.getCurrentUser();
      if (user?.role === 'seller') {
        this.router.navigate(['/dashboard/sales']);
      } else {
        this.router.navigate(['/dashboard/stocks']);
      }
    }
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
