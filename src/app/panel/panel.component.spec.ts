import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //Verificar que se inicializa correctamente el formulario y sus validaciones
  it('should initialize sonPanelForm with default values and validations', () => {
    expect(component.sonPanelForm).toBeDefined();
    expect(component.sonPanelForm.get('numPages')).toBeTruthy();
    expect(component.sonPanelForm.get('numLanguages')).toBeTruthy();
    expect(component.sonPanelForm.get('numPages')?.value).toEqual(1);
    expect(component.sonPanelForm.get('numLanguages')?.value).toEqual(1);
    expect(component.sonPanelForm.get('numPages')?.valid).toBeTruthy();
    expect(component.sonPanelForm.get('numLanguages')?.valid).toBeTruthy();
  });

  //Verificar que los valores del formulario se actualizan correctamente según el método que utilizamos
  it('should add pages when calling addPages method', () => {
    component.addPages();
    expect(component.sonPanelForm.get('numPages')?.value).toEqual(2);
  });

  it('should subtract pages when calling subsPages method', () => {
    component.subsPages();
    expect(component.sonPanelForm.get('numPages')?.value).toEqual(1);
  });

  it('should add languages when calling addLangs method', () => {
    component.addLangs();
    expect(component.sonPanelForm.get('numLanguages')?.value).toEqual(2);
  });

  it('should subtract languages when calling subsLangs method', () => {
    component.subsLangs();
    expect(component.sonPanelForm.get('numLanguages')?.value).toEqual(1);
  });

});
