import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import Product from '../../../types/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private http = inject(HttpClient);

  products = signal(new Map());
  cardVisibility = signal(false);

  Total = computed(() => {
    const productsMaps = this.products();
    let totalCarrito = 0;
    productsMaps.forEach((product) => {
      totalCarrito += product.price * product.quantity;
    });
    return totalCarrito;
  });

  visibilityCart() {
    this.cardVisibility.update((value) => !value);
  }

  addCart(product: Product) {
    this.products.update((value) => {
      const newProductsMap = new Map(value);
      const existProductInCart = newProductsMap.get(product._id);

      if (existProductInCart) {
        newProductsMap.set(existProductInCart._id, {
          ...existProductInCart,
          quantity: existProductInCart.quantity + 1,
        });
      } else {
        newProductsMap.set(product._id, { ...product, quantity: 1 });
      }

      console.log('El carrito actualizado es:', newProductsMap.values());
      return newProductsMap;
    });
  }
}
