import { Directive, DoCheck, ElementRef, Input, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appInvalidControl]',
  standalone: true,
})
export class InvalidControlDirective implements DoCheck {
  @Input('appInvalidControl') control: AbstractControl;
  private errorElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2, private tr: TranslateService) {}

  ngDoCheck() {
    this.checkControlState();
  }

  private checkControlState() {
    if (this.control && this.control.touched && this.control.invalid && this.control.errors) {
      if (!this.errorElement) {
        this.errorElement = this.renderer.createElement('small');
        this.renderer.addClass(this.errorElement, 'p-invalid');

        const errors = this.control.errors;
        const errorKey = Object.keys(errors)[0];
        this.tr.onLangChange.pipe(startWith(this.tr.currentLang), untilDestroyed(this)).subscribe(() => {
          const message = this.tr.instant(`validation-error.${errorKey}`);
          this.errorElement.innerText = message;
          this.renderer.appendChild(this.el.nativeElement.parentElement, this.errorElement);
        });
      }
    } else {
      if (this.errorElement) {
        this.renderer.removeChild(this.el.nativeElement.parentElement, this.errorElement);
        this.errorElement = null;
      }
    }
  }
}
