import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryListFormComponent } from '../../components';
import { DictionaryListCreate } from '@app/libs/core/models';
import { DictionaryListStore } from '@app/libs/core/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { routingConfig } from '@app/libs/config';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-list-form-container',
  standalone: true,
  imports: [CommonModule, DictionaryListFormComponent],
  templateUrl: './dictionary-list-form-container.component.html',
  styleUrls: ['./dictionary-list-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListFormContainerComponent implements OnInit {
  constructor(private store: DictionaryListStore, private messageService: MessageService, private translateService: TranslateService, private router: Router) {}

  ngOnInit(): void {}

  createList(form: DictionaryListCreate) {
    // todo change form after backend changes
    this.store
      .create({ name: form.name, type: form.type } as DictionaryListCreate)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translateService.instant('NewListCreated'),
        });
        void this.router.navigateByUrl(routingConfig.dictionary.fullPath);
      });
  }
}
