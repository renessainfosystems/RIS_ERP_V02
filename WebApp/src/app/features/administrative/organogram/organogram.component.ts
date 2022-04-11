import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { NodeService } from '../../../service/nodeservice';
import { OrganogramService } from './organogram.service';

@Component({
  selector: 'app-organogram',
  templateUrl: './organogram.component.html',
  styleUrls: ['./organogram.component.scss']
})
export class OrganogramComponent implements OnInit {


    //files1: TreeNode[];
    //files2: TreeNode[];
    //files3: TreeNode[];
    //selectedFiles1: TreeNode;
    //selectedFiles2: TreeNode[];
    //selectedFiles3: TreeNode;
    cols: any[];



   // organogramForm: FormGroup;
    organogramForm: any;
    submitted = false;

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormClose() {
        this.toggleFormDisplay();
       // this.generalIndex();
    }
    //end grid and form show hide ********************
    index: number = 0;
    rowData: any;
    rowDetailData: any;
    dataSaved = false;
   
    OrganogramList: TreeNode[];
    organogramDetailList: any[];
    organogramdataSource: any[];
    selectedorganogram: any;
    selectedorganogramDetail: any;
    isOrganogramEdit: boolean = false;
    nodeSelected: boolean = false;
    nodeDetailSelected: boolean = false;
    companyIdUpdate = null;
    createdDate = null;
    serverDate = null;    
    rowEvent: any;   
    massage = null;
  
    selectedDepartment: any;
    drpdwnDepartmentList: any[];

    selectedPosition: any;
    drpdwnPositionList: any[];

    selectedSalaryHead: any;
    drpdwnSalaryHeadList: any[];


    rowSelected: boolean = false;
    date1: Date;

    first = 0;
    rows = 10;
    // for delete data modal
    display: boolean = false;
    showDialog() {
        debugger
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }
    // for Insert and update data modal
    //displayBasic: boolean = false;
    showBasicDialog() {
        //new
        debugger
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
       // this.resetForm();
        if (this.rowData.TreeLavel==0) {
            return this.notifyService.ShowNotification(3, 'You can not Create Node Under Company');
        }
        this.loadLocationOrganogram();
      //  if (this.rowData.TreeLavel == 1) {
            this.toggleGridDisplay();
       // }
       
        
    }
    generalIndex() {
        this.index = 0;
    }
    function(e) {
        this.index = e.index;
    }
    get f(): { [key: string]: AbstractControl } {
        return this.organogramForm.controls;
    }

    onGeneral(): void {
        debugger
        this.submitted = true;
        if (this.organogramForm.invalid) {
            return;
        }
       // const data = this.organogramForm.value;


        //if (this.isOrganogramEdit == true) {
        //    this.openNext();
        //} else {

            this.onFormSubmit();
            //this.openNext();
       // }

        // }
        //if (this.organogramForm.invalid) {
        //    return;
        //}
    }
    constructor(private formbulider: FormBuilder, private nodeService: NodeService, private organogramService: OrganogramService, private toastr: ToastrService, private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.organogramForm = this.formbulider.group({

            organogram_code: ['', [Validators.required]],
            Group: [''],
            Company: [''],
            location_name: [''],
            department: [''],
            department_id: ['', [Validators.required]],
            location_id: ['', [Validators.required]],           
            parent_id: [0],
            budget_typeOpen: [''],
            budget_typedeferred: [''],
            sorting_priority: [0],

            position_id: [0],
            min_no_of_manpower: [0],
            max_no_of_manpower: [0],
            min_budget: [0],
            max_budget: [0],
            min_year_of_experience: [0],
            max_year_of_experience: [0],           
            is_open: ['0'],
            is_gross: ['0'],
            increment_percentage_yearly: [0],
            salary_head_id: [0],
            is_active: true,
            days_of_confirmation: [0],
            //drownlist field
            

            //ImageUpload: new FormControl(null),
            //SignatureUpload: new FormControl(null)

        });
        //Load Dropdown
        this.loadAllOrganogram();
        this.loadDepartmentdrpdwn();
        this.loadPositiondrpdwn();
        this.loadAllOrganogramDetail(0);
        this.loadSalaryHeaddrpdwn();
        this.cols = [
            { field: 'Node_Name', header: 'Organogram' }
            //{ field: 'size', header: 'size' },
            //{ field: 'type', header: 'type' }
        ];
        //this.cols = [
        //    { field: 'company_name', header: 'Company' },
        //    { field: 'location_name', header: 'Location' },
        //    { field: 'department', header: 'Department' }
        //];
    }

