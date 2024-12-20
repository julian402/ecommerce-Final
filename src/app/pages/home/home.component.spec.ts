import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productServiceMock: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getAllProducts']);

    TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, CommonModule], 
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  
  it('debería mostrar los productos cuando se reciben los datos', () => {
    const mockProducts = [
      { _id: '1', name: 'Producto 1', price: 100, size: ['S', 'M'], images: ['image1.png'] },
      { _id: '2', name: 'Producto 2', price: 150, size: ['M', 'L'], images: ['image2.png'] }
    ];
    
    productServiceMock.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    const productElements = fixture.nativeElement.querySelectorAll('.item');
    expect(productElements.length).toBe(mockProducts.length);
    expect(productElements[0].querySelector('.list').textContent).toContain(mockProducts[0].name);
  });
});
