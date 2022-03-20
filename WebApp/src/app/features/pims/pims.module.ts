import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeebasicinfoComponent } from './employeebasicinfo/employeebasicinfo.component';
import { PIMSRoutes } from './pims.routing';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { PrimeNGModule } from '../../root/primengreference.module';




@NgModule({
  declarations: [
    EmployeebasicinfoComponent
    
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(PIMSRoutes),
    CheckboxModule
  ]
})
export class PimsModule { }