    loadDepartmentdrpdwn() {
        this.organogramService.getAllDepartment().subscribe(data => {
            this.drpdwnDepartmentList = data;
        });
    }
    loadPositiondrpdwn() {
        this.organogramService.getPositionList().subscribe(data => {
            this.drpdwnPositionList = data;
        });
    }
    loadSalaryHeaddrpdwn() {

        this.organogramService.GetSalaryHead(1).subscribe(data => {
            this.drpdwnSalaryHeadList = data;
        });
    }
    
    onRowSelect(event) {
        debugger;
        // this.toggle();
        this.nodeDetailSelected = true;
        this.rowDetailData = event.data;

    }
    onRowUnselect(event) {
        // this.toggle();
        debugger;
        this.nodeDetailSelected = false;
        this.rowDetailData = null;

    }
    nodeSelect(event) {
        debugger;
        // this.toggle();
        this.nodeSelected = true;
        this.rowData = event.node.data;

    }
   
    nodeUnselect(event) {
        // this.toggle();
        debugger;
        this.nodeSelected = false;
        this.rowData = null;

    }
    loadAllOrganogram() {
        this.organogramService.getAllOrganogram().subscribe(data1 => {
          
            console.log(data1)
            this.OrganogramList = data1;
        });
        //this.nodeService.getFilesystem().then(data => {
        //    debugger
        //    console.log(data)
        //    this.OrganogramList = data;
        //});
    }

    loadAllOrganogramDetail(OrganogramId) {
        debugger
        let Organogram_Id = OrganogramId;
        this.organogramService.GetAllOrganogramDetail(Organogram_Id).subscribe(data2 => {
            debugger
            console.log(data2)
            this.organogramDetailList = data2;
        });      
    }

    loadLocationOrganogram() {
        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
       

        debugger;
        //let locationId = this.rowData.Node_Name;
        
        
            this.organogramForm.controls['location_name'].setValue(this.rowData.location_name);
            this.organogramForm.controls['Company'].setValue(this.rowData.company_name);
            this.organogramForm.controls['Group'].setValue(this.rowData.group_name);
        this.organogramForm.controls['location_id'].setValue(this.rowData.location_id);
        this.organogramForm.controls['parent_id'].setValue(this.rowData.parent_id);
        //this.notifyService.ShowNotification(3, 'selected level is : ' + this.rowData.TreeLavel);

    }
    onFormSubmit() {
        debugger
        this.submitted = true;
        if (this.organogramForm.invalid) {
            return;
        }
       const data = this.organogramForm.value;

        //if (this.isOrganogramEdit) {
        //    if (!(data.present_country_id)) {
        //        return this.notifyService.ShowNotification(2, "Please select present country.")
        //    }
        //    if (!(data.present_division_id)) {
        //        return this.notifyService.ShowNotification(2, "Please select present division.")
        //    }
        //    if (!(data.present_district_id)) {
        //        return this.notifyService.ShowNotification(2, "Please select present district.")
        //    }
        //}
        //let formData = new FormData();
        //for (const key of Object.keys(this.organogramForm.value)) {
        //    const value = this.organogramForm.value[key];
            //if (key == "date_of_marriage") {
            //    let date = new Date(value).toISOString();
            //    formData.append("date_of_marriage", date);
            //}
            //else if (key == "date_of_birth") {
            //    let date = new Date(value).toISOString();
            //    formData.append("date_of_birth", date);
            //}
            //else {

               // formData.append(key, value);
           // }
            //  formData.append(key, value);

      //  } 
       
       // console.log(formData)


        if (this.isOrganogramEdit) {

            data.organogram_id = this.rowData.organogram_id;
          //  formData.append("organogram_id", this.rowData.organogram_id);

            this.organogramService.updateOrganogram(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllOrganogram();
                this.isOrganogramEdit = false;
            });
            this.ngOnInit();
        }
        else {

            this.organogramService.createOrganogram(data).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.Data) {
                        //for (var i = 0; i < result.Data.length; i++) {

                        //}
                    }
                    this.loadAllOrganogram();
                }
            );
            this.ngOnInit();
        }

        // this.displayBasic = false;

    }

    loadOrganogramToEdit() {
        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
    }
    organogramActiveInactive() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        //if (this.rowData.IsActive) {
        //  return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
        //}
        let organogramId = this.rowData.organogram_id;
        this.organogramService.OrganogramActivity(organogramId).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllOrganogram();
            }
        );

    }
    deleteOrganogram() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let organogramId = this.rowData.organogram_id;
        this.organogramService.deleteOrganogram(organogramId).subscribe(data => {

            this.loadAllOrganogram();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }
}
