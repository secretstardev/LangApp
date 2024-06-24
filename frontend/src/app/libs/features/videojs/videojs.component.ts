import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import videojs, { VideoJsPlayerOptions } from 'video.js';
import 'videojs-youtube';
import { VideoPlaybackService } from '@app/services/video-playback.service';
import { ActivityService } from '@app/services/activity.service';

@Component({
  standalone: true,
  selector: 'app-videojs',
  templateUrl: './videojs.component.html',
  styleUrls: ['./videojs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideojsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('target', { static: true }) target: ElementRef;
  @Input() options: VideoJsPlayerOptions;
  @Output() playerAvailable = new EventEmitter<boolean>();
  @Output() videoPlaybackStatusChange = new EventEmitter<boolean>();
  player: videojs.Player;

  constructor(private videoPlaybackService: VideoPlaybackService,
              private activityService: ActivityService) {
  }

  ngOnInit() {
  }

  initPlayer() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
    const targetEl = <HTMLElement>this.target.nativeElement;
    targetEl.insertAdjacentHTML('beforebegin',
      '<video class="video-js vjs-theme-forest vjs-fill vjs-fluid" controls playsinline preload="none"></video>');
    const videoEl = targetEl.parentNode.querySelector('video');
    this.player = videojs(videoEl, this.options, function onPlayerReady() {
      (window as any).player = this;
    });
    this.player.ready(() => {
      this.playerAvailable.emit(true);
    });

    // Add event listeners for user interactions
    this.player.on('click', () => {
      this.videoPlaybackService.updateVideoPlaybackStatus(this.isVideoPlaying());
    });

    this.player.on('scroll', () => {
      this.videoPlaybackService.updateVideoPlaybackStatus(this.isVideoPlaying());
    });

    this.player.on('play', () => {
      this.updateVideoPlaybackStatus();
    });

    this.player.on('timeupdate', () => {
      this.updateVideoPlaybackStatus();
    });

    this.player.on('pause', () => {
      this.updateVideoPlaybackStatus();
    });

    this.player.fill(true);
  }

  ngAfterViewInit() {
  }

  ngOnChanges() {
    this.initPlayer();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  public isVideoPlaying(): boolean {
    return this.player && !this.player.paused();
  }

  isUserActiveDuringVideoPlayback(): boolean {
    return this.videoPlaybackService.isUserActiveDuringVideoPlayback(this.activityService.isUserActive(),
      this.isVideoPlaying());
  }

  updateVideoPlaybackStatus(): void {
    const isVideoPlaying = this.isVideoPlaying();
    this.videoPlaybackStatusChange.emit(isVideoPlaying);
    this.videoPlaybackService.updateVideoPlaybackStatus(isVideoPlaying);
  }
}
