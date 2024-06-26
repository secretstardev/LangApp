import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '@app/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@app/services/session.service';
import { ApiError } from '@app/services/api-error';
import { debounceTime, take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@UntilDestroy()
@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.scss'],
})
export class AdmUsersComponent implements OnInit, OnDestroy {
  private usersSubscription: Subscription;
  private sendTimeout;
  public commentChanged: Subject<string> = new Subject<string>();
  public filterChanged: Subject<boolean> = new Subject<boolean>();
  public filterErrMsg = '';

  columns = ['id', 'name', 'company', 'telephone', 'balance', 'balancePartner', 'comment', 'edit'];
  notFilterFields = ['Comment', 'Edit'];
  usersList: any = {};
  isEmptyTable = true;
  isFilterShown = false;

  translatedKeys = {
    Id: 'Id',
    Name: 'Name',
    Company: 'Company',
    Telephone: 'Telephone',
    Balance: 'Balance',
    BalancePartner: 'BalancePartner',
    Email: 'Email',
    Comment: 'Comment',
    Edit: 'Edit',
  };

  fieldKeys: any;

  filter: any = {
    id: '',
    name: '',
    company: '',
    telephone: '',
    email: '',
    isservicepaused: '',
  };

  set rows(data: any[]) {
    this.isEmptyTable = data ? data.length === 0 : true;
    this.usersList = data;
    this.usersList.sort = this.sort;
    this.usersList.paginator = this.paginator;
  }

  @ViewChild(MatPaginator, { static: true }) paginator;
  @ViewChild(MatSort, { static: true }) sort;
  isLoaded = false;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  constructor(private ngZone: NgZone, private api: ApiService, private eventService: EventService, private ref: ChangeDetectorRef, private router: Router, public session: SessionService, private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.fieldKeys = Object.keys(this.translatedKeys);

    this.transatePage();

    this.sort.sortChange.pipe(untilDestroyed(this)).subscribe((data) => {
      this.getUsers();
    });

    this.eventService.emitter.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event.type === 'language-change') {
        this.transatePage();
      }
    });
    this.getUsers();
    this.commentChanged
      .pipe(debounceTime(1000))
      .pipe(untilDestroyed(this))
      .subscribe((comment) => {
        this.addComment(comment);
      });
    this.filterChanged
      .pipe(debounceTime(1000))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getUsers();
      });
  }

  onChangeComment(row) {
    this.commentChanged.next(row);
  }
  onChangeFilter() {
    this.filterChanged.next(true);
  }

  addComment(row) {
    const data = {
      id: row.id,
      comment: row.comment,
    };
    this.api.updateUser(data).pipe(untilDestroyed(this)).subscribe();
  }

  isFilterField(item: string): boolean {
    return this.notFilterFields.indexOf(item) < 0;
  }

  getUsers(): void {
    this.isLoaded = false;
    this.rows = [];
    const sort: any = {};
    if (this.sort.direction !== '') {
      sort[this.sort.active] = this.sort.direction;
    }
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    const toSendFilter: any = Object.assign({}, this.filter);

    const replaceKeys = { isservicepaused: 'isServicePaused' };

    Object.keys(toSendFilter).forEach((key) => {
      if (toSendFilter[key] === '') {
        delete toSendFilter[key];
      }

      if (replaceKeys[key] && toSendFilter[key]) {
        toSendFilter[replaceKeys[key]] = toSendFilter[key];
        delete toSendFilter[key];
      }
    });
    this.filterErrMsg = '';
    this.usersSubscription = this.api
      .getAdminUsers(this.paginator.pageIndex, toSendFilter, sort)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          if (!(res instanceof ApiError)) {
            this.rows = res.items;
            this.paginator.length = res._meta.totalCount;
            this.paginator.pageIndex = res._meta.currentPage - 1;
          }
          this.isLoaded = true;
        },
        (err) => {
          this.filterErrMsg = err.error['message'] || err.error[0]['message'];
          this.isLoaded = true;
        }
      );
  }

  runFilter() {
    if (this.sendTimeout) {
      clearTimeout(this.sendTimeout);
    }
    this.sendTimeout = setTimeout(() => {
      this.getUsers();
    }, 300);
  }

  transatePage() {
    this.translate
      .get(this.fieldKeys)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this.translatedKeys = Object.assign({ id: 'ID' }, res);
      });
  }

  onPageChange(event: PageEvent) {
    this.getUsers();
  }

  clearFilter() {
    Object.keys(this.filter).map((item) => {
      this.filter[item] = '';
    });
    this.runFilter();
  }
}
