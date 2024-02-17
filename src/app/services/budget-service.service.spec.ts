import { TestBed } from '@angular/core/testing';

import { BudgetServiceService } from './budget-service.service';

describe('BudgetServiceService', () => {
  let service: BudgetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //porque al verificar que debe ser un array el fatherProductsInfoArr no lo utiliza y utiliza esto getProductsInfoArr?
  it('should return array of products', () => {
    const products = service.getProductsInfoArr();
    expect(Array.isArray(products)).toBeTruthy();
    //El array constará de una longitud de 3
    expect(products.length).toEqual(3);
    //Comprovar que los id de los productos coinciden
    expect(products[0].id).toEqual(0);
    expect(products[1].id).toEqual(1);
    expect(products[2].id).toEqual(2);
  });

  it('calculateWebCostPagLan should be a function', () => {
    expect(typeof service.calculateWebCostPagLan).toBe('function');
  });

  it('calculateWebCostPagLan should return a number', () => {
    const numberResult = service.calculateWebCostPagLan(2, 4);
    expect(typeof numberResult).toBe('number');
  });

  //añadir algun test unitario más

});
