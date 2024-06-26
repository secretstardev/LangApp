import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ThemeMenuComponent } from '@app/theme/theme.menu.component';
import { ThemeMenuitemComponent } from '@app/theme/theme.menuitem.component';
import { ThemeTopbarComponent } from '@app/theme/theme.topbar.component';
import { ThemeMainComponent } from '@app/theme/theme.main.component';
import { ThemeFooterComponent } from '@app/theme/theme.footer.component';
import { ThemeBreadcrumbComponent } from '@app/theme/theme.breadcrumb.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { NotificationsComponent } from '@app/common/notifications/notifications.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageService } from 'primeng/api';
import { MenuService } from './theme.menu.service';
import { BreadcrumbModule as XngBreadcrumbModule } from 'xng-breadcrumb';
import { IconComponent } from '@app/libs/shared';
import { NavBarMobileComponent } from '@app/libs/app-components/nav-bar-mobile/nav-bar-mobile.component';
import { RolePermissionsPipe } from '@app/pipes/role-permissions.pipe';
import { NavigationTopBarComponent } from '@app/libs/features/navigation-top-bar/navigation-top-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ContextMenuModule,
        MenuModule,
        MenubarModule,
        TranslateModule,
        SharedModule,
        BreadcrumbModule,
        ScrollPanelModule,
        VirtualScrollerModule,
        MatDialogModule,
        MatSnackBarModule,
        MessagesModule,
        MessageModule,
        XngBreadcrumbModule,
        NavBarMobileComponent,
        RolePermissionsPipe,
        IconComponent,
        NavigationTopBarComponent,
        TieredMenuModule,
    ],
  declarations: [ThemeMenuComponent, ThemeMenuitemComponent, ThemeTopbarComponent, ThemeMainComponent, ThemeFooterComponent, ThemeBreadcrumbComponent, NotificationsComponent],
  exports: [
    ThemeMenuComponent,
    ThemeMenuitemComponent,
    ThemeTopbarComponent,
    ThemeMainComponent,
    ThemeFooterComponent,
    ThemeBreadcrumbComponent,
    BreadcrumbModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    MatSnackBarModule,
  ],
  providers: [MessageService, MenuService],
})
export class ThemeModule {
}
