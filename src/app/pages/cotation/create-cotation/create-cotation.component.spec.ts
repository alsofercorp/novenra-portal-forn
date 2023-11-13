import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCotationComponent } from './create-cotation.component';

describe('CreateCotationComponent', () => {
  let component: CreateCotationComponent;
  let fixture: ComponentFixture<CreateCotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
