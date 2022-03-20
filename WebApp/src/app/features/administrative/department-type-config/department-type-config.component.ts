import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import DepartmentTypeConfig from './department-type-config.model';
import { DepartmentTypeConfigService } from './department-type-config.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-department-type-config',
  templateUrl: './department-type-config.component.html',
  styleUrls: ['./department-type-config.component.css'],  
})
export class DepartmentTypeConfigComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  departmentTypeConfigForm: any;
  allDepartmentTypeConfig: Observable<DepartmentTypeConfig[]>;
  selection = new SelectionModel<DepartmentTypeConfig>(true, []);
  departmentTypeConfigIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['DepartmentTypeConfigName', 'Remarks'];
  selectedDepartmentTypeFunctionalityEnum: DepartmentTypeConfig;
  allDepartmentTypeFunctionalityEnum: DepartmentTypeConfig[];

  selectedDepartmentTypeEnum: DepartmentTypeConfig;
  allDepartmentTypeEnum: DepartmentTypeConfig[];


  selectedDepartmentTypeConfig: DepartmentTypeConfig;
  departmentTypeConfigs: DepartmentTypeConfig[];
  first = 0;
  rows = 10;

  checked: true;

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


  constructor(private formbulider: FormBuilder, private DepartmentTypeConfigService: DepartmentTypeConfigService,  private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.DepartmentTypeConfigService.getAllDepartmentTypeConfig().subscribe(data => this.departmentTypeConfigs = data);
    
    this.departmentTypeConfigForm = this.formbulider.group({
      departmentFunctionalityEnumObj: [null, [Validators.required]],
      department_functionality_enum_id: [null, [Validators.required]],
      departmentTypeEnumObj: [null, [Validators.required]],
      department_type_enum_id: [null, [Validators.required]],
      display_name: [null, [Validators.required]],
      is_active: [true, [Validators.required]],

    });
    this.loadAllDepartmentTypeFunctionalityEnum();
    this.loadAllDepartmentTypeEnum();
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
    return this.departmentTypeConfigs ? this.first === (this.departmentTypeConfigs.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.departmentTypeConfigs ? this.first === 0 : true;
  }

  loadAllDepartmentTypeFunctionalityEnum() {
    this.DepartmentTypeConfigService.getAllDepartmentTypeFunctionalityEnum().subscribe(data => {
      this.allDepartmentTypeFunctionalityEnum = data;
    });
  }

  loadAllDepartmentTypeEnum() {
    this.DepartmentTypeConfigService.getAllDepartmentTypeEnum().subscribe(data => {
      this.allDepartmentTypeEnum = data;
    });
  }

  
  selectRow(departmentTypeConfig) {
    this.rowData = departmentTypeConfig;
  }

  loadDepartmentTypeConfigToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let departmentTypeConfigId = this.rowData.department_type_config_id;
    this.DepartmentTypeConfigService.GetDepartmentTypeConfigById(departmentTypeConfigId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.departmentTypeConfigIdUpdate = data.department_type_config_id;
      this.departmentTypeConfigForm.controls['departmentFunctionalityEnumObj'].setValue(data.department_functionality_enum_id);
      this.departmentTypeConfigForm.controls['departmentTypeEnumObj'].setValue(data.department_type_enum_id);
      this.departmentTypeConfigForm.controls['display_name'].setValue(data.display_name);
      this.departmentTypeConfigForm.controls['is_active'].setValue(data.is_active);

    });
    this.displayBasic = true;
  }


  deleteDepartmentTypeConfigInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let departmentTypeConfigId = this.rowData.department_type_config_id;
    this.DepartmentTypeConfigService.DeleteDepartmentTypeConfig(departmentTypeConfigId).subscribe(data => {
      this.massage = null;
      this.loadAllDepartmentTypeConfigs();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllDepartmentTypeConfigs() {
    this.DepartmentTypeConfigService.getAllDepartmentTypeConfig().subscribe(data => {
      this.departmentTypeConfigs = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const departmentTypeConfigdata = this.departmentTypeConfigForm.value;
    departmentTypeConfigdata.department_functionality_enum_id = departmentTypeConfigdata.departmentFunctionalityEnumObj;
    departmentTypeConfigdata.department_type_enum_id = departmentTypeConfigdata.departmentTypeEnumObj;
    this.CreateDepartmentTypeConfig(departmentTypeConfigdata);
    this.departmentTypeConfigForm.reset();
  }

  resetForm() {
    this.departmentTypeConfigForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDepartmentTypeConfigs();
  }
  
  CreateDepartmentTypeConfig(departmentTypeConfigdata: any) {

    if (this.departmentTypeConfigIdUpdate == null) {

      this.DepartmentTypeConfigService.CreateDepartmentTypeConfig(departmentTypeConfigdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDepartmentTypeConfigs();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.departmentTypeConfigIdUpdate = null;
          //this.departmentTypeConfigForm.reset();
          this.displayBasic = false;
        }
      );
    } else {
      departmentTypeConfigdata.department_type_config_id = this.departmentTypeConfigIdUpdate;

      this.DepartmentTypeConfigService.UpdateDepartmentTypeConfig(departmentTypeConfigdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDepartmentTypeConfigs();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.departmentTypeConfigIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

