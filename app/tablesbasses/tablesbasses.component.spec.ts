import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesbassesComponent } from './tablesbasses.component';

describe('TablesbassesComponent', () => {
  let component: TablesbassesComponent;
  let fixture: ComponentFixture<TablesbassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesbassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesbassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
