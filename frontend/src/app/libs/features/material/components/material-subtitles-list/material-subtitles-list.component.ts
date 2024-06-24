import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { SelectedSubtitle, Subtitle } from '@app/libs/core/models/features/materials/material-view.model';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-material-subtitles-list',
  standalone: true,
  imports: [CommonModule, IconComponent, SharedModule],
  templateUrl: './material-subtitles-list.component.html',
  styleUrls: ['./material-subtitles-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialSubtitlesListComponent implements OnInit {

  @Input()
  isFullScreen: boolean;

  @Input()
  isPlaying: boolean;

  @Input() set subtitles(value: Subtitle[]) {
    this._subtitles = value;
    if (this.subtitleList?.nativeElement) {
      this.subtitleList.nativeElement.scrollTop = 0;
    }
  }

  @Input() set selectedIndexes(value) {
    this.currentSubtitleIndexes = value;
    if (this.currentSubtitleIndexes.length > 0) {
      const subtitle = document.getElementById(
        `sub${this.currentSubtitleIndexes[this.currentSubtitleIndexes.length - 1]}`);
      if (subtitle && this.subtitleList) {
        this.scrollParentToChild(this.subtitleList.nativeElement, subtitle);
      }
    }
  }

  @Output()
  selectedSubtitle: EventEmitter<SelectedSubtitle> = new EventEmitter<SelectedSubtitle>();

  @Output()
  pauseSubtitle: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('subtitleList') subtitleList: ElementRef;

  currentSubtitleIndexes: number[];
  _subtitles: Subtitle[];

  constructor() {
  }

  ngOnInit(): void {
  }

  scrollParentToChild(parent: HTMLElement, child: HTMLElement) {
    const parentRect = parent.getBoundingClientRect();
    const prevChildRect = (child.previousElementSibling || child).getBoundingClientRect();
    const nextChildRect = (child.nextElementSibling || child).getBoundingClientRect();
    const isViewable = prevChildRect.top >= parentRect.top && nextChildRect.bottom <= parentRect.top + parent.clientHeight;

    if (!isViewable) {
      const scrollTop = prevChildRect.top - parentRect.top;
      const scrollBot = nextChildRect.bottom - parentRect.bottom;
      if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
        parent.scrollTop += scrollTop;
      } else {
        parent.scrollTop += scrollBot;
      }
    }
  }

  selectSubtitle(subtitle: Subtitle, index: number): void {
    this.selectedSubtitle.emit({ subtitle, index });
  }
}
