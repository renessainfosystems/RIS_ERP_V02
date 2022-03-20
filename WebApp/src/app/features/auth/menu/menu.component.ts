import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { MessageService, TreeNode } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


import EventModel from './EventModel';
import { MenuService } from './menuservice';


interface Menu {
  menu_id: number,
  menu_parentid: number,
  menu_icon_path:string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ToastrService]
 
})

export class MenuComponent implements OnInit {

  menus: Menu[];
  value2: string;
  fileToUpload: any;
  menuForm: any;
  selectedEvent: EventModel;
  allEvents: EventModel[];

  constructor(private MenuService: MenuService, private formbulider: FormBuilder, private toastr: ToastrService, private notifyService: NotificationService) {

  }
  eventDataSources: any[]=[];
  outputArray:any[]=[];
  MenuDataSource: TreeNode[];
  selectedNode: TreeNode;
  MenuParentId: any;
  displayModal: boolean;
  nodeSelected: boolean=false;
  isMenuEdit: boolean=false;
  rowEvent: any;
  cols: any[];
  uploadedFiles: any[] = [];

  ngOnInit() {


    this.loadAllEventEnum();
    this.menuForm = this.formbulider.group({
      menu_parent_name: ['', [Validators.required]],
      event_enum: ['', [Validators.required]],
      menu_name: [''],
      menu_routing_path: [''],
      calling_parameter_type: [''],
      calling_parameter_value: [''],
      menu_icon_path: ['']
    });


    this.cols = [
    { field: 'MenuName', header: 'Menu Name' },
    
      { field: 'SortingPriority', header: 'Sorting Priority' },
      { field: 'IsActive', header: 'Activity Status' }

    ];
    this.loadMenuTreeGrid();

  }
  clear() {
    this.menuForm = this.formbulider.group({
      menu_parent_name: [''],
      menu_name: [''],
      menu_routing_path: [''],
      calling_parameter_type: [''],
      calling_parameter_value: [''],
      menu_icon_path: ['']
    });
  }
  loadMenuTreeGrid() {
    this.MenuService.getMenuTree().subscribe(data => {
      this.MenuDataSource = data;
      //this.eventDataSources = data;
    });
  }

  nodeSelect(event) {

    this.nodeSelected = true;
    this.rowEvent = event.node.data;

    //this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
  }
  loadAllEventEnum() {
    this.MenuService.getAllEvents().subscribe(data =>    {
      this.allEvents = data;   

    });
    
  }

  nodeUnselect(event) {
    this.nodeSelected = false;
    this.rowEvent = null; 
  }

  deleteMenu() {


    if (!this.nodeSelected || this.rowEvent == null) {
    
      return this.notifyService.ShowNotification(3, 'Select menu row');
    }
    let menu_id = this.rowEvent.MenuId;
    let menu_parentid = this.rowEvent.MenuParentId;

    this.MenuService.DeleteMenu(menu_id, menu_parentid).subscribe(data => {
      this.loadMenuTreeGrid();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });  
  }

  editModalDialog() {
   // this.clear();

    this.isMenuEdit = false;
    if (!this.nodeSelected || this.rowEvent == null) {
      return this.toastr.warning('Select menu row');

    }
    this.menuForm.controls['menu_parent_name'].setValue(this.rowEvent.MenuName);
    let menu_id = this.rowEvent.MenuId;
   

    this.MenuService.getMenuByMenuId(menu_id).subscribe(data => {
      this.isMenuEdit = true;
      this.menuForm.controls['menu_name'].setValue(data.MenuName);
      this.menuForm.controls['menu_routing_path'].setValue(data.MenuRoutingPath);
      this.menuForm.controls['calling_parameter_type'].setValue(data.CallingParameterType);
      this.menuForm.controls['calling_parameter_value'].setValue(data.CallingParameterValue);
      this.menuForm.controls['menu_icon_path'].setValue(data.MenuIconPath);
      this.eventDataSources = data.menuEvents;
      
    });
    this.displayModal = true;
      return true;
  }

