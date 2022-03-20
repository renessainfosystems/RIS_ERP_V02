import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import CompanyBusinessNature from './company-business-nature.model';
import { CompanyBusinessNatureService } from './company-business-nature.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-company-business-nature',
  templateUrl: './company-business-nature.component.html',
  styleUrls: ['./company-business-nature.component.css'],  
})
export class CompanyBusinessNatureComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  businessNatureForm: any;
  allCompanyBusinessNature: Observable<CompanyBusinessNature[]>;
  selection = new SelectionModel<CompanyBusinessNature>(true, []);
  businessNatureIdUpdate: any;
  createdDate = null;
  serverDate = null;
  createdUserId = null;
  companyId = null;
  massage = null;
  displayedColumns: string[] = ['Remarks', 'is_active'];

  selectedCompany: CompanyBusinessNature;
  allCompany: CompanyBusinessNature[];

  selectedCompanyBusinessNatureEnum: CompanyBusinessNature;
  allCompanyBusinessNatureEnum: CompanyBusinessNature[];

  selectedCompanyBusinessNature: CompanyBusinessNature;
  businessNatures: CompanyBusinessNature[];
  first = 0;
  rows = 10;

  checked: boolean = false;

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


  constructor(private formbulider: FormBuilder, private CompanyBusinessNatureService: CompanyBusinessNatureService,  private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.CompanyBusinessNatureService.getAllCompanyBusinessNature().subscribe(data => this.businessNatures = data);

    this.businessNatureForm = this.formbulider.group({
      companyTypeBusinessEnumObj: [null, [Validators.required]],
      company_type_enum_id: ['', [Validators.required]],
      remarks: [null]
    });
    this.loadAllCompanyBusinessNatureEnumList();
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
    return this.businessNatures ? this.first === (this.businessNatures.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.businessNatures ? this.first === 0 : true;
  }

 
  loadAllCompanyBusinessNatureEnumList() {
    this.CompanyBusinessNatureService.getAllCompanyBusinessNatureEnum().subscribe(data => {
      this.allCompanyBusinessNatureEnum = data;
    });
  }

  selectRow(businessNature) {
    this.rowData = businessNature;
  }

  loadCompanyBusinessNatureToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let businessNatureId = this.rowData.company_business_nature_id;
    this.CompanyBusinessNatureService.GetCompanyBusinessNatureById(businessNatureId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.businessNatureIdUpdate = data.company_business_nature_id;
      this.companyId = data.company_id;
      this.createdDate = data.created_datetime;
      this.serverDate = data.db_server_date_time;
      this.createdUserId = data.created_user_id;
      this.businessNatureForm.controls['companyTypeBusinessEnumObj'].setValue(data.company_type_enum_id);
      this.businessNatureForm.controls['is_active'].setValue(data.is_active);      
      this.businessNatureForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteCompanyBusinessNatureInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let businessNatureId = this.rowData.company_business_nature_id;
    this.CompanyBusinessNatureService.DeleteCompanyBusinessNature(businessNatureId).subscribe(data => {
      this.massage = null;
      this.loadAllCompanyBusinessNatures();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllCompanyBusinessNatures() {
    this.CompanyBusinessNatureService.getAllCompanyBusinessNature().subscribe(data => {
      this.businessNatures = data;


    });
  }

  onFormSubmit() {

    this.dataSaved = false;
    const businessNaturedata = this.businessNatureForm.value;
    businessNaturedata.company_type_enum_id = businessNaturedata.companyTypeBusinessEnumObj;
    if (!(businessNaturedata.company_type_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Business Nature")
    }
    this.CreateCompanyBusinessNature(businessNaturedata);
    this.businessNatureForm.reset();
  }

  resetForm() {
    this.businessNatureForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllCompanyBusinessNatures();
  }
  
  CreateCompanyBusinessNature(businessNaturedata: any) {

    if (this.businessNatureIdUpdate == null) {

      this.CompanyBusinessNatureService.CreateCompanyBusinessNature(businessNaturedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllCompanyBusinessNatures();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.businessNatureIdUpdate = null;
          this.displayBasic = true;
        }
      );
    }
    else
    {
      businessNaturedata.company_business_nature_id = this.businessNatureIdUpdate;
      businessNaturedata.company_id = this.companyId;
      businessNaturedata.created_datetime = this.createdDate;
      businessNaturedata.db_server_date_time = this.serverDate;
      businessNaturedata.created_user_id = this.createdUserId;
      this.CompanyBusinessNatureService.UpdateCompanyBusinessNature(businessNaturedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllCompanyBusinessNatures();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.businessNatureIdUpdate = null;
        this.displayBasic = true;
      });
    }
  }

}








