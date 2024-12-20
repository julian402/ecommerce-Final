import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../../../types/Product';
import { CartService } from './cart.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  total = this.cartService.Total;
  products = this.cartService.products;

  constructor() {}

  createOrder(formData: any) {
    console.log('Create order');
    console.log(formData);
    console.log(this.products().values());

    const mapToArray = Array.from(this.products().values());
    const productsArray = mapToArray.map((product) => {
      return { productId: product._id, quantity: product.quantity };
    });

    console.log(productsArray);

    return this.http.post(
      'http://54.175.125.154:3000/api/purchaseorder',
      {
        products: productsArray,
        amount: this.total(),
        // address: formData.address,
        paymentMet: formData.paymentMethod,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
