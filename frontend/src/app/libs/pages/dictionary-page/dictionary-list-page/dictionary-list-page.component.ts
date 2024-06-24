import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DictionaryList } from '@app/libs/core/models';
import { Router } from '@angular/router';
import { routingConfig } from '@app/libs/config';
import { dictionaryListDefaults } from '@app/libs/features/dictionary';

@Component({
  selector: 'app-dictionary-list-page',
  templateUrl: './dictionary-list-page.component.html',
  styleUrls: ['./dictionary-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListPageComponent {
  @HostBinding('class.typography') enableTypography = true;

  constructor(private router: Router) {}

  dictionaryListClick(event: DictionaryList): void {
    void this.router.navigate([routingConfig.dictionary.dictionary.fullPath, event?.id || dictionaryListDefaults.allEntities]);
  }

  toCreateList(): void {
    void this.router.navigate([routingConfig.dictionary.create.fullPath]);
  }
}
