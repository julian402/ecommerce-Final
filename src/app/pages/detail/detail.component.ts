import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../../../types/Product';
import { CartService } from '../../services/cart.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);

  @Input() id: string = '';

  product = signal<null | Product>(null);

  ngOnInit() {
    console.log('Este es el detalle', this.id);
    this.productService.getOneProduct(this.id).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.product.set(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  handlerAddCart(product:any){
    this.cartService.addCart(product())
  }

  increment(productID: String) {
    this.cartService.incrementProduct(productID);
  }

  decrement(productID: String) {
    this.cartService.decrementProduct(productID);
  }

}
