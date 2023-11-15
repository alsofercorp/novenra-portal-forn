import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGeneralComponent } from './list-general.component';

describe('ListGeneralComponent', () => {
  let component: ListGeneralComponent;
  let fixture: ComponentFixture<ListGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
