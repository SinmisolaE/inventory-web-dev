import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MenuItem } from '../../../models/dashboard';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  // Menu items based on roles (admin, stocker, seller)
  menuItems: MenuItem[] = [
    {
      label: 'Stocks',
      icon: 'bi-box-seam',
      route: '/dashboard/stocks',
      requiredRoles: ['admin', 'stocker'] // Admin and stockers can manage stock
    },
    {
      label: 'Sales',
      icon: 'bi-cart',
      route: '/dashboard/sales',
      requiredRoles: ['admin', 'seller'] // Admin and sellers can manage sales
    },
    {
      label: 'Users',
      icon: 'bi-people',
      route: '/dashboard/users',
      requiredRoles: ['admin'] // Only admins can manage users
    }
  ];

  constructor(private authService: AuthService) {}

  // Convert label to safe ID for HTML elements
  getLabelAsId(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
  }

  // Check if user can see menu item
  canShowMenuItem(item: MenuItem): boolean {
    // If no roles required, everyone can see it
    if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
    
    // Check if user has any of the required roles
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return false;
    
    return item.requiredRoles.includes(currentUser.role);
  }

  // Get user info
  getUserInfo() {
    return this.authService.getCurrentUser();
  }
}