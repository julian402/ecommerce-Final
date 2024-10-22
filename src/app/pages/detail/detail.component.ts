import { Component, Input, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../../../types/Product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  productService = inject(ProductService);
  @Input() id: string = '';

  product = signal<null | Product>(null);

  ngOnInit() {
    console.log('Este es el detalle', this.id);
    this.productService.getOneProduct(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.product.set(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
