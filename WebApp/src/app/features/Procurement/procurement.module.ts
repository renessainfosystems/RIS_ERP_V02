import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcurementRoutes } from './procurement.routing';
import { SupplierlistComponent } from './supplierlist/supplierlist.component';
import { SupplierApplicationComponent } from './supplier-application/supplier-application.component';
import { PrimeNGModule } from '../../root/primengreference.module';


@NgModule({
  declarations: [
    SupplierApplicationComponent,
    SupplierlistComponent,
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(ProcurementRoutes),
  ]
})
export class ProcurementsModule { }
