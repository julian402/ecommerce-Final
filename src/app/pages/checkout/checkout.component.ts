import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { OrdenService } from '../../services/orden.service';
import { CartProductsComponent } from '../../components/cart-products/cart-products.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CartProductsComponent,
    CurrencyPipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private cartService = inject(CartService);
  private ordenService = inject(OrdenService);
  private router = inject(Router);

  products = this.cartService.products;
  total = this.cartService.Total;

  paymentDetails = new FormGroup({
    address: new FormControl(''),
    paymentMethod: new FormControl(''),
  });

  onSubmit() {
    if (this.products().size >= 1 && this.paymentDetails.valid) {
      this.ordenService.createOrder(this.paymentDetails.value).subscribe({
        next: () => this.router.navigate(['']),
      });
    }
  }
}
