import { Routes } from '@angular/router';
import { SupplierApplicationComponent } from './supplier-application/supplier-application.component';
import { SupplierListComponent } from './supplierlist/supplierlist.component';



export const ProcurementRoutes: Routes = [
 
  {
    path: 'supplier-application',
    component: SupplierApplicationComponent,
  },

  {
    path: 'supplierlist',
      component: SupplierListComponent,
  },
  
];
