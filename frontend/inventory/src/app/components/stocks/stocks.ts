import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stocks.html',
  styleUrls: ['./stocks.css']
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  isLoading = true;
  errorMessage = '';
  showForm = false;
  isEditing = false;
  editingId: string | null = null;

  // Permissions
  canAdd = false;
  canEdit = false;
  canDelete = false;

  // Form
  formData = {
    code: '',
    name: '',
    model: '',
    initialAmount: 0,
    unitCostPrice: 0,
    unitSellPrice: 0,
    source: ''
  };

  constructor(
    private stockService: StockService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkPermissions();
    this.loadStocks();
  }

  checkPermissions(): void {
    this.canAdd = this.authService.hasRole('admin') || this.authService.hasRole('stocker');
    this.canEdit = this.authService.hasRole('admin') || this.authService.hasRole('stocker');
    this.canDelete = this.authService.hasRole('admin');
  }

  loadStocks(): void {
    this.isLoading = true;
    this.stockService.getAllStocks().subscribe({
      next: (response) => {
        this.stocks = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load stocks';
        this.isLoading = false;
        console.error('Error loading stocks:', error);
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
      code: '',
      name: '',
      model: '',
      initialAmount: 0,
      unitCostPrice: 0,
      unitSellPrice: 0,
      source: ''
    };
    this.isEditing = false;
    this.editingId = null;
  }

  editStock(stock: Stock): void {
    this.isEditing = true;
    this.editingId = stock._id;
    this.formData = {
      code: stock.code,
      name: stock.name,
      model: stock.model,
      initialAmount: stock.initialAmount,
      unitCostPrice: stock.unitCostPrice,
      unitSellPrice: stock.unitSellPrice,
      source: stock.source
    };
    this.showForm = true;
  }

  saveStock(): void {
    if (this.isEditing && this.editingId) {
      this.stockService.updateStock(this.editingId, this.formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadStocks();
            this.resetForm();
            this.showForm = false;
            alert('Stock updated successfully');
          }
        },
        error: (error) => {
          alert('Failed to update stock');
          console.error('Error updating stock:', error);
        }
      });
    } else {
      this.stockService.addStock(this.formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadStocks();
            this.resetForm();
            this.showForm = false;
            alert('Stock added successfully');
          }
        },
        error: (error) => {
          alert('Failed to add stock');
          console.error('Error adding stock:', error);
        }
      });
    }
  }

  deleteStock(stockId: string): void {
    if (!confirm('Are you sure you want to delete this stock?')) {
      return;
    }

    this.stockService.deleteStock(stockId).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadStocks();
          alert('Stock deleted successfully');
        }
      },
      error: (error) => {
        alert('Failed to delete stock');
        console.error('Error deleting stock:', error);
      }
    });
  }

  cancel(): void {
    this.resetForm();
    this.showForm = false;
  }
}
