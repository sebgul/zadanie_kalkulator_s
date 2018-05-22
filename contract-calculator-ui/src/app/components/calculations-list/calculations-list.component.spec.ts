import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationsListComponent } from './calculations-list.component';

describe('CalculationsListComponent', () => {
  let component: CalculationsListComponent;
  let fixture: ComponentFixture<CalculationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
