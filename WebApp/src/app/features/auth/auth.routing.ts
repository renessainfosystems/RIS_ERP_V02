import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { MenuAuthorizationComponent } from './menu-authorization/menu-authorization.component';
import { MenuAuthPermissionComponent } from './menu-authorization/menu-auth-permission/menu-auth-permission.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserMenuPermissionComponent } from './user/user-menu-permission/user-menu-permission.component';
import { UiComponent } from './ui/ui.component';

export const AuthRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'menu-authorization',
    component: MenuAuthorizationComponent
  },
  {
    path: 'menu-auth-permission',
    component: MenuAuthPermissionComponent
  },
  
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
 
  {
    path: 'user-menu-permission',
    component: UserMenuPermissionComponent,
  },  
  {
    path: 'ui-component',
    component: UiComponent,
  },  

];
