import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'localized-multi-select',
  templateUrl: './localized-multi-select.component.html',
  styleUrls: ['./localized-multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizedMultiSelectComponent implements OnInit {

  @Input()
  valueField: string;

  @Input()
  displayField: string;

  @Input()
  items: any[];

  @Input()
  emptyMessage: string;

  @Input() set selectedValues(selected: any[]) {
    this._selectedValues = selected;
    this.updateLocalizedValue();
  }

  public localizedValue;
  public _selectedValues: any[];

  constructor(private translateService: TranslateService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.updateLocalizedValue();
    });
  }

  updateLocalizedValue(): void {
    this.localizedValue = this.findSelectedObjects()?.join(', ') ?? this.translateService.instant(this.emptyMessage);
    this.cdr.detectChanges();
  }

  private findSelectedObjects(): any[] {
    if (!this.valueField || !this._selectedValues || this.items === null || this._selectedValues?.length === 0) {
      return null;
    }
    const selectedObjects = [];
    let foundObject;
    for (const selectedObject of this._selectedValues) {
      foundObject = this.items.find(item => item[this.valueField] === selectedObject?.[this.valueField]);
      foundObject && selectedObjects.push(this.translateService.instant(foundObject?.[this.displayField]));
    }
    return selectedObjects;
  }

}
