import { Component, inject, signal } from '@angular/core';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ProductService } from '../../services/product.service';
import Product from '../../../../types/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-listproduct',
  standalone: true,
  imports: [CardProductComponent],
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css',
})
export class ListproductComponent {
  productService = inject(ProductService);
cartService = inject(CartService);

  products = signal<null | Product[]>(null);

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        // console.log(response);
        this.products.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
