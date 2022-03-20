import { Routes } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { ChartsComponent } from './charts/charts.component';
import { CrudComponent } from './crud/crud.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { EmptyComponent } from './empty/empty.component';
import { FileComponent } from './file/file.component';
import { FloatLabelComponent } from './floatlabel/floatlabel.component';
import { FormLayoutComponent } from './formlayout/formlayout.component';
import { IconsComponent } from './icons/icons.component';
import { InputComponent } from './input/input.component';
import { InvalidStateComponent } from './invalidstate/invalidstate.component';
import { ListComponent } from './list/list.component';
import { MediaComponent } from './media/media.component';
import { MessagesComponent } from './messages/messages.component';
import { MiscComponent } from './misc/misc.component';
import { OverlaysComponent } from './overlays/overlays.component';
import { PanelsComponent } from './panels/panels.component';
import { TableComponent } from './table/table.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TreeComponent } from './tree/tree.component';


export const ComponentRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'uikit/formlayout', component: FormLayoutComponent },
    { path: 'uikit/input', component: InputComponent },
    { path: 'uikit/floatlabel', component: FloatLabelComponent },
    { path: 'uikit/invalidstate', component: InvalidStateComponent },
    { path: 'uikit/button', component: ButtonComponent },
    { path: 'uikit/table', component: TableComponent },
    { path: 'uikit/list', component: ListComponent },
    { path: 'uikit/tree', component: TreeComponent },
    { path: 'uikit/panel', component: PanelsComponent },
    { path: 'uikit/overlay', component: OverlaysComponent },
    { path: 'uikit/media', component: MediaComponent },
    { path: 'uikit/menu', loadChildren: () => import('../components/menus/menus.module').then(m => m.MenusModule) },
    { path: 'uikit/message', component: MessagesComponent },
    { path: 'uikit/misc', component: MiscComponent },
    { path: 'uikit/charts', component: ChartsComponent },
    { path: 'uikit/file', component: FileComponent },
    { path: 'pages/crud', component: CrudComponent },
    { path: 'pages/timeline', component: TimelineComponent },
    { path: 'pages/empty', component: EmptyComponent },
    { path: 'icons', component: IconsComponent },


];
