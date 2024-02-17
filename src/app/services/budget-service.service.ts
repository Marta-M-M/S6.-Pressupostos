import { Injectable } from '@angular/core';
import { productsArr } from '../interface/products';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BudgetServiceService {

  //Creamos un Array principal formado por 3 elementos del tipo productsArr (producto1,p2,p3). Cada elemento será un objeto
  public fatherProductsInfoArr: productsArr[] = [
    //Objeto que contendrá el producto1 (dentro del 1er array)
    {
      id: 0, title: "Seo", description: "Programació d'una web responsive completa", price: 300, check: false, pages: 0, idioma: "spanish"
    },
    //Objeto que contendrá producto2
    {
      id: 1, title: "Ads", description: "Programació d'una web responsive completa", price: 400, check: false, pages: 0, idioma: "spanish"
    },
    //Objeto que contendrá producto3
    {
      id: 2, title: "Web", description: "Programació d'una web responsive completa", price: 500, check: false, pages: 0, idioma: "spanish"
    }
  ];

  constructor() { }

  //Método que devuelve el array fatherProductsInfoArr
  //Llamaremos a este método cuando queramos utilizar los datos en otros componentes
  getProductsInfoArr(): productsArr[] {
    return this.fatherProductsInfoArr;
  }

  //Creamos un behaviourSubject para guardar y emitir el valor de del BehaviourSubject.
  private _newValuesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public newValues$ = this._newValuesSubject.asObservable();

  get extras(): number {
    return this._newValuesSubject.value;
  }

  public calculateWebCostPagLan(numPages: number, numLanguages: number): number {
    const newValues = numPages * numLanguages * 30;
    this._newValuesSubject.next(newValues);
    return newValues;
  }
}

