import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiError } from '@app/services/api-error';
import { RestoreModes } from '@app/libs/features/signin';
import { routingConfig } from '@app/libs/config';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-restore-page',
  templateUrl: './restore-page.component.html',
  styleUrls: ['./restore-page.component.scss'],
})
export class RestorePageComponent implements OnInit {
  mode: RestoreModes = RestoreModes.MODE_REQUEST;
  errors: any[] = [];
  routeConfig = routingConfig;
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
    if (this.activatedRoute.snapshot.data.mode) {
      this.mode = activatedRoute.snapshot.data.mode;
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code']) {
        this.mode = RestoreModes.MODE_PASSWORD;
      }
    });
  }

  onSubmit(formValue) {
    this.errors = [];
    if (this.mode === RestoreModes.MODE_REQUEST) {
      this.isLoading = true;
      this.api.restorePasswordRequest(formValue).pipe(catchError(err => of(err))).subscribe((res) => {
        if (res instanceof ApiError) {
          this.mode = RestoreModes.MODE_REQUEST;
          this.errors = res.error;
        } else {
          this.mode = RestoreModes.MODE_REQUEST_SENT;
        }
        this.isLoading = false;
      });
    }

    if (this.mode === RestoreModes.MODE_PASSWORD) {
      this.activatedRoute.queryParams.subscribe(params => {
        const token = params['code'];
        this.api.changePassword({ ...formValue, token }).subscribe(() => {
          this.router.navigate([this.routeConfig.home.fullPath]);
        });
      });
    }
  }
}
