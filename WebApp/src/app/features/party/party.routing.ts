import { Routes } from '@angular/router';
import { DealerAssessmentComponent } from './dealer-assessment/dealer-assessment.component';
import { DealerinfoComponent } from './dealerinfo/dealerinfo.component';
import { DealerlistComponent } from './dealerlist/dealerlist.component';
import { RetailerinfoComponent } from './retailerinfo/retailerinfo.component';


export const PartyRoutes: Routes = [

    {
        path: 'dealer-info',
        component: DealerinfoComponent
    },
    {
        path: 'dealer-list',
        component: DealerlistComponent
    },
    {
        path: 'dealer-assessment',
        component: DealerAssessmentComponent
    },
    {
        path: 'retailer-info',
        component: RetailerinfoComponent
    }
];
