import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { NotificationService } from '../../../../service/CommonMessage/notification.service';


import { UsermenupermissionService } from './user-menu-permission.service';

@Component({
  selector: 'app-user-menu-permission',
  templateUrl: './user-menu-permission.component.html',
  styleUrls: ['./user-menu-permission.component.css']
})
export class UserMenuPermissionComponent implements OnInit {
  MenuDataSource: TreeNode[];
  selectedNode: TreeNode;
  nodeSelected: boolean = false;
  rowEvent: any;
  cols: any[];
  
  UserInfoId: any;
  UserName: any;
  AuthorizationRoleId:any
  sub: any;
  displayModal: boolean = false;
  events: any[];
  user_role: any[];
  selectuserrole: any;
  userassignForm: any;

  displayModalforUser: boolean = false;
  UserPermissionDataSource: TreeNode[];
  userPermissionRowEvent: any;
  userPermissionNodeSelected: boolean = false;
  userPermissionselectedNode: TreeNode;
  userPermissionColmns: any[];
  userPermissionevents: any[];
  constructor(private router: Router, private formbulider: FormBuilder, private UsermenuPermissionService: UsermenupermissionService, private route: ActivatedRoute, private notifyService: NotificationService) { }

  ngOnInit() {

    this.userassignForm = this.formbulider.group({
      user_role: ['', [Validators.required]],
      user_info_id: new FormControl('', [Validators.required]),
      user_name: new FormControl(''),
    });
    this.cols = [
      { field: 'MenuName', header: 'Menu Name' },

      { field: 'TotalEvents', header: 'Total Events' },
      { field: 'PermittedEvents', header: 'Permitted Events' }

    ];
    this.userPermissionColmns = [
      { field: 'MenuName', header: 'Menu Name' },

      { field: 'TotalEvents', header: 'Total Events' },
      { field: 'PermittedEvents', header: 'Permitted Events' }

    ];
    this.UsermenuPermissionService.GetAllActiveRole().subscribe(data => {
      this.user_role = data;


    });
  

    this.UserInfoId = (this.route.snapshot.paramMap.get('data'));
    this.UserName = (this.route.snapshot.paramMap.get('object'));
    this.userassignForm.controls['user_name'].setValue(this.UserName);
    this.UsermenuPermissionService.GetRoleByUserId(this.UserInfoId).subscribe(data => {
      this.userassignForm.controls['user_role'].setValue(data.AuthorizationRoleId);
      if (data.AuthorizationRoleId) {
        this.loadMenuTreeGrid(data.AuthorizationRoleId);
      }

    });
 
    this.loadMeuTreeGridForUserPermission();
 
  }
  loadMeuTreeGridForUserPermission() {
    this.UsermenuPermissionService.GetTreeMenuWithEventsByUserInfoId(this.UserInfoId).subscribe(data => {
      this.UserPermissionDataSource = data;

    });
  }
  loadMenuTreeGrid(roleid:number) {
    this.UsermenuPermissionService.GetTreeMenuWithEvents(roleid).subscribe(data => {
      this.MenuDataSource = data;

    });
  }
  onRoleChange(event) {
    this.AuthorizationRoleId = event.value;
    this.loadMenuTreeGrid(event.value);
  }
  okButton() {
    
    this.displayModal = false;

  }
  okButtonforUserPermission() {

    this.displayModalforUser = false;
    this.loadMeuTreeGridForUserPermission();
  }
  UserRoleCreate() {
    
    this.UsermenuPermissionService.AddUserWiseRole(this.UserInfoId, this.AuthorizationRoleId,true).subscribe(data => {
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

    });
  }
  BacktoAuthorizationRole() {
    this.router.navigate(['/user']);
  }
  loadMenuAndRoleWiseEvent() {
   
    this.UsermenuPermissionService.GetMenuAndRoleWiseEvent(this.rowEvent.MenuId, this.userassignForm.value.user_role).subscribe(data => {
      this.events = data;

    });
  }
  loadMenuAndRoleWiseEventForUserPermission() {

    this.UsermenuPermissionService.GetMenuAndRoleWiseEventByUserInfoId(this.userPermissionRowEvent.MenuId, this.UserInfoId).subscribe(data => {
      this.userPermissionevents = data;
      
    });
  }
  UserPermissionNodeSelect(event) {

    this.userPermissionNodeSelected = true;
    this.userPermissionRowEvent = event.node.data;
    this.loadMenuAndRoleWiseEventForUserPermission();
    this.displayModalforUser = true;
  }
  UserPermissionNodeUnselect(event) {
    this.userPermissionNodeSelected = false;
    this.userPermissionRowEvent = null;
    this.displayModalforUser = false;
  }
  nodeSelect(event) {
  
    this.nodeSelected = true;
    this.rowEvent = event.node.data;
    this.loadMenuAndRoleWiseEvent();
    this.displayModal = true;
    //this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
  }
  nodeUnselect(event) {

    this.nodeSelected = false;
    this.rowEvent = null;
    this.displayModal = false;
  }
  

  onCheckboxChange(event, menu_id, user_menu_authorization_event_id, user_info_id, menu_event_id)
{

    if (event.checked) {
      this.UsermenuPermissionService.AddUserMenuPermission(menu_id, user_menu_authorization_event_id, user_info_id, menu_event_id,false).subscribe(data => {
        
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

      });
    }
    else {
      this.UsermenuPermissionService.RemoveUserMenuPermission(menu_id, user_menu_authorization_event_id, user_info_id, menu_event_id, false).subscribe(data => {

        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
  }
  

}
