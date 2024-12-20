import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListproductComponent } from "./listproduct.component";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { MatCommonModule } from "@angular/material/core";
import { MockBuilder, NG_MOCKS_ROOT_PROVIDERS, ngMocks } from 'ng-mocks';



describe('listComponet Test',()=>{

    let component: ListproductComponent;
    let fixture: ComponentFixture<ListproductComponent>;
    let productServiceSpy: jasmine.SpyObj<ProductService>;
    let cartServiceSpy: jasmine.SpyObj<CartService>;

    beforeEach(() => MockBuilder(ProductService,ListproductComponent)
    .keep(NG_MOCKS_ROOT_PROVIDERS) // <- the fix
  );

    beforeEach(async ()=>{
        const productSpy = jasmine.createSpyObj('ProductService',['getAllProducts']);
        const cartSpy = jasmine.createSpyObj('CartService',['']);

        await TestBed.configureTestingModule({
            imports:[ListproductComponent],
            providers:[{provide: ProductService, useValue: productSpy},
                {provide: CartService,useValue:cartSpy}
            ],            
        }).compileComponents();

        fixture = TestBed.createComponent(ListproductComponent);
        component = fixture.componentInstance;

        productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

        cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

        // fixture.detectChanges();
    });

    it("Deberia crear un componente", ()=>{
        component.products
        expect(component).toBeTruthy()
    })

    it("Deberia cargar los productos al iniciar la pagina",()=>{
        const mockProducts= [{
            _id: "oip45131",
  name: 'Producto',
  size: ['xl',5,'l'],
  stock: 145,
  price: 152450,
  category: {
    name: 'Tenis',
    gender: 'masculino',
  },
  brand: 'Adidas',
  images: ["xx.png","xxx.png"],
  description:"un gran producto",
  sale: 22,
        },{
            _id: "oip45131",
  name: 'Producto',
  size: ['xl',5,'l'],
  stock: 145,
  price: 152450,
  category: {
    name: 'Tenis',
    gender: 'masculino',
  },
  brand: 'Adidas',
  images: ["xx.png","xxx.png"],
  description:"un gran producto",
  sale: 22,
        }];

        component.products;

        productServiceSpy.getAllProducts.and.returnValue(of(mockProducts));

        component.ngOnInit();

        expect(productServiceSpy.getAllProducts).toHaveBeenCalled()
    });

    it("Deberia manejar los errores inesperados al hacer la llamada",()=>{

        const mockErrorResponse ={error:{msg:'Internal Server Error'}};

        productServiceSpy.getAllProducts.and.returnValue(throwError(mockErrorResponse));

        component.ngOnInit();

        expect(console.log()).toEqual()
    })


})
