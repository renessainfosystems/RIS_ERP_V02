import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcurementRoutes } from './procurement.routing';
import { SupplierListComponent } from './supplierlist/supplierlist.component';
import { SupplierApplicationComponent } from './supplier-application/supplier-application.component';
import { PrimeNGModule } from '../../root/primengreference.module';
import { SupplierAssessmentComponent } from './supplierassessment/supplierassessment.component';


@NgModule({
    declarations: [
        SupplierApplicationComponent,
        SupplierListComponent,
        SupplierAssessmentComponent,
    ],
    imports: [
        CommonModule,
        PrimeNGModule,
        RouterModule.forChild(ProcurementRoutes),
    ]
})
export class ProcurementsModule { }
