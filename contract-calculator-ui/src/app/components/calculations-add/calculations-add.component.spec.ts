import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationsAddComponent } from './calculations-add.component';

describe('CalculationsAddComponent', () => {
  let component: CalculationsAddComponent;
  let fixture: ComponentFixture<CalculationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
