/*
 *  @file payments-table.module.ts
 *  @author shrewmus (contact@shrewmus.name, shrewmus@gmail.com)
 *  Date: 5/4/2019
 *  (c): 2019
 */

import { NgModule } from '@angular/core';
import { PaymentsTableComponent } from '@app/common/payments-table/payments-table.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { TablePaginatorComponent } from '@app/libs/features/table-paginator/table-paginator.component';

@NgModule({
  declarations: [PaymentsTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        TranslateModule,
        MatPaginatorModule,
        MatCardModule,
        MatProgressSpinnerModule,
        SharedModule,
        TablePaginatorComponent
    ],
  exports: [PaymentsTableComponent]
})
export class PaymentsTableModule {}
