import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCotationComponent } from './list-cotation.component';

describe('ListCotationComponent', () => {
  let component: ListCotationComponent;
  let fixture: ComponentFixture<ListCotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
