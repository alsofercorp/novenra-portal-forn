import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDataComponent } from './confirm-data.component';

describe('ConfirmDataComponent', () => {
  let component: ConfirmDataComponent;
  let fixture: ComponentFixture<ConfirmDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
