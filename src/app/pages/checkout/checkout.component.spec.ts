import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../services/cart.service';
import { OrdenService } from '../../services/orden.service';
import { Router } from '@angular/router';
import { MockBuilder, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks';

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

  
  const isVisible = false;
  const products = [
    {
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
    },
    {
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
    },
  ];

  const total = 12654;

  ngMocks.defaultConfig(CheckoutComponent, {
    render: true,
  })

  beforeEach(() => MockBuilder(CartService,CheckoutComponent)
      .keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
    );

    beforeEach(() => MockBuilder(CheckoutComponent,CheckoutComponent)
    .keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
  );

    beforeEach(() => MockBuilder(OrdenService,CheckoutComponent)
      .keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
    )

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', [
      'Total',
      'products',
      'hideCart',
    ]);
    const orderSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: OrdenService, useValue: orderSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    orderServiceSpy = TestBed.inject(
      OrdenService
    ) as jasmine.SpyObj<OrdenService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it("Deberia crear un componente", ()=>{
    component.isVisible = isVisible
    expect(component).toBeTruthy()
  })

  it("Deberia manejar")


});
