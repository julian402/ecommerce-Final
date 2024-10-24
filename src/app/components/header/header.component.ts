import { Component, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkWithHref, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private userService = inject(UserService);
  private router = inject(Router);
  private authService = inject(AuthService);

  handleCartClick() {
    this.cartService.visibilityCart();
  }

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
