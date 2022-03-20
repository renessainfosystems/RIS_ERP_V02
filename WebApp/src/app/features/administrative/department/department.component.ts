import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Department from './department.model';
import { DepartmentService } from './department.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],  
})
export class DepartmentComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  departmentForm: any;
  allDepartment: Observable<Department[]>;
  selection = new SelectionModel<Department>(true, []);
  departmentIdUpdate = null;
  createdDate = null;
  serverDate = null;
  createdUserId = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['DepartmentName', 'Remarks'];
  selectedDepartmentTypeEnum: Department;
  allDepartmentTypeEnum: Department[];

  selectedDepartment: Department;
  departments: Department[];
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


  constructor(private formbulider: FormBuilder, private DepartmentService: DepartmentService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.DepartmentService.getAllDepartment().subscribe(data => this.departments = data);

    this.departmentForm = this.formbulider.group({
      departmentTypeEnumObj: [null, [Validators.required]],
      department_type_id: [null, [Validators.required]],
      department_code: [null, [Validators.required]],
      department_name: [null, [Validators.required]],
      department_short_name: [null, [Validators.required]],
      name_in_local_language: [null, [Validators.required]],
      remarks: [null, [Validators.required]],

    });
    this.loadAllDepartmentTypeEnumList();
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
    return this.departments ? this.first === (this.departments.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.departments ? this.first === 0 : true;
  }


  loadAllDepartmentTypeEnumList() {
    this.DepartmentService.getAllDepartmentTypeEnum().subscribe(data => {
      this.allDepartmentTypeEnum = data;
    });
  }

  selectRow(department) {
    this.rowData = department;
  }

  loadDepartmentToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let departmentId = this.rowData.department_id;
    this.DepartmentService.GetDepartmentById(departmentId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.departmentIdUpdate = data.department_id;
      this.companyCorporateId = data.company_corporate_id;
      this.createdDate = data.created_datetime;
      this.serverDate = data.db_server_date_time;
      this.createdUserId = data.created_user_id;
      this.departmentForm.controls['department_type_id'].setValue(data.department_type_id);
      this.departmentForm.controls['department_code'].setValue(data.department_code);
      this.departmentForm.controls['department_name'].setValue(data.department_name);
      this.departmentForm.controls['department_short_name'].setValue(data.department_short_name);
      this.departmentForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.departmentForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteDepartmentInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let departmentId = this.rowData.department_id;
    this.DepartmentService.DeleteDepartment(departmentId).subscribe(data => {
      this.massage = null;
      this.loadAllDepartments();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllDepartments() {
    this.DepartmentService.getAllDepartment().subscribe(data => {
      this.departments = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const departmentdata = this.departmentForm.value;
    if (!(departmentdata.department_code)) {
      return this.notifyService.ShowNotification(2, "Please enter department code")
    }
    if (!(departmentdata.department_name)) {
      return this.notifyService.ShowNotification(2, "Please enter department name")
    }
    if (!(departmentdata.department_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter department short name")
    }
    if (!(departmentdata.department_type_id)) {
      return this.notifyService.ShowNotification(2, "Please select department type")
    }
    
    this.CreateDepartment(departmentdata);
    this.departmentForm.reset();
  }

  resetForm() {
    this.departmentForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDepartments();
  }
  
  CreateDepartment(departmentdata: any) {

    if (this.departmentIdUpdate == null) {

      this.DepartmentService.CreateDepartment(departmentdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDepartments();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.departmentIdUpdate = null;
          this.departmentForm.reset();
          this.displayBasic = true;
        }
      );
    }
    else
    {
      departmentdata.department_id = this.departmentIdUpdate;
      departmentdata.company_corporate_id = this.companyCorporateId;
      departmentdata.created_datetime = this.createdDate;
      departmentdata.db_server_date_time = this.serverDate;
      departmentdata.created_user_id = this.createdUserId;

      this.DepartmentService.UpdateDepartment(departmentdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDepartments();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.departmentIdUpdate = null;
        this.displayBasic = true;
      });
    }
  }

}

