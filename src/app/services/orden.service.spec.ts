import {TestBed} from "@angular/core/testing"
import { OrdenService } from "./orden.service";
import { HttpClientTestingModule,HttpTestingController } from "@angular/common/http/testing";
import { observeOn } from "rxjs";


describe("OrdenServiceTest",()=>{
    let service : OrdenService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[OrdenService],
        });
        service = TestBed.inject(OrdenService);
        httpMock = TestBed.inject(HttpTestingController)
    });

    afterEach(()=>{
        httpMock.verify()
    });

    it("Deberia hacer un llamado al endpoint Orden y devolver el resultado",()=>{
        //Arrange
        const mockOrdenResponse = {message:"Purchase Order create successfully"}
        const mockfromData = {
            paymentMethod: 'credit card'
        }

        //Act & Assert
        service.createOrder(mockfromData).subscribe(
            response =>{
                expect(response).toEqual(mockOrdenResponse)
            }
        )

        //Assert - Segundo
        const req = httpMock.expectOne('http://localhost:3000/api/purchaseorder');

        expect(req.request.method).toBe("POST");

        req.flush(mockOrdenResponse)
    })
})