  menuActivity() {


    if (!this.nodeSelected || this.rowEvent == null) {
      return this.notifyService.ShowNotification(2, "Select menu row");

    }
    
    let menu_id = this.rowEvent.MenuId;
    let menu_parentid = this.rowEvent.MenuParentId;
  
    this.MenuService.MenuActivity(menu_id, menu_parentid).subscribe(data => {
     
      this.loadMenuTreeGrid();
    
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });


  }

  menuSorting(is_upper_sorting) {


    if (!this.nodeSelected || this.rowEvent == null) {
      return this.notifyService.ShowNotification(2, "Select menu row");

    }
    let menu_id = this.rowEvent.MenuId;
    let menu_parentid = this.rowEvent.MenuParentId;

    this.MenuService.MenuSorting(menu_id, menu_parentid, is_upper_sorting).subscribe(data => {
      this.loadMenuTreeGrid();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

    });
 

  }

  showModalDialog() {
    this.eventDataSources = [];
    
    if (!this.nodeSelected || this.rowEvent==null) {

      return this.notifyService.ShowNotification(2, "Select menu row");
    
    }
    if (this.rowEvent.MenuRoutingPath) {

      return this.notifyService.ShowNotification(2, "You can't add menu to last step")
    }
    
    this.menuForm.controls['menu_parent_name'].setValue(this.rowEvent.MenuName);

    this.displayModal = true;
  }
  onUpload(event) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const formData = new FormData();
    this.menuForm.get('menu_icon_path').setValue(this.uploadedFiles[0]);
    formData.append("file", this.uploadedFiles[0]);
    this.MenuService.UploadImage(formData).subscribe(data => {

      this.menuForm.get('menu_icon_path').setValue(data.dbPath);
      if (data.dbPath != null) {
        this.notifyService.ShowNotification(1,"Icon Uploaded Successfully")
      }
    }); 
  }
 

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];

  
    }
  }
  SaveMenu() {
    
    var formData = new FormData();
    const menudata = this.menuForm.value;
    menudata.menu_parentid = this.rowEvent.MenuId;;
    menudata.menu_events = this.eventDataSources;

    if (this.isMenuEdit) {
      menudata.menu_id = this.rowEvent.MenuId;
      this.MenuService.UpdateMenu(menudata).subscribe(data => {
        this.loadMenuTreeGrid();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

      });
    }
    else {


      this.MenuService.CreateMenu(menudata).subscribe(data => {
        this.loadMenuTreeGrid();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
     
      });
    }
  }
  addEventToTable(a) {
    let event_enum_id = this.menuForm.get('event_enum')?.value.event_enum_id;
    if (this.dataExist(event_enum_id)) {
      return this.notifyService.ShowNotification(2,"Selected event already added")
    }
   
    if (this.isMenuEdit) {
      let menu_id = this.rowEvent.MenuId;
      
     
  
      this.MenuService.CreateMenuEvent(menu_id, event_enum_id).subscribe(data => {
    
        if (data.MessageType == 1) {
          this.MenuService.getMenuByMenuId(menu_id).subscribe(data => {

            this.eventDataSources = data.menuEvents;

          });
 
        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {
      if (this.eventDataSources.includes(this.menuForm.get('event_enum')?.value)) {
        return this.toastr.warning("Selected event already added")
      }
      this.eventDataSources.push((this.menuForm.get('event_enum')?.value));
    }
      
    
  

  }

  dataExist(event_enum_id) {
    
   return this.eventDataSources.some(function (el) {
     return el.event_enum_id === event_enum_id;
  });
}

  removeEvent(a,row) {
    
    if (this.isMenuEdit) {
      let menu_id = this.rowEvent.MenuId;
      let menu_event_id = row.menu_event_id;

      this.MenuService.DeleteMenuEvent(menu_id, menu_event_id).subscribe(data => {
        console.log(data)
        if (data.MessageType == 1) {
          

          this.MenuService.getMenuByMenuId(menu_id).subscribe(data => {
            
            this.eventDataSources = data.menuEvents;
          
          });
          
        }
   
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    this.eventDataSources = this.eventDataSources.slice(0, a).concat(this.eventDataSources.slice(a + 1));

  }
}




