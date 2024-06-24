import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideojsComponent } from './videojs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivityService } from '../../../services/activity.service';

describe('VideojsComponent', () => {
  let component: VideojsComponent;
  let fixture: ComponentFixture<VideojsComponent>;
  let activityService: ActivityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideojsComponent],
      imports: [HttpClientTestingModule],
      providers: [ActivityService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideojsComponent);
    component = fixture.componentInstance;
    activityService = TestBed.inject(ActivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update lastUserActionTimestamp on click', (done) => {
    spyOn(activityService, 'updateLastUserActionTimestamp');
    component.playerAvailable.subscribe(() => {
      component.player.trigger('click');
      expect(activityService.updateLastUserActionTimestamp).toHaveBeenCalled();
      done();
    });
  });

  it('should update lastUserActionTimestamp on scroll', (done) => {
    spyOn(activityService, 'updateLastUserActionTimestamp');
    component.playerAvailable.subscribe(() => {
      component.player.trigger('scroll');
      expect(activityService.updateLastUserActionTimestamp).toHaveBeenCalled();
      done();
    });
  });

  it('should return true if user is active during video playback', () => {
    spyOn(activityService, 'isUserActive').and.returnValue(true);
    spyOn(component, 'isVideoPlaying').and.returnValue(false);
    expect(component.isUserActiveDuringVideoPlayback()).toBe(true);
  });

  it('should return false if user is inactive during video playback', () => {
    spyOn(activityService, 'isUserActive').and.returnValue(false);
    spyOn(component, 'isVideoPlaying').and.returnValue(false);
    expect(component.isUserActiveDuringVideoPlayback()).toBe(false);
  });

  it('should emit videoPlaybackStatusChange event when video playback status changes', () => {
    spyOn(component.videoPlaybackStatusChange, 'emit');
    component.updateVideoPlaybackStatus();
    expect(component.videoPlaybackStatusChange.emit).toHaveBeenCalled();
  });
});
