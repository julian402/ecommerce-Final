import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import Product from '../../../types/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private snackBar: MatSnackBar) {}
  private http = inject(HttpClient);
  private isVisible = false;
  private isVisibleSubject = new BehaviorSubject<boolean>(false);

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

  isVisible$ = this.isVisibleSubject.asObservable();

  hideCart() {
    this.cardVisibility.set(false);
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

    this.showNotification('Producto agregado al carrito');
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
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
