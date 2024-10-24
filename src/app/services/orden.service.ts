import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private http = inject(HttpClient);
  products = signal(new Map());
  constructor() {}

  createOrder(formData: any) {
    return this.http.post('http://localhost:3000/api/purchaseorder', formData);
  }
}
