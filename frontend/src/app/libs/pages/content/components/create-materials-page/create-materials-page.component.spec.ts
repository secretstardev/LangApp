import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateMaterialsPageComponent } from '@app/libs/pages/content/components/create-materials-page/create-materials-page.component';

describe('CreateMaterialsComponent', () => {
  let component: CreateMaterialsPageComponent;
  let fixture: ComponentFixture<CreateMaterialsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMaterialsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaterialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
