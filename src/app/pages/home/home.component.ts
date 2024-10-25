import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Product from '../../../../types/Product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService);

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
