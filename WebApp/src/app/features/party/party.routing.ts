import { Routes } from '@angular/router';
import { DealerinfoComponent } from './dealerinfo/dealerinfo.component';
import { RetailerinfoComponent } from './retailerinfo/retailerinfo.component';


export const PartyRoutes: Routes = [

  {
    path: 'dealer-info',
    component: DealerinfoComponent
  },
  {
    path: 'retailer-info',
    component: RetailerinfoComponent
  }
];
