import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WordSentenceVideoComponent } from './word-sentence-video.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivityService } from '../../services/activity.service';
import { CardsService } from '../cards/cards.service';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockApiService {}
class MockMessageService {}
class MockCardsService {
  currentCard$ = of({
    card: { title: 'Test', audioUrls: ['test.mp3'] },
    state: { isRevealed: false },
  });
  currentCardState$ = of({});
}

// Mock implementation or use spyOn to track calls
describe('WordSentenceVideoComponent', () => {
  let component: WordSentenceVideoComponent;
  let fixture: ComponentFixture<WordSentenceVideoComponent>;
  let activityService: ActivityService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WordSentenceVideoComponent],
        imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [ActivityService, { provide: ApiService, useClass: MockApiService }, { provide: MessageService, useClass: MockMessageService }, { provide: CardsService, useClass: MockCardsService }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSentenceVideoComponent);
    component = fixture.componentInstance;
    activityService = TestBed.inject(ActivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update lastUserActionTimestamp on click', fakeAsync(() => {
    spyOn(activityService, 'updateLastUserActionTimestamp');
    tick();
    fixture.detectChanges();
    const videoElement = fixture.debugElement.query(By.css('video')).nativeElement;
    videoElement.dispatchEvent(new Event('click'));
    expect(activityService.updateLastUserActionTimestamp).toHaveBeenCalled();
  }));

  it('should update lastUserActionTimestamp on scroll', fakeAsync(() => {
    spyOn(activityService, 'updateLastUserActionTimestamp');
    tick();
    fixture.detectChanges();
    const videoElement = fixture.debugElement.query(By.css('video')).nativeElement;
    videoElement.dispatchEvent(new Event('scroll'));
    expect(activityService.updateLastUserActionTimestamp).toHaveBeenCalled();
  }));

  it('should return true if user is active during video playback', () => {
    spyOn(activityService, 'isUserActive').and.returnValue(true);
    spyOn(component, 'isVideoPlaying').and.returnValue(true);
    expect(component.isUserActiveDuringVideoPlayback()).toBe(true);
  });

  it('should return true if user is inactive during video playback but the video is playing', () => {
    spyOn(activityService, 'isUserActive').and.returnValue(false);
    spyOn(component, 'isVideoPlaying').and.returnValue(true);
    expect(component.isUserActiveDuringVideoPlayback()).toBe(true);
  });

  it('should emit videoPlaybackStatusChange event when video playback status changes', () => {
    spyOn(component.videoPlaybackStatusChange, 'emit');
    component.updateVideoPlaybackStatus();
    expect(component.videoPlaybackStatusChange.emit).toHaveBeenCalled();
  });
});
