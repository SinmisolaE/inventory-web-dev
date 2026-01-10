import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-update.html',
  styleUrls: ['./password-update.css']
})
export class PasswordUpdateComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated and has requiresPasswordUpdate flag
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateForm(): boolean {
    this.errorMessage = '';

    if (!this.newPassword) {
      this.errorMessage = 'Password is required';
      return false;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return false;
    }

    if (!this.confirmPassword) {
      this.errorMessage = 'Please confirm your password';
      return false;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }

    return true;
  }

  updatePassword(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.updatePassword(this.newPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response?.message || 'Password updated successfully';
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || error?.error?.error || 'Failed to update password';
        console.error('Error updating password:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
