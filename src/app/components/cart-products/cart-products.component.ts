import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import Product from '../../../../types/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-products',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './cart-products.component.html',
  styleUrl: './cart-products.component.css'
})
export class CartProductsComponent {
@Input() product:any

}
