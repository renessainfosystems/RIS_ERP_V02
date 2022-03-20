import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Designation from './designation.model';
import { DesignationService } from './designation.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],  
})
export class DesignationComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  designationForm: any;
  allDesignation: Observable<Designation[]>;
  selection = new SelectionModel<Designation>(true, []);
  designationIdUpdate = null;
  createdDate = null;
  serverDate = null;
  createdUserId = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['DesignationName', 'Remarks'];
  selectedCompanyCorporate: Designation;
  allCompanyCorporate: Designation[];


  selectedDesignation: Designation;
  designations: Designation[];
  first = 0;
  rows = 10;

  // for delete data modal
  display: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }

   // for Insert and update data modal
  displayBasic: boolean = false;
  showBasicDialog() {
    this.displayBasic = true;
    this.resetForm();
  }


  constructor(private formbulider: FormBuilder, private DesignationService: DesignationService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.DesignationService.getAllDesignation().subscribe(data => this.designations = data);

    this.designationForm = this.formbulider.group({      
      designation_code: [null, [Validators.required]],
      designation_name: [null, [Validators.required]],
      designation_short_name: [null, [Validators.required]],
      name_in_local_language: [null, [Validators.required]],
      remarks: [null, [Validators.required]],

    });
  }

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
    return this.designations ? this.first === (this.designations.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.designations ? this.first === 0 : true;
  }


  selectRow(designation) {
    this.rowData = designation;
  }

  loadDesignationToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let designationId = this.rowData.designation_id;
    this.DesignationService.GetDesignationById(designationId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.designationIdUpdate = data.designation_id;
      this.companyCorporateId = data.company_corporate_id;
      this.createdDate = data.created_datetime;
      this.serverDate = data.db_server_date_time;
      this.createdUserId = data.created_user_id;
      this.designationForm.controls['designation_code'].setValue(data.designation_code);
      this.designationForm.controls['designation_name'].setValue(data.designation_name);
      this.designationForm.controls['designation_short_name'].setValue(data.designation_short_name);
      this.designationForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.designationForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteDesignationInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let designationId = this.rowData.designation_id;
    this.DesignationService.DeleteDesignation(designationId).subscribe(data => {
      this.massage = null;
      this.loadAllDesignations();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllDesignations() {
    this.DesignationService.getAllDesignation().subscribe(data => {
      this.designations = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const designationdata = this.designationForm.value;
    if (!(designationdata.designation_code)) {
      return this.notifyService.ShowNotification(2, "Please enter designation code")
    }
    if (!(designationdata.designation_name)) {
      return this.notifyService.ShowNotification(2, "Please enter designation name")
    }
    if (!(designationdata.designation_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter designation short name")
    }
    this.CreateDesignation(designationdata);
    this.designationForm.reset();
  }

  resetForm() {
    this.designationForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDesignations();
  }
  
  CreateDesignation(designationdata: any) {

    if (this.designationIdUpdate == null) {

      this.DesignationService.CreateDesignation(designationdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDesignations();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.designationIdUpdate = null;
          this.designationForm.reset();
          //this.displayBasic = false;
        }
      );
    }
    else
    {
      designationdata.designation_id = this.designationIdUpdate;
      designationdata.company_corporate_id = this.companyCorporateId;
      designationdata.created_datetime = this.createdDate;
      designationdata.db_server_date_time = this.serverDate;
      designationdata.created_user_id = this.createdUserId;

      this.DesignationService.UpdateDesignation(designationdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDesignations();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.designationIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

