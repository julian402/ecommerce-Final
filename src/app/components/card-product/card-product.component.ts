import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';
import Product from '../../../../types/Product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterLinkWithHref, CurrencyPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  @Input() product:Product | null = null;

  cartService = inject(CartService)

  handlerAddCart(product:any){
    this.cartService.addCart(product)

  }
}
