import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentRoutes } from './components.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './menus/payment.component';
import { MenuModule } from 'primeng/menu';
import { PersonalComponent } from './menus/personal.component';
import { MenusComponent } from './menus/menus.component';
import { SeatComponent } from './menus/seat.component';
import { ConfirmationComponent } from './menus/confirmation.component';
import { DocumentationComponent } from './documentation/documentation.component';

import { IconsComponent } from './icons/icons.component';
import { EmptyComponent } from './empty/empty.component';
import { TimelineComponent } from './timeline/timeline.component';
import { CrudComponent } from './crud/crud.component';
import { FileComponent } from './file/file.component';
import { ChartsComponent } from './charts/charts.component';
import { MiscComponent } from './misc/misc.component';
import { MessagesComponent } from './messages/messages.component';
import { OverlaysComponent } from './overlays/overlays.component';
import { MediaComponent } from './media/media.component';
import { PanelsComponent } from './panels/panels.component';
import { TreeComponent } from './tree/tree.component';
import { ListComponent } from './list/list.component';
import { InvalidStateComponent } from './invalidstate/invalidstate.component';
import { FormLayoutComponent } from './formlayout/formlayout.component';
import { FloatLabelComponent } from './floatlabel/floatlabel.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { TableComponent } from './table/table.component';
import { PrimeNGModule } from '../../root/primengreference.module';





@NgModule({
 
  imports: [
        CommonModule,
        PrimeNGModule,
      RouterModule.forChild(ComponentRoutes),
    ],
    providers: [],

    declarations: [
        DashboardComponent,
        FormLayoutComponent,
        InputComponent,
        FloatLabelComponent,
        InvalidStateComponent,
        ButtonComponent,
        TableComponent,
        ListComponent,
        TreeComponent,
        PanelsComponent,
        OverlaysComponent,
        MediaComponent,
        PersonalComponent,
        PaymentComponent,
        MenusComponent,
        SeatComponent,
        ConfirmationComponent,
        MessagesComponent,
        MiscComponent,
        ChartsComponent,
        FileComponent,
        CrudComponent,
        TimelineComponent,
        EmptyComponent,
        IconsComponent,
    
    ]
})
export class ComponentsModule { }
