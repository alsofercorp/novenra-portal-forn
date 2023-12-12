import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoventaLoaderComponent } from './noventa-loader.component';

describe('NoventaLoaderComponent', () => {
  let component: NoventaLoaderComponent;
  let fixture: ComponentFixture<NoventaLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoventaLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoventaLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
