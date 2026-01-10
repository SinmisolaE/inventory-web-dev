import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Sale } from '../models/sale';

export interface SaleResponse {
  success?: boolean;
  message?: string;
  data?: Sale;
}

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  // Get all sales
  getAllSales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  // Get sale by ID
  getSaleById(id: string): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.apiUrl}/${id}`);
  }

  // Create new sale
  createSale(sale: { product: string; quantity: number; customer: string }): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.apiUrl}/`, sale);
  }
}
