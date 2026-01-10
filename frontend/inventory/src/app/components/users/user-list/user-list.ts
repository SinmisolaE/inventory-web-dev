import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService, User } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  showForm = false;
  
  // Permissions
  canAdd = false;
  canDelete = false;

  // Form
  formData = {
    username: '',
    role: 'stocker'
  };

  roles = ['admin', 'stocker', 'seller'];

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkPermissions();
    this.loadUsers();
  }

  checkPermissions(): void {
    this.canAdd = this.authService.hasRole('admin');
    this.canDelete = this.authService.hasRole('admin');
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users || response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        this.isLoading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formData = {
      username: '',
      role: 'stocker'
    };
  }

  saveUser(): void {
    this.userService.addUser(this.formData).subscribe({
      next: (response) => {
        this.loadUsers();
        this.resetForm();
        this.showForm = false;
        alert('User created successfully');
      },
      error: (error) => {
        const errorMsg = error.error?.message || 'Failed to create user';
        alert(errorMsg);
        console.error('Error creating user:', error);
      }
    });
  }

  deleteUser(userId: string): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        if (response.success || response.message) {
          this.loadUsers();
          alert('User deleted successfully');
        }
      },
      error: (error) => {
        alert('Failed to delete user');
        console.error('Error deleting user:', error);
      }
    });
  }

  cancel(): void {
    this.resetForm();
    this.showForm = false;
  }

  getUsername(user: User): string {
    return `${user.username}`;
  }
}
