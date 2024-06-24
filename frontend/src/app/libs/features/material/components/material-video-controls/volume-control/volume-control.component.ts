import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { Slider, SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';

@UntilDestroy()
@Component({
  selector: 'app-volume-control',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule, SliderModule, FormsModule, ButtonModule],
  templateUrl: './volume-control.component.html',
  styleUrls: ['./volume-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VolumeControlComponent implements OnInit {

  protected readonly DEFAULT_VOLUME = 100;

  @Input() set volume(value: number) {
    if (value != null) {
      this.currentVolume = value;
    }
  }

  @Output()
  volumeChanged: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('slider', { static: false })
  slider: Slider;

  @ViewChild('volumePanel', { static: false })
  volumePanel: ElementRef;

  currentVolume = this.DEFAULT_VOLUME;
  lastVolume;
  isSliderVisible = false;
  isMobile = false;

  constructor(private cdr: ChangeDetectorRef,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).pipe(untilDestroyed(this)).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.hideSlider();
      }
      this.cdr.detectChanges();
    });
  }

  volumeToggle(): void {
    if (this.currentVolume > 0) {
      this.lastVolume = this.currentVolume;
      this.currentVolume = 0;
    } else {
      this.currentVolume = this.lastVolume || this.DEFAULT_VOLUME;
    }
    this.volumeChanged.emit(this.currentVolume);
  }

  showSlider() {
    if (!this.isMobile) {
      this.renderer.addClass(this.slider.el?.nativeElement, 'show-slider');
      this.renderer.addClass(this.volumePanel?.nativeElement, 'volume-control-panel-active');
      this.isSliderVisible = true;
    }
  }

  hideSlider() {
    if (!this.slider?.dragging && this.slider && this.volumePanel) {
      this.renderer.removeClass(this.slider.el?.nativeElement, 'show-slider');
      this.renderer.removeClass(this.volumePanel?.nativeElement, 'volume-control-panel-active');
    }
    this.isSliderVisible = false;
  }

  processSlider(): void {
    !this.isSliderVisible && this.hideSlider();
  }

  onVolumeChange() {
    this.processSlider();
    this.volumeChanged.emit(this.currentVolume);
  }

  onVolumeSet() {
    this.processSlider();
    if (this.currentVolume > 0) {
      this.lastVolume = this.currentVolume;
    }
  }

  adjustVolume(event: MouseEvent): void {
    const bounds = this.volumePanel.nativeElement.getBoundingClientRect();
    const clickPosition = event.clientX - bounds.left;
    const panelWidth = bounds.width - 5;

    const newVolume = (clickPosition / panelWidth) * 100;

    this.currentVolume = newVolume;

    this.onVolumeChange();
  }
}
