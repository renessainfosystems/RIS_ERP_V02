import { Routes } from '@angular/router';
import { SupplierApplicationComponent } from './supplier-application/supplier-application.component';
import { SupplierListComponent } from './supplierlist/supplierlist.component';
import { SupplierAssessmentComponent } from './supplierassessment/supplierassessment.component';



export const ProcurementRoutes: Routes = [

    {
        path: 'supplier-application',
        component: SupplierApplicationComponent,
    },

    {
        path: 'supplierlist',
        component: SupplierListComponent,
    },
    {
        path: 'supplierassessment',
        component: SupplierAssessmentComponent,
    },

];
