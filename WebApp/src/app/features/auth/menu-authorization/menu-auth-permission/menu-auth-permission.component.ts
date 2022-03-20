import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../../service/CommonMessage/notification.service';


import { MenuService } from '../../menu/menuservice';
import { MenuAuthorizationService } from '../menu-authorization.service';


@Component({
  selector: 'app-menu-auth-permission',
  templateUrl: './menu-auth-permission.component.html',
  styleUrls: ['./menu-auth-permission.component.css']
})
export class MenuAuthPermissionComponent implements OnInit {
  MenuDataSource: TreeNode[];
  selectedNode: TreeNode;
  nodeSelected: boolean = false;
  rowEvent: any;
  cols: any[];
  AuthorizationRoleId: any;
  sub: any;
  // start Modal **************  
  displayModal: boolean = false;
  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{ name: 'Accounting', key: 'A', status: true }, { name: 'Marketing', key: 'M', status: true }, { name: 'Production', key: 'P', status: true }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }, { name: 'Research', key: 'R', status: false }];
  events: any[];
  checked: boolean = false;
  // end modal ****************
  constructor(private router: Router,private MenuAuthorizationService: MenuAuthorizationService, private route: ActivatedRoute, private notifyService: NotificationService) { }

  ngOnInit() {
    this.cols = [
      { field: 'MenuName', header: 'Menu Name' },

      { field: 'TotalEvents', header: 'Total Events' },
      { field: 'PermittedEvents', header: 'Permitted Events' }

    ];
   

   
    //this.route.params.subscribe(params => {
     // this.AuthorizationRoleId = params['data']
      
    //});
    this.AuthorizationRoleId = (this.route.snapshot.paramMap.get('data'));
  
    this.loadMenuTreeGrid();
  }
  loadMenuTreeGrid() {
    this.MenuAuthorizationService.GetTreeMenuWithEvents(this.AuthorizationRoleId).subscribe(data => {
      this.MenuDataSource = data;
    
    });
  }
  okButton() {
    this.loadMenuTreeGrid();
    this.displayModal = false
  }
  BacktoAuthorizationRole() {
    this.router.navigate(['/menu-authorization']);
  }

  loadMenuAndRoleWiseEvent() {
    this.MenuAuthorizationService.GetMenuAndRoleWiseEvent(this.rowEvent.MenuId,this.AuthorizationRoleId).subscribe(data => {
      this.events = data;

    });
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
  onCheckboxChange(event, menu_id, authorization_role_menu_events_id, authorization_role_id, menu_event_id) {
  
    if (event.checked) {
      this.MenuAuthorizationService.AddPermission(menu_id, authorization_role_menu_events_id, authorization_role_id, menu_event_id).subscribe(data => {

        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

      });
    }
    else {
      this.MenuAuthorizationService.RemovePermission(menu_id, authorization_role_menu_events_id, authorization_role_id, menu_event_id).subscribe(data => {
        
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
  }

}
