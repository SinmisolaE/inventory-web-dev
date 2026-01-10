import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Stock, StockResponse } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = `${environment.apiUrl}/stocks`;

  constructor(private http: HttpClient) {}

  // Get all stocks
  getAllStocks(): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiUrl}/`);
  }

  // Get stock by ID
  getStockById(id: string): Observable<{ success: boolean; data: Stock }> {
    return this.http.get<{ success: boolean; data: Stock }>(`${this.apiUrl}/${id}`);
  }

  // Add new stock
  addStock(stock: Partial<Stock>): Observable<{ success: boolean; data: Stock }> {
    return this.http.post<{ success: boolean; data: Stock }>(`${this.apiUrl}/`, stock);
  }

  // Update stock
  updateStock(id: string, stock: Partial<Stock>): Observable<{ success: boolean; data: Stock }> {
    return this.http.patch<{ success: boolean; data: Stock }>(`${this.apiUrl}/${id}`, stock);
  }

  // Delete stock
  deleteStock(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}
