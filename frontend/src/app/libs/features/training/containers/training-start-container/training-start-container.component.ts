import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TrainingStore } from '@app/libs/core/store';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { routingConfig } from '@app/libs/config';
import { AudioService } from '@app/libs/core/services';
import { IconComponent } from '@app/libs/shared';

@UntilDestroy()
@Component({
  selector: 'app-training-start-container',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, IconComponent],
  templateUrl: './training-start-container.component.html',
  styleUrls: ['./training-start-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingStartContainerComponent {
  constructor(public trainingStore: TrainingStore, private router: Router, private audioService: AudioService) {}

  startTraining() {
    this.audioService.prepareFromUserGesture();
    this.trainingStore
      .retrieveList()
      .pipe(
        switchMap(() => {
          this.trainingStore.nextDrill();
          return this.trainingStore.currentCard$;
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        void this.router.navigate([routingConfig.training2.start.fullPath]);
      });
  }

  optionClick() {}
}
