import { Component, OnInit, } from '@angular/core';
import { BudgetServiceService } from '../services/budget-service.service';
import { productsArr } from '../interface/products';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PanelComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public products: productsArr[] = this.budgetValues.fatherProductsInfoArr;
  public finalBudget: number = 0;

  public checkBoxHomeForm: FormGroup = this.formBuilder.group({
    box1: [false],
    box2: [false],
    box3: [false],
  });

  constructor(
    public formBuilder: FormBuilder,
    public budgetValues: BudgetServiceService
  ) { }

  //Recogemos el valor emitido en PanelComponent de newValues
  onBudgetChange(newValues: number) {
    console.log('Valor enviado de newValues del PanelComponent', newValues)
  }

  //Si en el checkbox hay cambios (check o nºpag/idiomas) llama a updatePrice
  ngOnInit(): void {
    //Suscripción en la que cada vez que se produce cambio en el formulario llamamos a updatePrice para actualizar el precio final
    this.checkBoxHomeForm.valueChanges.subscribe(() => {
      this.updatePrice();
      console.log(this.finalBudget, "precio update solo del checkbox")
    });
    //Nueva suscripción al observable newValues$. Si hay nuevos valores en este, llamamos a updatePrice pasando estos valores como argumento.
    this.budgetValues.newValues$.subscribe((newValues) => {
      console.log("Valor newValues", newValues)
      this.updatePrice(newValues);
    });

    this.updatePrice();
  }

  public updatePrice(newValues = 0): void {
    let finalBudget = 0;

    if (this.checkBoxHomeForm.get('box1')?.value) {
      finalBudget += this.products[0].price;
    }

    if (this.checkBoxHomeForm.get('box2')?.value) {
      finalBudget += this.products[1].price;
    }

    if (this.checkBoxHomeForm.get('box3')?.value) {
      finalBudget += this.products[2].price + 30

      if (newValues > 0) {     //No funciona!
        finalBudget += newValues - 30;
        console.log(finalBudget, "Finalbudget")
      }
    }

    this.finalBudget = finalBudget;
  }

}




