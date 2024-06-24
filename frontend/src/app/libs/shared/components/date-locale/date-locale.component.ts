import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';
import { DateFormat } from '@app/libs/config';

@Component({
  selector: 'app-date-locale',
  templateUrl: './date-locale.component.html',
  styleUrls: ['./date-locale.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class DateLocaleComponent {
  @Input() date?: Date | string;
  @Input() format?: DateFormat = 'd MMM y';

  lang$ = this.translate.onLangChange.pipe(
    map((val) => val.lang),
    startWith(this.translate.currentLang)
  );

  constructor(private translate: TranslateService) {}
}
