import { Component, inject } from '@angular/core';
import { CartProductsComponent } from '../cart-products/cart-products.component';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductsComponent,CommonModule,RouterLinkWithHref,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
private cartService = inject(CartService);
cart = this.cartService.products
cartVisibility = this.cartService.cardVisibility


handleCartClick(){
  this.cartService.visibilityCart()
}




}