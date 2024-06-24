import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditMaterialsPageComponent } from '@app/libs/pages/content/components/edit-materials-page/edit-materials-page.component';

describe('EditMaterialsComponent', () => {
  let component: EditMaterialsPageComponent;
  let fixture: ComponentFixture<EditMaterialsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMaterialsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaterialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
