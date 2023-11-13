import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAnswerComponent } from './request-answer.component';

describe('RequestAnswerComponent', () => {
  let component: RequestAnswerComponent;
  let fixture: ComponentFixture<RequestAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
