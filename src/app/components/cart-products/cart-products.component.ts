import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Product from '../../../../types/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './cart-products.component.html',
  styleUrl: './cart-products.component.css',
})
export class CartProductsComponent {
  private cartService = inject(CartService);
  @Input() product: any;

  cartQuantity = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.cartQuantity.setValue(this.product.quantity);
    }
  }

  increment(productID: String) {
    this.cartService.incrementProduct(productID);
  }

  decrement(productID: String) {
    this.cartService.decrementProduct(productID);
  }

  delete(productID: String) {
    this.cartService.deleteProduct(productID);
  }
}
