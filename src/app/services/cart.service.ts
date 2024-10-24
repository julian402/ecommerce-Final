import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  incrementProduct(productID: String) {
    this.products.update((productsMap) => {
      const productInCart = productsMap.get(productID);

      if (productInCart) {
        productsMap.set(productID, {
          ...productInCart,
          quantity: productInCart.quantity + 1,
        });
      }
      return new Map(productsMap);
    });
  }

  decrementProduct(productID: String) {
    this.products.update((productMap) => {
      const productInCart = productMap.get(productID);
      if (productInCart!.quantity === 1) {
        productMap.delete(productID);
      } else {
        productMap.set(productID, {
          ...productInCart!,
          quantity: productInCart!.quantity - 1,
        });
      }

      return new Map(productMap);
    });
  }

  deleteProduct(productID: String) {
    this.products.update((productsMap) => {
      productsMap.delete(productID);
      return new Map(productsMap);
    });
  }
}
