import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import Product from '../../../types/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CartService', () => {
  let service: CartService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartService,
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });

    service = TestBed.inject(CartService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar el carrito vacío', () => {
    const productos = service.products();
    expect(productos.size).toBe(0);
  });

  it('debería agregar un producto al carrito', () => {
    const product: Product = {
      _id: '1',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 100,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };

    service.addCart(product);

    const productos = service.products();
    expect(productos.size).toBe(1);
    const prodCarrito = productos.get('1');
    expect(prodCarrito).toBeDefined();
    expect(prodCarrito.quantity).toBe(1);
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Producto agregado al carrito',
      'Cerrar',
      {
        duration: 1000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  });

  it('debería agregar un producto al carrito', () => {
    const product: Product = {
      _id: '1',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 100,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };

    service.addCart(product);

    const productos = service.products();
    expect(productos.size).toBe(1);
    const prodCarrito = productos.get('1');
    expect(prodCarrito).toBeDefined();
    expect(prodCarrito.quantity).toBe(1);
  });

  it('debería decrementar la cantidad de un producto y eliminarlo si llega a 0', () => {
    const product: Product = {
      _id: '1',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 100,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };
    service.addCart(product);
    service.decrementProduct('1');
    const productos = service.products();
    expect(productos.size).toBe(0);
  });

  it('debería eliminar un producto específico', () => {
    const product: Product = {
      _id: '1',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 100,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };
    service.addCart(product);
    expect(service.products().size).toBe(1);

    service.deleteProduct('1');
    expect(service.products().size).toBe(0);
  });

  it('debería calcular el total correctamente', () => {
    const product1: Product = {
      _id: '1',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 100,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };
    const product2: Product = {
      _id: '2',
      name: 'Producto Test',
      size: ['M'],
      stock: 50,
      price: 200,
      category: {
        name: 'Camisetas',
        gender: 'Unisex',
      },
      brand: 'Marca Test',
      images: ['imagen1.jpg'],
      description: 'Descripción test',
      sale: 0,
    };

    service.addCart(product1);
    service.addCart(product2);
    service.incrementProduct('1');

    expect(service.Total()).toBe(400);
  });

  it('debería cambiar la visibilidad del carrito', () => {
    expect(service.cardVisibility()).toBe(false as any);

    service.visibilityCart();
    expect(service.cardVisibility()).toBe(true as any);

    service.visibilityCart();
    expect(service.cardVisibility()).toBe(false as any);
  });

  it('debería ocultar el carrito', () => {
    service.visibilityCart();
    expect(service.cardVisibility()).toBe(true as any);

    service.hideCart();
    expect(service.cardVisibility()).toBe(false as any);
  });
});
