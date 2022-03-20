import { Routes } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';

import { AppMainComponent } from './app.main.component';



export const AppRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        component: AppMainComponent,
        children: [
            {
                path: '',
                redirectTo: '/',
                pathMatch: 'full'
            },
           
            {
                path: '',
                loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/attendance/attendance.module').then(m => m.AttendanceModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/Procurement/procurement.module').then(m => m.ProcurementsModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/pims/pims.module').then(m => m.PimsModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/payroll/payroll.module').then(m => m.PayrollModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/party/party.module').then(m => m.PartyModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/administrative/administrative.module').then(m => m.AdministrativeModule)
            },
            {
                path: '',
                loadChildren: () => import('../features/accounting/accounting.module').then(m => m.AccountingModule)
            }
            ,
            {
                path: '',
                loadChildren: () => import('../features/components/components.module').then(m => m.ComponentsModule)
            }
        ],

    }, { path: '**', redirectTo: 'pages/notfound' },
    { path: '**', redirectTo: '' }
];
