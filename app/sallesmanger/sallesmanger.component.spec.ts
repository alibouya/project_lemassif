import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesmangerComponent } from './sallesmanger.component';

describe('SallesmangerComponent', () => {
  let component: SallesmangerComponent;
  let fixture: ComponentFixture<SallesmangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallesmangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesmangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
