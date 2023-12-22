import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCotationComponent } from './detail-cotation.component';

describe('DetailCotationComponent', () => {
  let component: DetailCotationComponent;
  let fixture: ComponentFixture<DetailCotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.detailComponent(DetailCotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should detail', () => {
    expect(component).toBeTruthy();
  });
});
