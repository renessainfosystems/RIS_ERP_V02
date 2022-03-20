import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TokenStorageService } from '../core/services/token-storage.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    
    items: MenuItem[];

    constructor(public appMain: AppMainComponent, private tokenStorage: TokenStorageService, private router: Router) { }
  
    ngOnInit() {
        var user = this.tokenStorage.getUser();
        
    this.items = [

        {
            label: user.UserName,
          
            items: [
                {
                    label: 'Log Out',
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => this.signOut(),
                    
                   
                },
                {
                    label: 'Change Password',
                    icon: 'pi pi-fw pi-file',
                   
                }
            ]
        }
    ];
}
    signOut() {

        // const { login_User, password } = this.loginform;

        this.tokenStorage.signOut();
        this.router.navigate(['/login']);

    
    }



}
