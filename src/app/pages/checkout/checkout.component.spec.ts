import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../services/cart.service';
import { OrdenService } from '../../services/orden.service';
import { Router } from '@angular/router';
import { MockBuilder, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

describe('CheckoutComponent Test', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let orderServiceSpy: jasmine.SpyObj<OrdenService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const paymentDetails = {
    address: 'Calle 1254',
    paymentMethod: 'credit-card',
  };

  const isVisibleSubject = new BehaviorSubject<boolean>(false);

  const isVisible = false;
  let products = new Map();
  let product = {
    _id: 'oip45131',
    name: 'Producto',
    size: ['xl', 5, 'l'],
    stock: 145,
    price: 152450,
    category: {
      name: 'Tenis',
      gender: 'masculino',
    },
    brand: 'Adidas',
    images: ['xx.png', 'xxx.png'],
    description: 'un gran producto',
    sale: 22,
  };
  products.set(product._id, product);

  const total = 1234;

  ngMocks.defaultConfig(CheckoutComponent, {
    render: true,
  });

  beforeEach(
    () =>
      MockBuilder(CartService, CheckoutComponent).keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
  );

  beforeEach(
    () =>
      MockBuilder(CheckoutComponent, CheckoutComponent).keep(
        NG_MOCKS_ROOT_PROVIDERS
      ) // <- the fix
  );

  beforeEach(
    () =>
      MockBuilder(OrdenService, CheckoutComponent).keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
  );

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj(
      'CartService',
      ['Total', 'products', 'hideCart'],
      { isVisible$: isVisibleSubject }
    );
    const orderSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CheckoutComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: OrdenService, useValue: orderSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.paymentDetails.setValue(paymentDetails);

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartServiceSpy.products.and.returnValue(products);
    cartServiceSpy.Total.and.returnValue(total);
    orderServiceSpy = TestBed.inject(
      OrdenService
    ) as jasmine.SpyObj<OrdenService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('Deberia crear un componente', () => {
    isVisibleSubject.next(true);
    expect(component.isVisible).toBeTrue();
  });

  it('Deberia crear una orden al enviar la informacion', () => {
    const mockResponse = { ok: true, message: 'Order Create' };

    orderServiceSpy.createOrder.and.returnValue(of(mockResponse));

    fixture.detectChanges();

    component.onSubmit();

    expect(orderServiceSpy.createOrder).toHaveBeenCalledWith({ address: 'Calle 1254', paymentMethod: 'credit-card' });
  });

  it('Deberia llamar la funcion hide()', () => {
    component.hide();
    expect(cartServiceSpy.hideCart).toHaveBeenCalledWith();
  });

  it('Deberia crear una orden al enviar la informacion', () => {
    component.onDocumentClick(new MouseEvent('click'));

    expect(cartServiceSpy.hideCart).toHaveBeenCalledWith();
  });

  it('Deberia crear una orden al enviar la informacion', () => {
    const mockFailResponse =  { error: { msg: 'Internal Server Error' } };

    orderServiceSpy.createOrder.and.returnValue(throwError(mockFailResponse));

    fixture.detectChanges();

    component.onSubmit();

    expect(Swal.isVisible()).toBeTrue();
  });
});
