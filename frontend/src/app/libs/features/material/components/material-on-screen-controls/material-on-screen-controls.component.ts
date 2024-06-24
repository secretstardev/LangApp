import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PlaybackControlComponent
} from '@app/libs/features/material/components/material-video-controls/playback-control/playback-control.component';

@Component({
  selector: 'app-material-on-screen-controls',
  standalone: true,
  imports: [CommonModule, PlaybackControlComponent],
  templateUrl: './material-on-screen-controls.component.html',
  styleUrls: ['./material-on-screen-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MaterialOnScreenControlsComponent implements OnInit {
  @Input()
  isPlaying: boolean;

  @Input()
  isStarted: boolean;

  @Output()
  togglePlay: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  goToNext: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  goToPrevious: EventEmitter<boolean> = new EventEmitter<boolean>();

  isVisible = false;
  private hideControlsTimeout: any;
  private HIDE_TIMEOUT = 2500;

  @HostListener('document:click', ['$event'])
  handleUserInteraction(event: any): void {
    if (this.elRef.nativeElement.contains(event.target) && this.isStarted) {
      this.toggleControlsVisibility(!this.isVisible);
    }
  }

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.isVisible = !this.isPlaying;
  }

  private toggleControlsVisibility(visible: boolean): void {
    this.isVisible = visible;
    clearTimeout(this.hideControlsTimeout);
    if (visible) {
      this.hideControlsTimeout = setTimeout(() => {
        this.isVisible = false;
      }, this.HIDE_TIMEOUT);
    }
  }

  handleControlClick(emitter: EventEmitter<any>, value = null): void {
    if (this.isVisible) {
      value == null ? emitter.emit() : emitter.emit(value);
      this.isVisible = false;
      clearTimeout(this.hideControlsTimeout);
      this.cdr.detectChanges();
    }
  }
}
