import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product from '../../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  constructor() {}

  getAllProducts() {
    return this.http.get('http://54.175.125.154:3000/api/products');
  }

  getOneProduct(productId: string) {
    return this.http.get(`http://54.175.125.154:3000/api/products/` + productId);
  }
}
