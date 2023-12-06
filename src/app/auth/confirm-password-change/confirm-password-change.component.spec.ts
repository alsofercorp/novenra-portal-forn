import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordChangeComponent } from './confirm-password-change.component';

describe('ConfirmPasswordChangeComponent', () => {
  let component: ConfirmPasswordChangeComponent;
  let fixture: ComponentFixture<ConfirmPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPasswordChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
