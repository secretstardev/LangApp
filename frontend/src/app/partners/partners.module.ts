import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AboutComponent } from '@app/partners/about/about.component';
import { RouterModule } from '@angular/router';
import { ClientsComponent } from '@app/partners/clients/clients.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { TransactionComponent } from '@app/partners/transaction/transaction.component';
import { PaymentsTableModule } from '@app/common/payments-table/payments-table.module';
import { SharedModule } from '@app/shared/shared.module';
import { PartnersComponent } from '@app/partners/partners.component';
import { PartnersRoutingModule } from '@app/partners/partners-routing.module';

@NgModule({
  declarations: [AboutComponent, ClientsComponent, TransactionComponent, PartnersComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaymentsTableModule,
    TranslateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SharedModule,
    PartnersRoutingModule
  ],
  providers: [DecimalPipe]
})
export class PartnersModule {}
