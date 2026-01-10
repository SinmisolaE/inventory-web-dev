import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Sale } from '../../models/sale';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.html',
  styleUrls: ['./sales.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  stocks: Stock[] = [];
  isLoading = true;
  errorMessage = '';
  showForm = false;

  // Permissions
  canAdd = false;

  // Form
  formData = {
    product: '',
    quantity: 1,
    customerName: '',
    customerContact: ''
  };

  selectedStock: Stock | null = null;

  constructor(
    private saleService: SaleService,
    private stockService: StockService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkPermissions();
    this.loadSales();
    this.loadStocks();
  }

  checkPermissions(): void {
    this.canAdd = this.authService.hasRole('seller') || this.authService.hasRole('admin');
  }

  loadSales(): void {
    this.isLoading = true;
    this.saleService.getAllSales().subscribe({
      next: (sales) => {
        this.sales = sales;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load sales';
        this.isLoading = false;
        console.error('Error loading sales:', error);
      }
    });
  }

  loadStocks(): void {
    this.stockService.getAllStocks().subscribe({
      next: (response) => {
        this.stocks = response.data.filter(stock => stock.currentAmount > 0);
      },
      error: (error) => {
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
      product: '',
      quantity: 1,
      customerName: '',
      customerContact: ''
    };
    this.selectedStock = null;
  }

  onProductChange(): void {
    const stock = this.stocks.find(s => s._id === this.formData.product);
    this.selectedStock = stock || null;
  }

  getTotalAmount(): number {
    if (this.selectedStock) {
      return this.selectedStock.unitSellPrice * this.formData.quantity;
    }
    return 0;
  }

  saveSale(): void {
    // Create a temporary customer (in a real app, you'd have a customer management system)
    const saleData = {
      product: this.formData.product,
      quantity: this.formData.quantity,
      customer: this.formData.customerName // Backend expects customer ID, but simplified here
    };

    this.saleService.createSale(saleData).subscribe({
      next: (sale) => {
        this.loadSales();
        this.resetForm();
        this.showForm = false;
        alert('Sale completed successfully');
      },
      error: (error) => {
        const errorMsg = error.error?.message || 'Failed to create sale';
        alert(errorMsg);
        console.error('Error creating sale:', error);
      }
    });
  }

  cancel(): void {
    this.resetForm();
    this.showForm = false;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
