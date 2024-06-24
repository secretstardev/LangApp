import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-playback-control',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule, ButtonModule],
  templateUrl: './playback-control.component.html',
  styleUrls: ['./playback-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaybackControlComponent implements OnInit {

  @Input()
  isPlaying: boolean;

  @Output()
  goToPrevious: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  goToNext: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  togglePlay: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
