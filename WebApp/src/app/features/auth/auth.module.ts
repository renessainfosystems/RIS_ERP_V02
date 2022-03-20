import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { AuthRoutes } from './auth.routing';
import { RouterModule } from '@angular/router';

import { MenuAuthorizationComponent } from './menu-authorization/menu-authorization.component';
import { MenuAuthPermissionComponent } from './menu-authorization/menu-auth-permission/menu-auth-permission.component';
import { AddedituserComponent } from './user/add-edit/addedituser/addedituser.component';
import { UserMenuPermissionComponent } from './user/user-menu-permission/user-menu-permission.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UiComponent } from './ui/ui.component';
import { PrimeNGModule } from '../../root/primengreference.module';




@NgModule({

  imports: [
    CommonModule,
    PrimeNGModule,
    RouterModule.forChild(AuthRoutes),
    
  ],
  providers: [],

  declarations: [
    UserComponent,
    MenuComponent,
    MenuAuthorizationComponent,
    AddedituserComponent,
    MenuAuthorizationComponent,
    AddedituserComponent,
    MenuAuthPermissionComponent,    
    ResetPasswordComponent,    
    UserMenuPermissionComponent, UiComponent,   
  ]
})
export class AuthModule { }
