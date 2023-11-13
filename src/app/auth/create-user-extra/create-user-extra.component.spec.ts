import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserExtraComponent } from './create-user-extra.component';

describe('CreateUserExtraComponent', () => {
  let component: CreateUserExtraComponent;
  let fixture: ComponentFixture<CreateUserExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
