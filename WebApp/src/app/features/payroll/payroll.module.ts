import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PayrollRoutes } from './payroll.routing';
import { SalaryHeadComponent } from './salary-head/salary-head.component';
import { PrimeNGModule } from '../../root/primengreference.module';




@NgModule({
  declarations: [
    SalaryHeadComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(PayrollRoutes),
  ]
})
export class PayrollModule { }
