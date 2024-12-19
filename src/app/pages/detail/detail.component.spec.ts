import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import Product from '../../../../types/Product';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const mockProductService = jasmine.createSpyObj('ProductService', [
      'getOneProduct',
    ]);
    const mockCartService = jasmine.createSpyObj('CartService', [
      'addCart',
      'incrementProduct',
      'decrementProduct',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        DetailComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        CurrencyPipe,
        RouterLink,
        RouterTestingModule,
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener el producto y asignarlo a la señal product', () => {
    const testProduct: Product = {
      _id: '123',
      name: 'Test Product',
      size: ['M'],
      stock: 50,
      price: 100,
      category: { name: 'Camisetas', gender: 'Unisex' },
      brand: 'Test Brand',
      images: ['test-image.jpg'],
      description: 'A test product',
      sale: 0,
    };

    component.id = '123';

    productServiceSpy.getOneProduct.and.returnValue(of(testProduct));

    fixture.detectChanges();

    expect(productServiceSpy.getOneProduct).toHaveBeenCalledWith('123');
    expect(component.product()).toEqual(testProduct);
  });

  it('debería manejar el error al obtener un producto', () => {
    const error = new Error('Error al obtener producto');
    productServiceSpy.getOneProduct.and.returnValue(throwError(() => error));

    component.id = '999';
    spyOn(console, 'log');

    fixture.detectChanges();

    expect(productServiceSpy.getOneProduct).toHaveBeenCalledWith('999');
    expect(console.log).toHaveBeenCalledWith(error);
    expect(component.product()).toBeNull();
  });

  it('debería agregar el producto al carrito', () => {
    const testProduct: Product = {
      _id: '123',
      name: 'Test Product',
      size: ['M'],
      stock: 50,
      price: 100,
      category: { name: 'Camisetas', gender: 'Unisex' },
      brand: 'Test Brand',
      images: ['test-image.jpg'],
      description: 'A test product',
      sale: 0,
    };

    component.id = '123';
    productServiceSpy.getOneProduct.and.returnValue(of(testProduct));

    fixture.detectChanges();
    component.handlerAddCart(component.product);

    expect(cartServiceSpy.addCart).toHaveBeenCalledWith(testProduct);
  });

  it('debería incrementar la cantidad del producto en el carrito', () => {
    component.increment('123');
    expect(cartServiceSpy.incrementProduct).toHaveBeenCalledWith('123');
  });

  it('debería decrementar la cantidad del producto en el carrito', () => {
    component.decrement('123');
    expect(cartServiceSpy.decrementProduct).toHaveBeenCalledWith('123');
  });
});
