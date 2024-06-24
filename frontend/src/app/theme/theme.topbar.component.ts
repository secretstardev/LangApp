import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeMainComponent } from '@app/theme/theme.main.component';
import { SessionService } from '@app/services/session.service';
import { ApiService } from '@app/services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppComponent } from '@app/app.component';
import { MenuItem } from 'primeng/api';
import { UserService } from '@app/services/user.service';
import { Language, User } from '@app/interfaces/common.interface';
import { TranslateService } from '@ngx-translate/core';
import { HeaderVisibilityService } from '@app/libs/core/services/features/header-visibility';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, take } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { APP_LANGUAGES } from '@app/constans/app.constants';
import flagIcons from '@app/common/icons-flag';
import { IconService } from '@abhinavakhil/iconify-angular';
import {
  LanguagePickerComponent
} from '@app/libs/features/language-selector/components/language-picker/language-picker.component';

@UntilDestroy()
@Component({
  selector: 'app-topbar',
  templateUrl: './theme.topbar.component.html',
  styleUrls: ['./menu-custom.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeTopbarComponent implements OnInit, OnDestroy {
  public user: User;
  public isLoggedIn = true;
  public isVisible = true;


  model: MenuItem[];
  translateModel: MenuItem[] = [];
  isMobile = false;
  ref: DynamicDialogRef;
  languages: Language[];

  get isOpenedAdmin(): boolean {
    return this.userService.openedAdmin;
  }

  constructor(
    public appTheme: ThemeMainComponent,
    public session: SessionService,
    public api: ApiService,
    public app: AppComponent,
    private headerVisibilityService: HeaderVisibilityService,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private translate: TranslateService,
    private breakPointObserver: BreakpointObserver,
    private dialogService: CustomDialogService,
    private iconService: IconService,
  ) {
    this.headerVisibilityService.showHeader$.pipe(untilDestroyed(this))
        .subscribe((visible) => (this.isVisible = visible));
    this.iconService.registerAll(flagIcons);
  }

  ngOnInit() {
    this.model = this.getModel();
    this.api.getAllLanguage().subscribe(languages => this.languages = languages.items);

    this.userService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user != null;
      this.model = [...this.getModel()];
      this.translateModel = [...this.getTranslateModel()];
      this.cd.detectChanges();
    });

    this.translate.onLangChange.subscribe((e) => {
      this.model = [...this.getModel()];
      this.translateModel = [...this.getTranslateModel()];
      this.cd.detectChanges();
    });

    this.breakPointObserver
        .observe('(max-width: 1280px)')
        .pipe(
          map(result => result.matches),
          untilDestroyed(this))
        .subscribe(isMobile => {
          this.isMobile = isMobile;
          this.model = [...this.getModel()];
          this.cd.detectChanges();
        });
  }

  public getTranslateModel(): MenuItem[] {
    const translateModel: MenuItem[] = [];
    translateModel.push({
      label: this.translate.instant('English'),
      icon: 'icon-flag-uk h-[15px] w-[20px]',
      command: (event) => {
        this.appTheme.setLanguage('en');
      },
    });
    translateModel.push({
      label: this.translate.instant('Russian'),
      icon: 'c-icons icon-flag-rusia h-[15px] w-[20px]',
      command: (event) => {
        this.appTheme.setLanguage('ru');
      },
    });
    return translateModel;
  }

  public getModel(): MenuItem[] {
    const model: MenuItem[] = [];

    if (this.isMobile) {
      model.push(
        {
          label: this.translate.instant('Change language'),
          icon: 'translate',
          command: (event) => {
            this.openLanguageSelector();
          },
        }
      );
    }

    if (this.isLoggedIn) {
      model.push(
        {
          label: this.translate.instant('Payment'),
          routerLink: ['/payment'],
          icon: 'payment',
        },
        {
          label: this.translate.instant('Settings'),
          routerLink: ['/settings/profile'],
          icon: 'setting',
        },
        {
          label: this.translate.instant('Support.title'),
          routerLink: ['/contacts'],
          icon: '24-support',
        },
        {
          label: this.translate.instant('Affiliate program'),
          icon: 'affiliate',
        },
        {
          label: this.translate.instant('Logout'),
          icon: 'logout',
          command: (event) => {
            this.appTheme.logout();
          },
        }
      );
    } else {
      model.push(
        {
          label: this.translate.instant('Support.title'),
          routerLink: ['/contacts'],
          icon: '24-support',
        },
        {
          label: this.translate.instant('Sign up'),
          routerLink: ['/auth/signup'],
          icon: 'sign up',
        },
        {
          label: this.translate.instant('Sign in'),
          routerLink: ['/auth/signin'],
          icon: 'sign in',
        }
      );
    }

    return model;
  }

  private openLanguageSelector(): void {
    const languages = APP_LANGUAGES.map(appLang => this.languages.find(l => l.code === appLang));
    this.ref = this.dialogService.open(LanguagePickerComponent, {
      data: {
        input: {
          availableLanguages: languages,
          selectedCode: this.userService.language,
        },
        title: this.translate.instant('Change language'),
        breakpoints: { '1024px': '350px', '300px': '90vw' },
        contentPadding: '16px 0'
      },
      modal: true,
      height: 'auto',
      dismissableMask: true,
      showHeader: false,
      styleClass: 'language-picker',
    });
    this.ref.onClose.pipe(take(1), untilDestroyed(this)).subscribe((result: Language) => {
      if (result) {
        this.appTheme.setLanguage(result.code);
      }
    });
  }

  ngOnDestroy() {
  }
}
