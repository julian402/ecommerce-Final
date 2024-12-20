import { TestBed } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { response } from "express";


describe('ProductServiceTest',()=>{
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[ProductService],
        });
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    afterEach(()=>{
        httpMock.verify()
    });

    it('Deberia hacer una llamada al endpoint getall y devolver el resultado',()=>{
        //Arrange
        const mockProductResponse = {}
        
        //Act & Assert
        service.getAllProducts().subscribe(
            response =>{
                expect(response).toEqual(mockProductResponse)
            }
        )

        //Assert - Segundo
        const req = httpMock.expectOne('http://54.175.125.154:3000/api/products');

        expect(req.request.method).toBe('GET');

        req.flush(mockProductResponse)
    })

    it('Deberia hacer una llamada al endpoint getone y devolver el resultado',()=>{
        //Arrange
        const mockProductResponse = {}
        const productId = '123145popk'
        
        //Act & Assert
        service.getOneProduct(productId).subscribe(
            response =>{
                expect(response).toEqual(mockProductResponse)
            }
        )

        //Assert - Segundo
        const req = httpMock.expectOne('http://54.175.125.154:3000/api/products/'+productId);

        expect(req.request.method).toBe('GET');

        req.flush(mockProductResponse)
    })
})