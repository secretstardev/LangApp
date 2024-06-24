import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCompleteComponent } from './training-complete.component';

describe('TrainingCompleteComponent', () => {
  let component: TrainingCompleteComponent;
  let fixture: ComponentFixture<TrainingCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrainingCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
