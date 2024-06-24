import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { VideojsComponent } from '@app/libs/features/videojs';
import { MaterialViewConfigModel, Subtitle } from '@app/libs/core/models/features/materials/material-view.model';
import { WebVTTParser } from 'webvtt-parser';
import sortBy from 'lodash/sortBy';
import { MaterialViewConfig } from '@app/libs/features/material/components/material-view/material-view.config';
import { VideoJsPlayerOptions } from 'video.js';
import { IconComponent } from '@app/libs/shared';
import { MaterialSubtitlesListComponent } from '@app/libs/features/material/components';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  MaterialVideoControlsComponent
} from '@app/libs/features/material/components/material-video-controls/material-video-controls.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  MaterialOnScreenControlsComponent
} from '@app/libs/features/material/components/material-on-screen-controls/material-on-screen-controls.component';
import { CONTROLS_LOCAL_STORAGE_KEYS } from '@app/libs/shared/constants/material.constants';
import { MaterialVideoParameters } from '@app/libs/features/material/components/material-video/material-video.model';
import { SharedModule } from '@app/shared/shared.module';
import { ContentStudied } from '@app/libs/core/models';

@UntilDestroy()
@Component({
  selector: 'app-material-video',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    IconModule,
    InputSwitchModule,
    OverlayPanelModule,
    TableModule,
    TranslateModule,
    VideojsComponent,
    IconComponent,
    MaterialSubtitlesListComponent,
    MaterialVideoControlsComponent,
    MaterialOnScreenControlsComponent,
    SharedModule,
  ],
  templateUrl: './material-video.component.html',
  styleUrls: ['./material-video.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialVideoComponent implements AfterViewInit {
  @Input() set rawText(text: string) {
    const parser = new WebVTTParser();
    const parseResult = parser.parse(text);
    this.subtitles = sortBy(parseResult.cues, ['startTime']).filter((t) => {
      t.text = t.text.replace(/<\/?[^>]+>/g, '').trim();
      return t.text !== '';
    });
  }

  @Input() set sourceLink(link: string) {
    this.saveVideoParameters();
    this.setDefaultValues();
    this.isReady = false;
    this.videoOptions = this.getVideoOptions(link);
  }

  @Input() set isStudied(value: ContentStudied) {
    if (value) {
      this.trackingStatus = value;
    }
  }

  @Output()
  materialStudied: EventEmitter<ContentStudied> = new EventEmitter<ContentStudied>();

  @ViewChild(VideojsComponent)
  video: VideojsComponent;

  @ViewChild('subtitleWindow')
  subtitleWindow: ElementRef;

  @ViewChild('subtitleList')
  subtitleList: ElementRef;

  config: MaterialViewConfigModel = MaterialViewConfig;

  subtitles: Subtitle[];
  selectedSubtitles: Subtitle[];
  selectedSubtitleIndexes = [];

  currentSubtitleStyleIndex: number = this.config.defaults.styleIndex;
  currentSubtitleStyle: Record<string, string> = this.config.subtitleStyles[this.currentSubtitleStyleIndex].style;

  videoPlayerParameters: MaterialVideoParameters;
  currentTime = 0;
  isFullScreen = false;
  isMobile = false;
  isVideoPlaying = false;
  isVideoEnded = false;
  isSeeking = false;
  isReady = false;
  videoOptions: VideoJsPlayerOptions;

  // watch time tracking
  watchedTime = 0;
  previousTime = 0;
  trackingStatus: ContentStudied = ContentStudied.not_started;

  // hover logic
  isPausedOnSubtitlesHover = false;
  isSubtitleHovered = false;

  constructor(private cdr: ChangeDetectorRef, private breakPointObserver: BreakpointObserver) {
  }

  ngAfterViewInit(): void {
    this.updateSubtitleWindowSize();
    addEventListener('fullscreenchange', () => {
      this.isFullScreen = !!document.fullscreenElement;
      this.cdr.detectChanges();
    });

    this.breakPointObserver
        .observe(['(max-width: 768px)'])
        .pipe(untilDestroyed(this))
        .subscribe((result) => {
          this.isMobile = result.matches;
          if (result.matches) {
            this.currentSubtitleStyle = this.config.subtitleStyles[this.currentSubtitleStyleIndex].mobileStyle;
          } else {
            this.currentSubtitleStyle = this.config.subtitleStyles[this.currentSubtitleStyleIndex].style;
          }
          this.updateSubtitleWindowSize();
          this.cdr.detectChanges();
        });
  }

  updateSubtitleWindowSize(): void {
    if (this.subtitleWindow) {
      const lineHeight = parseInt(
        window.getComputedStyle(this.subtitleWindow.nativeElement).getPropertyValue('line-height'));
      this.subtitleWindow.nativeElement.style.height = `${lineHeight * 3}px`;
      this.cdr.detectChanges();
    }
  }

  private getVideoOptions(sourceLink: string): VideoJsPlayerOptions {
    return {
      techOrder: ['youtube'],
      sources: [
        {
          type: 'video/youtube',
          src: sourceLink,
        },
      ],
      preload: 'auto',
      controls: false,
      autoplay: false,
      fill: true,
      // @ts-ignore
      youtube: {
        iv_load_policy: 3,
        cc_load_policy: 3,
        hl: 'ja',
      },
    };
  }

  playerAvailable() {
    this.isReady = true;
    this.initPlayer();
  }

  initPlayer() {
    this.video.player.on('play', () => {
      if (!this.isVideoEnded) {
        this.isVideoPlaying = !this.video.player.paused();
        this.isPausedOnSubtitlesHover = false;
        this.cdr.detectChanges();
      }
    });

    this.video.player.on('pause', () => {
      this.isVideoPlaying = !this.video.player.paused();
      this.cdr.detectChanges();
    });

    this.video.player.on('loadedmetadata', () => {
      if (this.isVideoPlaying) {
        this.play();
      }
      this.cdr.detectChanges();
    });

    this.video.player.on('timeupdate', () => {
      !this.isSeeking && !this.isVideoEnded && this.timeUpdate();
    });

    this.video.player.on('seeking', () => {
      this.isSeeking = true;
      this.cdr.detectChanges();
    });

    this.video.player.on('seeked', () => {
      this.isSeeking = false;
      this.previousTime = this.currentTime;
      this.updateSelectedSubIndexes(true);
      this.cdr.detectChanges();
    });
    this.video.player.on('ended', () => {
      // wa for video.js not being able to set correct end timings
      if (!this.isVideoEnded && !JSON.parse(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.REPEAT))) {
        this.video.player.currentTime(this.video.player.duration());
      }
      this.video.player.removeClass('vjs-seeking');

      this.videoEndedHandler();
    });

    this.loadVideoParameters();
  }

  setDefaultValues(): void {
    this.isVideoEnded = false;
    this.isVideoPlaying = false;
    this.isSeeking = false;

    this.watchedTime = 0;
    this.previousTime = 0;

    this.isReady = false;
    this.trackingStatus = ContentStudied.not_started;
  }

  saveVideoParameters(): void {
    if (this.video?.player) {
      this.videoPlayerParameters = {
        volume: this.video.player.volume(),
        speed: this.video.player.playbackRate(),
      };
    }
  }

  loadVideoParameters(): void {
    if (this.videoPlayerParameters && this.video?.player) {
      this.video.player.volume(this.videoPlayerParameters.volume);
      this.video.player.playbackRate(this.videoPlayerParameters.speed);
    }
  }

  videoEndedHandler() {
    this.pause();
    this.selectedSubtitles = [];
    this.selectedSubtitleIndexes = [];
    this.isVideoEnded = true;
    this.watchedTime = 0;
    this.currentTime = 0;
    this.previousTime = 0;
    this.isVideoPlaying = false;
    this.cdr.detectChanges();

    if (JSON.parse(localStorage.getItem(CONTROLS_LOCAL_STORAGE_KEYS.REPEAT))) {
      this.play();
    }
  }

  play() {
    if (this.isVideoEnded) {
      this.isVideoEnded = false;
      this.isSeeking = true;
      this.video.player.currentTime(0);
    }
    this.isVideoPlaying = true;
    this.video.player.play();
    this.cdr.detectChanges();
  }

  pause() {
    this.isVideoPlaying = false;
    this.video.player.pause();
    this.cdr.detectChanges();
  }

  timeUpdate() {
    this.currentTime = this.video.player.currentTime();
    this.updateTrackTime();
    this.updateSelectedSubIndexes();
    this.cdr.detectChanges();
  }

  updateTrackTime(): void {
    this.watchedTime += this.currentTime - this.previousTime;
    this.previousTime = this.currentTime;
    if (this.trackingStatus !== ContentStudied.finished) {
      this.checkWatchTimeThreshold();
    }
  }

  checkWatchTimeThreshold(): void {
    if (!this.video?.player) return;

    const watchTimePercentage = (this.watchedTime / this.video.player.duration()) * 100;
    const progressPercentage = (this.currentTime / this.video.player.duration()) * 100;

    if (watchTimePercentage > this.config.tracker.finished.minWatchTime && progressPercentage > this.config.tracker.finished.minVideoProgress) {
      this.trackingStatus = ContentStudied.finished;
      this.materialStudied.emit(ContentStudied.finished);
    } else if (this.trackingStatus === ContentStudied.not_started && this.watchedTime >= this.config.tracker.started.minWatchTimeSeconds) {
      this.trackingStatus = ContentStudied.studying;
      this.materialStudied.emit(ContentStudied.studying);
    }
  }

  updateSelectedSubIndexes(test = false): void {
    const newSelectedSubtitles = [];
    const newSelectedIndexes = [];
    let closest = {
      index: 0,
      subtitle: this.subtitles[0],
    };

    for (const [i, sub] of this.subtitles.entries()) {
      if (this.currentTime >= sub.startTime) {
        closest = {
          index: i,
          subtitle: sub,
        };
      }
      if (this.currentTime >= sub.startTime && this.currentTime < sub.endTime) {
        newSelectedSubtitles.push(sub);
        newSelectedIndexes.push(i);
      }
    }
    if (newSelectedIndexes.length > 0 && newSelectedIndexes.join(',') !== this.selectedSubtitleIndexes.join(',')) {
      if (newSelectedIndexes.length > 3) {
        this.currentSubtitleStyle = this.config.subtitleStyles[4].style;
      }

      this.selectedSubtitles = newSelectedSubtitles;
      this.selectedSubtitleIndexes = newSelectedIndexes;
    } else if (test) {
      this.selectedSubtitles = [closest.subtitle];
      this.selectedSubtitleIndexes = [closest.index];
    }
  }

  setFontSize(index: number): void {
    this.currentSubtitleStyle = this.config.subtitleStyles[index].style;
    this.currentSubtitleStyleIndex = index;
    this.cdr.detectChanges();
    this.updateSubtitleWindowSize();
  }

  subtitleMouseover() {
    this.isSubtitleHovered = true;
    this.checkPauseOnHover();
  }

  subtitleMouseout() {
    this.isSubtitleHovered = false;
    this.checkPauseOnHover();
  }

  volumeChange(volume): void {
    this.videoPlayerParameters = { ...this.videoPlayerParameters, volume };
    this.video?.player.volume(volume / 100);
  }

  checkPauseOnHover(skipTimeout = false) {
    if (this.isPausedOnSubtitlesHover) {
      if (!this.isSubtitleHovered) {
        if (skipTimeout) {
          this.isPausedOnSubtitlesHover = false;
          this.video.player.play();
        } else {
          setTimeout(() => {
            this.checkPauseOnHover(true);
          }, 150);
        }
      }
    } else if (this.isVideoPlaying && this.isSubtitleHovered) {
      this.isPausedOnSubtitlesHover = true;
      this.video.player.pause();
    }
  }

  setVideoSpeed(speed: string) {
    this.videoPlayerParameters = { ...this.videoPlayerParameters, speed: +speed };
    this.video?.player.playbackRate(+speed);
  }

  updateVideoProgress(progress: number): void {
    //prevent unnecessary play on seeking
    if (!this.isVideoPlaying || progress === this.video.player.duration()) {
      this.video.player.pause();
    }

    if (this.isVideoEnded && progress !== this.video.player.duration()) {
      this.isVideoEnded = false;
    }

    this.isSeeking = true;
    this.currentTime = progress; //experimental
    this.video.player.currentTime(progress);
    this.cdr.detectChanges();
  }

  repeatSubtitle() {
    if (this.selectedSubtitles?.length > 0 && this.selectedSubtitles[this.selectedSubtitles.length - 1]) {
      this.playSubtitle(this.selectedSubtitles[this.selectedSubtitles.length - 1].startTime,
        this.video.player.paused());
    }
  }

  fullScreen() {
    const subControls = document.getElementById('subControls');
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      document.exitFullscreen();
    } else {
      subControls.requestFullscreen();
    }
  }

  selectSubtitle(subtitle: Subtitle, index: number) {
    if (!subtitle) {
      return;
    }

    this.isSeeking = true;
    this.selectedSubtitles = [subtitle];
    this.selectedSubtitleIndexes = [index];
    this.playSubtitle(subtitle.startTime);
    this.cdr.detectChanges();
  }

  previousSubtitle() {
    if (this.selectedSubtitleIndexes.indexOf(0) !== -1) {
      return;
    }
    if (!this.selectedSubtitleIndexes?.length) {
      if (this.isVideoEnded || this.currentTime === 0) {
        this.selectSubtitle(this.subtitles[0], 0);
        return;
      } else {
        this.selectedSubtitleIndexes = [0];
      }
    }

    let prevIndex = this.selectedSubtitleIndexes[0] - 1;
    const curIndex = this.selectedSubtitleIndexes[this.selectedSubtitleIndexes.length - 1];
    if (this.subtitles[curIndex].startTime > this.currentTime || this.subtitles[curIndex].endTime < this.currentTime) {
      this.updateSelectedSubIndexes(true);
      prevIndex = this.selectedSubtitleIndexes[0] - 1;
    }
    this.selectSubtitle(this.subtitles[prevIndex], prevIndex);
  }

  nextSubtitle() {
    if (this.selectedSubtitleIndexes.indexOf(this.subtitles.length - 1) !== -1) {
      return;
    }
    if (!this.selectedSubtitleIndexes?.length) {
      if (this.isVideoEnded) {
        this.selectSubtitle(this.subtitles[0], 0);
        return;
      } else {
        this.selectedSubtitleIndexes = [0];
      }
    }

    let nextIndex = this.selectedSubtitleIndexes[this.selectedSubtitleIndexes.length - 1] + 1;
    const curIndex = this.selectedSubtitleIndexes[this.selectedSubtitleIndexes.length - 1];
    if (this.subtitles[curIndex].startTime > this.currentTime || this.subtitles[curIndex].endTime < this.currentTime) {
      this.updateSelectedSubIndexes(true);
      nextIndex = this.selectedSubtitleIndexes[this.selectedSubtitleIndexes.length - 1] + 1;
    }

    this.selectSubtitle(this.subtitles[nextIndex], nextIndex);
  }

  playSubtitle(startTime: number, isPaused: boolean = false) {
    this.currentTime = startTime;
    this.video.player.currentTime(startTime);
    this.play();
    if (isPaused) {
      setTimeout(() => {
          this.video.player.pause();
        },
        (this.selectedSubtitles[this.selectedSubtitles.length - 1].endTime - this.selectedSubtitles[this.selectedSubtitles.length - 1].startTime) * 1000);
    }
  }
}
