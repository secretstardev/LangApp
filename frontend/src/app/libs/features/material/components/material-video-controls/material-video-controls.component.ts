import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GeneralHelper, IconComponent } from '@app/libs/shared';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  VolumeControlComponent
} from '@app/libs/features/material/components/material-video-controls/volume-control/volume-control.component';
import { Slider, SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import {
  MaterialDefaults,
  Shortcut,
  SubtitleStyle
} from '@app/libs/core/models/features/materials/material-view.model';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TippyDirective } from '@ngneat/helipopper';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import {
  PlaybackControlComponent
} from '@app/libs/features/material/components/material-video-controls/playback-control/playback-control.component';
import { CONTROLS_LOCAL_STORAGE_KEYS } from '@app/libs/shared/constants/material.constants';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  MaterialShortcutsComponent
} from '@app/libs/features/material/components/material-shortcuts/material-shortcuts.component';
import { CustomDialogService } from '@app/services/custom-dialog.service';

@Component({
  selector: 'app-material-video-controls',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent,
    TranslateModule, VolumeControlComponent, SliderModule, FormsModule,
    SharedModule, OverlayPanelModule, TippyDirective, DialogModule, InputSwitchModule,
    PlaybackControlComponent],
  templateUrl: './material-video-controls.component.html',
  styleUrls: ['./material-video-controls.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialVideoControlsComponent implements OnInit {

  @Input()
  isPlaying: boolean;

  @Input() set isReady(value) {
    if (!value) {
      this._currentTime = 0;
      this.syncVideoProgress();
    }
  }

  @Input() set isEnded(ended) {
    if (ended) {
      this._currentTime = this.totalDuration;
    }
    this.syncVideoProgress();
    this._isEnded = ended;
  }

  @Input()
  totalDuration: number;

  @Input() set currentTime(value) {
    if (!this._isEnded) {
      this._currentTime = value;
      this.syncVideoProgress();
    }
  }

  @Input()
  isSeeking: boolean;

  @Input()
  speedVariants: Record<string, string>;

  @Input()
  defaults: MaterialDefaults;

  @Input()
  shortcuts: Shortcut[];

  @Input()
  fontSizes: SubtitleStyle[];

  @Output()
  repeatSentence: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  fullScreenToggle: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  goToPrevious: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  goToNext: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  togglePlay: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  progressChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  volumeChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  speedChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  repeatingUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  selectedFontChanged: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('seeker') seekerSliderComponent: Slider;

  /* internal */
  activePopoverTemplate: TemplateRef<any>;
  ref: DynamicDialogRef;

  _currentTime = 0;
  _isEnded = false;

  /* output values */
  isRepeating = false;
  currentSpeed: string;
  currentFontIndex: number;
  currentVolume: number;
  videoProgress: number;
  lastEmit = 0;
  objectKeys = GeneralHelper.objectKeys;

  constructor(private cdr: ChangeDetectorRef,
              private customDialogService: CustomDialogService,
              private translateService: TranslateService) {
  }

  @HostListener('document:keydown.space', ['$event'])
  handleSpaceShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.togglePlay.emit(!this.isPlaying);
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  handleRightArrowShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.goToNext.emit();
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  handleLeftArrowShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.goToPrevious.emit();
  }

  @HostListener('document:keydown.r', ['$event'])
  handleRepeatShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.repeatSentence.emit();
  }

  ngOnInit() {
    this.setSpeed(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.SPEED));
    this.setIsRepeating(JSON.parse(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.REPEAT)));
    this.setFontSize(JSON.parse(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.FONT)));
    this.setVolume(JSON.parse(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.VOLUME)));
  }

  getDurationSeconds(value): number {
    return Math.floor(value);
  }

  syncVideoProgress(): void {
    if (!this.seekerSliderComponent || this.seekerSliderComponent?.dragging) {
      return;
    }

    if (this.totalDuration > 0) {
      this.videoProgress = (this._currentTime / this.totalDuration) * 100;
    } else {
      this.videoProgress = 0;
    }
    this.cdr.detectChanges();
  }

  syncVideoTime(): void {
    this._currentTime = this.convertPercentageToDuration(this.videoProgress);
    this.cdr.detectChanges();
  }

  changeVideoProgress(): void {
    if (this.videoProgress === 100) {
      this._currentTime = this.getDurationSeconds(this.totalDuration);
    }
    this.videoProgress = this.seekerSliderComponent.handleValue; //need exact float value to correctly adjust handlebar
    const seekTo = this.convertPercentageToDuration(this.videoProgress);
    if (seekTo === this.lastEmit) {
      return;
    }
    this.progressChange.emit(seekTo);
    this.syncVideoTime();
    this.lastEmit = seekTo;
    this.cdr.detectChanges();
  }

  convertPercentageToDuration(percentage): number {
    return (percentage / 100) * this.totalDuration;
  }

  setSpeed(value: string): void {
    if (!value) {
      value = this.defaults.speedValue;
    }
    this.currentSpeed = Object.keys(this.speedVariants).find(key => this.speedVariants[key] === value);
    this.speedChanged.emit(value);
    localStorage.setItem(CONTROLS_LOCAL_STORAGE_KEYS.SPEED, value);
  }

  setVolume(value: number): void {
    if (value == null) {
      return;
    }
    this.currentVolume = value;
    this.volumeChanged.emit(value);
    localStorage.setItem(CONTROLS_LOCAL_STORAGE_KEYS.VOLUME, String(value));
  }

  setIsRepeating(value?: boolean): void {
    this.isRepeating = value ?? !this.isRepeating;
    this.repeatingUpdated.emit(this.isRepeating);
    localStorage.setItem(CONTROLS_LOCAL_STORAGE_KEYS.REPEAT, String(this.isRepeating));
  }

  setFontSize(index: number) {
    if (index == null) {
      return;
    }
    this.selectedFontChanged.emit(index);
    this.currentFontIndex = index;
    localStorage.setItem(CONTROLS_LOCAL_STORAGE_KEYS.FONT, index.toString());
    this.cdr.detectChanges();
  }

  resetOverlayMenuState(isVisible): void {
    if (!isVisible) {
      this.activePopoverTemplate = null;
    }
    this.cdr.detectChanges();
  }

  displayShortcuts(): void {
    this.ref = this.customDialogService.open(MaterialShortcutsComponent, {
      data: {
        title: this.translateService.instant('Shortcuts'),
        input: {
          shortcuts: this.shortcuts
        }
      },
      modal: true,
      dismissableMask: true,
      showHeader: false,
      styleClass: 'shortcut',
      width: '65vw'
    });
  }
}
