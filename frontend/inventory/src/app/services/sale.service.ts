import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  // Get all sales
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/`);
  }

  // Get sale by ID
  getSaleById(id: string): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  // Create new sale
  createSale(sale: { product: string; quantity: number; customer: string }): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/`, sale);
  }
}
