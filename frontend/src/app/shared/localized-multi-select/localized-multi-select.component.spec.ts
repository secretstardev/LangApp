import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizedMultiSelectComponent } from './localized-multi-select.component';

describe('LocalizedMultiSelectComponent', () => {
  let component: LocalizedMultiSelectComponent;
  let fixture: ComponentFixture<LocalizedMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizedMultiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizedMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
