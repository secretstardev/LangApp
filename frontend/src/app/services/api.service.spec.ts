import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { APP_BASE_HREF } from '@angular/common';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, MessageService, { provide: APP_BASE_HREF, useValue: '/' }],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('addActivity', () => {
    it('should send a POST request to the /activities endpoint', () => {
      const testPayload = {
        activity_type: 'contents' as 'contents' | 'drills',
        seconds: 120,
        nonce_token: 'test-nonce-token',
      };

      service.addActivity(testPayload.activity_type, testPayload.seconds, testPayload.nonce_token).subscribe();

      const req = httpMock.expectOne(service.apiHost + '/activities');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(testPayload);
      req.flush({});
    });

    it('should handle repeated_nonce_token error as successful request', (done) => {
      const testPayload = {
        activity_type: 'contents' as 'contents' | 'drills',
        seconds: 120,
        nonce_token: 'test-nonce-token',
      };

      service.addActivity(testPayload.activity_type, testPayload.seconds, testPayload.nonce_token).subscribe({
        error: () => fail('Request should not fail'),
        complete: () => done(),
      });

      const req = httpMock.expectOne(service.apiHost + '/activities');
      req.flush(
        {
          errors: [
            {
              code: 'repeated_nonce_token',
            },
          ],
        },
        { status: 400, statusText: 'Bad Request' }
      );
    });
  });
});
