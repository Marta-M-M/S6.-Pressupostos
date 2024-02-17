import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { BudgetServiceService } from '../services/budget-service.service';
import { ModalComponent } from '../shared/modal/modal.component';
@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalComponent,],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {

  @Output() budgetOncheck: EventEmitter<number> = new EventEmitter();

  //Declaramos el sonPanelForm e inicializamos con un nuevo formGroup vacío
  // El sonPanelForm lo llenamos con formBuilder que contendrá 2 propiedades numPag y NumLang
  public sonPanelForm: FormGroup = this.formBuilder.group({
    numPages: [1, [Validators.required, Validators.min(1)]],
    numLanguages: [1, [Validators.required, Validators.min(1)]],
  })

  constructor(
    public formBuilder: FormBuilder,
    public budgetService: BudgetServiceService,
  ) { };

  ngOnInit(): void {

    //Aqui obtendremos el valor de las propiedades del formulario que hemos creado antes mediante get
    //Cada vez que cambia un valor en el sonPanelForm se ejecuta la función dentro de suscribe que cambiará los valores
    this.sonPanelForm.valueChanges.subscribe(() => {
      const numPages = this.sonPanelForm.get('numPages')?.value;
      const numLanguages = this.sonPanelForm.get('numLanguages')?.value;
      console.log(numPages, numLanguages)

      if (this.sonPanelForm.valid) {
        const newValues = this.budgetService.calculateWebCostPagLan(numPages, numLanguages);
        this.budgetOncheck.emit(newValues);
        console.log(newValues, "newValues panel 41")
      }
    })

  }

  public addPages(): void {
    const numPages = this.sonPanelForm.get('numPages');
    if (numPages) {
      const currentNum = numPages.value || 1
      numPages.setValue(currentNum + 1);
    }
  }

  public subsPages(): void {
    const numPages = this.sonPanelForm.get('numPages');
    if (numPages) {
      const currentNum = numPages.value || 1;
      if (currentNum !== 1) {
        numPages.setValue(currentNum - 1);
      }
    }
  }

  public addLangs(): void {
    const numLanguages = this.sonPanelForm.get('numLanguages');
    if (numLanguages) {
      const currentNum = numLanguages.value || 1
      numLanguages.setValue(currentNum + 1);
    }
  }

  public subsLangs(): void {
    const numLanguages = this.sonPanelForm.get('numLanguages');
    if (numLanguages) {
      const currentNum = numLanguages.value || 1;
      if (currentNum !== 1) {
        numLanguages.setValue(currentNum - 1);
      }
    }
  }

}
