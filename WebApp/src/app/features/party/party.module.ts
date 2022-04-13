import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerinfoComponent } from './dealerinfo/dealerinfo.component';
import { RouterModule } from '@angular/router';
import { PartyRoutes } from './party.routing';
import { CheckboxModule } from 'primeng/checkbox';
import { RetailerinfoComponent } from './retailerinfo/retailerinfo.component';
import { PrimeNGModule } from '../../root/primengreference.module';
import { DealerlistComponent } from './dealerlist/dealerlist.component';




@NgModule({
  declarations: [
    DealerinfoComponent,
    RetailerinfoComponent,
    DealerlistComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(PartyRoutes),
    CheckboxModule
  ]
})
export class PartyModule { }
