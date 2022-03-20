import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VoucherTypeComponent } from '../accounting/voucher-type/voucher-type.component';
import { AccountingRoutes } from './accounting.routing';
import { PrimeNGModule } from '../../root/primengreference.module';


@NgModule({
  declarations: [
    VoucherTypeComponent,
  ],
  imports: [
    CommonModule,
      PrimeNGModule,
    RouterModule.forChild(AccountingRoutes),
  ]
})
export class AccountingModule { }
