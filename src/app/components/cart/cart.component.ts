import { Component, inject } from '@angular/core';
import { CartProductsComponent } from '../cart-products/cart-products.component';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartProductsComponent,
    CommonModule,
    RouterLinkWithHref,
    CurrencyPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  cart = this.cartService.products;
  cartVisibility = this.cartService.cardVisibility;
  total = this.cartService.Total;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEndEvent = event as NavigationEnd;
        if (navEndEvent.url === 'checkout') {
          this.cartService.hideCart();
        }
      });
  }

  handleCartClick() {
    this.cartService.visibilityCart();
  }
}
