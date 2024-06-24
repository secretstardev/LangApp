import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TrainingQuestionCard } from '@app/interfaces/common.interface';
import { CardsService, CurrentCardState } from '@app/training/cards/cards.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { AudioService } from '@app/libs/core/services';
import { ActivityService } from '../../services/activity.service';
import { VideoPlaybackService } from '../../services/video-playback.service';

@UntilDestroy()
@Component({
  selector: 'app-word-sentence-video',
  templateUrl: './word-sentence-video.component.html',
  styleUrls: ['./word-sentence-video.component.scss', '../drills-common-styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export class WordSentenceVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', { static: false, read: ElementRef }) videoElement: ElementRef<HTMLVideoElement>;
  @Output() videoPlaybackStatusChange = new EventEmitter<boolean>();

  private activitySubscription: Subscription;

  card: TrainingQuestionCard;
  state: CurrentCardState;

  constructor(
    public cardsService: CardsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    public audioService: AudioService,
    private activityService: ActivityService,
    private videoPlaybackService: VideoPlaybackService
  ) {}

  ngOnInit(): void {
    this.getTrainingDetails();
  }

  ngAfterViewInit(): void {
    debugger;
    this.activitySubscription = new Subscription();

    const clickListener = () => {
      this.activityService.updateLastUserActionTimestamp();
    };

    const scrollListener = () => {
      this.activityService.updateLastUserActionTimestamp();
    };

    if (this.videoElement) {
      this.videoElement.nativeElement.addEventListener('click', clickListener);
      this.videoElement.nativeElement.addEventListener('scroll', scrollListener);

      this.activitySubscription.add({ unsubscribe: () => this.videoElement.nativeElement.removeEventListener('click', clickListener) });
      this.activitySubscription.add({ unsubscribe: () => this.videoElement.nativeElement.removeEventListener('scroll', scrollListener) });
    } else {
      console.error('videoElement is undefined during ngAfterViewInit');
    }
  }

  ngOnDestroy(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

  initCard() {
    this.audioService.play(this.card?.audioUrls?.[0]);
  }

  get isWideScreen() {
    return window.innerWidth > 768;
  }

  checkAnswer(index: number) {
    if (!this.state.isAnswered) {
      if ('answers' in this.card?.question) {
        this.state.isAnswered = true;
        this.state.answeredIndex = index;
        this.state.isAnsweredCorrectly = this.card.question?.answers[index - 1].isCorrectAnswer;
        this.audioService.play(this.card?.audioUrls?.[0]);
        this.cardsService.answerCard(this.state.isAnsweredCorrectly);
      }
    } else {
      this.continueTraining();
    }
  }

  forgotAnswer() {
    this.state.isAnswered = true;
    this.state.isAnsweredCorrectly = false;
    this.audioService.play(this.card?.audioUrls?.[0]);
    this.cardsService.answerCard(this.state.isAnsweredCorrectly);
  }

  continueTraining() {
    this.cardsService.navigateToNextCard();
  }

  goToInfoCard(route: string) {
    const [card, id] = route.split('_');
    this.router.navigate(['training', card === 'wordInfo' ? 'word-info' : 'kanji-info', id]);
  }

  getTrainingDetails() {
    this.cardsService.currentCardState$.pipe(untilDestroyed(this)).subscribe((state) => {
      this.state = state;
      this.card = <TrainingQuestionCard>state.card;
      this.initCard();
      this.cd.markForCheck();
    });
  }

  public isVideoPlaying(): boolean {
    return !this.videoElement.nativeElement.paused;
  }
  isUserActiveDuringVideoPlayback(): boolean {
    return this.videoPlaybackService.isUserActiveDuringVideoPlayback(this.activityService.isUserActive(), this.isVideoPlaying());
  }

  updateVideoPlaybackStatus(): void {
    const isVideoPlaying = this.isVideoPlaying();
    this.videoPlaybackStatusChange.emit(isVideoPlaying);
    this.videoPlaybackService.updateVideoPlaybackStatus(isVideoPlaying);
  }
}
