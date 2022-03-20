import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


import { MenuService } from '../menu/menuservice';
import RoleModel from './menu-authorization.model';
import { MenuAuthorizationService } from './menu-authorization.service';
// start table grid 
export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  activity?: number;
  representative?: Representative;
}
export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}
// end table grid 

@Component({
  selector: 'app-menu-authorization',
  templateUrl: './menu-authorization.component.html',
  styleUrls: ['./menu-authorization.component.css'],

  styles: [`
      :host ::ng-deep .p-button {
          margin: 0 .5rem 0 0;
          min-width: 10rem;
      }

      p {
          margin: 0;
      }

      .confirmation-content {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      :host ::ng-deep .p-dialog .p-button {
          min-width: 6rem;
      }
  `]
})
export class MenuAuthorizationComponent implements OnInit {
  nodeSelected: boolean = false;
  isRoleEdit: boolean = false;
  rowEvent: any;
  roleForm: any;
  // start Modal **************  
  displayModal: boolean = false;
  showDialog() {
    this.clear();
    this.displayModal = true;
  }
  // end modal ****************

  // start table grid ****

  selectedRole: RoleModel;
  authorizationRoles: RoleModel[];
  first = 0;
  rows = 10;
  // end table grid ****
  constructor(private router: Router,private roleauthorizationservice: MenuAuthorizationService, private notifyService: NotificationService, private formbulider: FormBuilder) { }

  ngOnInit() {
    this.roleForm = this.formbulider.group({
      authorization_role_name: ['', [Validators.required]],
      remarks: ['']

    });
    // start table grid 
    // selectProduct(customers: Customer) {
    //   this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    // }

    // onRowSelect(event) {
    //   this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
    // }

    // onRowUnselect(event) {
    //   this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
    // }
    this.loadAllRoles();
    // end table grid 
  }
  loadAllRoles() {
    this.roleauthorizationservice.GetAllRoles().subscribe(data => {
      this.authorizationRoles = data;


    });
  }
  onRowSelect(event) {

    this.nodeSelected = true;
    this.rowEvent = event.data;


  }
  onRowUnselect(event) {
    this.nodeSelected = false;
    this.rowEvent = null;

  }

  deleteRole() {
    if (!this.nodeSelected || this.rowEvent == null) {

      return this.notifyService.ShowNotification(2, 'Please select one row');
    }
    let authorization_role_id = this.rowEvent.AuthorizationRoleId;


    this.roleauthorizationservice.Delete(authorization_role_id).subscribe(data => {
      this.loadAllRoles();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });


  }


  roleActivity() {


    if (!this.nodeSelected || this.rowEvent == null) {
      return this.notifyService.ShowNotification(2, "Please select one row");

    }

    let authorization_role_id = this.rowEvent.AuthorizationRoleId;


    this.roleauthorizationservice.Activity(authorization_role_id).subscribe(data => {
      this.loadAllRoles();

      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });


  }

  SaveRole() {


    const roledata = this.roleForm.value;


    if (this.isRoleEdit) {
      roledata.authorization_role_id = this.rowEvent.AuthorizationRoleId;
      this.roleauthorizationservice.Update(roledata).subscribe(data => {
        this.loadAllRoles();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

      });
    }
    else {


      this.roleauthorizationservice.Create(roledata).subscribe(data => {
        this.loadAllRoles();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

      });
    }
  }


  editModalDialog() {
    this.clear();
    this.isRoleEdit = false;
    if (!this.nodeSelected || this.rowEvent == null) {
      return this.notifyService.ShowNotification(2, 'Please select one row');

    }

    let authorization_role_id = this.rowEvent.AuthorizationRoleId;


    this.roleauthorizationservice.GetRoleById(authorization_role_id).subscribe(data => {
      this.isRoleEdit = true;
      this.roleForm.controls['authorization_role_name'].setValue(data.AuthorizationRoleName);
      this.roleForm.controls['remarks'].setValue(data.remarks);


    });
    this.displayModal = true;

  }
  menuEventPermission() {
    if (!this.nodeSelected || this.rowEvent == null) {
      return this.notifyService.ShowNotification(2, 'Please select one row');

    }
    this.router.navigate(['/menu-auth-permission', { 'data': (this.rowEvent.AuthorizationRoleId),a:1 } ]);
  }
  clear() {
    this.roleForm = this.formbulider.group({
      authorization_role_name: [''],
      remarks: ['']

    });
  }
  // start table grid 
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.authorizationRoles ? this.first === (this.authorizationRoles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.authorizationRoles ? this.first === 0 : true;
  }

  // end table grid

}
