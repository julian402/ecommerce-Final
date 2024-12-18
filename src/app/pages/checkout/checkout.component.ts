import { Component, inject, HostListener } from '@angular/core';
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
import Swal from 'sweetalert2';
import { response } from 'express';

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

  isVisible = false;

  constructor() {
    this.cartService.isVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  products = this.cartService.products;
  total = this.cartService.Total;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const cartElement = document.getElementById('cart-container');
    if (cartElement && !cartElement.contains(event.target as Node)) {
      this.cartService.hideCart();
    }
  }

  hide() {
    this.cartService.hideCart();
  }

  paymentDetails = new FormGroup({
    address: new FormControl(''),
    paymentMethod: new FormControl(''),
  });

  onSubmit() {
    if (this.products().size >= 1 && this.paymentDetails.valid) {
      this.ordenService.createOrder(this.paymentDetails.value).subscribe({
        next: (response: any) => {
          Swal.fire('Orden Generada y enviada', response.message, 'success');
          this.router.navigate(['']);
        },
        error: (error) => {
          Swal.fire('No se pudo generar la orden', error.message, 'error');
        },
      });
    }
  }
}
