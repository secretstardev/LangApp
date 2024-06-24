import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStartContainerComponent } from './training-start-container.component';

describe('TrainingStartContainerComponent', () => {
  let component: TrainingStartContainerComponent;
  let fixture: ComponentFixture<TrainingStartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TrainingStartContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingStartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
