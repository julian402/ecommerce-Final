import { Component, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

cartService = inject(CartService)

handleCartClick(){
  this.cartService.visibilityCart()
}


  // tokenExist(){
  //   return localStorage.getItem('token') !== null
  // }
}
