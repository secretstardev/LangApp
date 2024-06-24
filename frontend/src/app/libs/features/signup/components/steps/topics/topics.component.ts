import { Component, Input, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '@app/interfaces/common.interface';

@Component({
  selector: 'app-topics-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, SharedModule, TranslateModule, StepHeaderComponent, ReactiveFormsModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent extends BaseStepDirective {

  @Input()
  categories: Category[];

  constructor() {
    super();
  }

  trackByFn: TrackByFunction<Category> = (index, item) => item.id;

  clickedOnCategory(category: Category) {
    const categoryId = category.id;
    const selectedCategories = this.control.value;
    if (selectedCategories.indexOf(categoryId) !== -1) {
      this.control.setValue(selectedCategories.filter((c: number) => c !== categoryId));
    } else {
      this.control.setValue([...selectedCategories, categoryId]);
    }
  }

}
