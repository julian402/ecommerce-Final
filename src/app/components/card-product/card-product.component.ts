import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterLinkWithHref, CurrencyPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() brand = '';
  @Input() price = 0;
  @Input() imagen = '';
}
