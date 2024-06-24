import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTopBarComponent } from './navigation-top-bar.component';

describe('NavigationTopBarComponent', () => {
  let component: NavigationTopBarComponent;
  let fixture: ComponentFixture<NavigationTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NavigationTopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
