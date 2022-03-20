import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import CompanyGroup from './company-group.model';
import { CompanyGroupService } from './company-group.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-company-group',
  templateUrl: './company-group.component.html',
  styleUrls: ['./company-group.component.css']
})
export class CompanyGroupComponent implements OnInit {


  phone: string;

  // for photo and signature upload

  photourllink: string = "assets/images/user-photo1.png";
  selectFile(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photourllink = event.target.result
      }
    }
  }


  rowData: any;
  nodeSelected: boolean = false;
  dataSaved = false;
  companyGroupForm: any;
  allCompanyGroup: Observable<CompanyGroup[]>;
  selection = new SelectionModel<CompanyGroup>(true, []);
  companyGroupIdUpdate = null;
  createdDate = null;
  serverDate = null;
  createdUserId = null;
  companyCorporateId = null;
  massage = null;

  selectedCountry: CompanyGroup;
  allCountry: CompanyGroup[];

  selectedDivision: CompanyGroup;
  allDivision: CompanyGroup[];

  selectedDistrict: CompanyGroup;
  allDistrict: CompanyGroup[];

  selectedCurrency: CompanyGroup;
  allCurrency: CompanyGroup[];

  selectedCompanyGroup: CompanyGroup;
  companyGroups: CompanyGroup[];
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
  constructor(private formbulider: FormBuilder, private CompanyGroupService: CompanyGroupService, private toastr: ToastrService, private notifyService: NotificationService) {


  }

  ngOnInit(): void {
    this.CompanyGroupService.getAllCompanyGroup().subscribe(data => this.companyGroups = data);

    this.companyGroupForm = this.formbulider.group({
      group_name: ['', [Validators.required]],
      group_short_name: ['', [Validators.required]],
      countryObj: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      divisionObj: [null],
      division_id: [null],
      districtObj: [null],
      district_id: [null],
      currencyObj: [null],
      currency_id: [null],
      city: [null],
      ps_area: [null],
      post_code: [null],
      block: [null],
      road_no: [null],
      house_no: [null],
      flat_no: [null],
      address_note: [null],
      phone: [null],
      email: [null],
      web_url: [null],
      group_logo: [null],
      name_in_local_language: [null],
      address_in_local_language: [null],
      remarks: [null]

    });
    this.loadAllCountryCboList();
    this.loadAllCurrencyCboList();
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
    return this.companyGroups ? this.first === (this.companyGroups.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.companyGroups ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.CompanyGroupService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  onSelectByCountryId(countryId: Number) {
    if (countryId != null) {
      this.CompanyGroupService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.allDivision = data;
      });
    }
    else
      this.allDivision = null;
      this.allDistrict = null;
  }

  onSelectByDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.CompanyGroupService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.allDistrict = data;
      });
    }
    else
      this.allDistrict = null;

  }

  loadAllCurrencyCboList() {
    this.CompanyGroupService.getAllCurrencyCboList().subscribe(data => {
      this.allCurrency = data;
    });
  }

  selectRow(companyGroup) {
    this.rowData = companyGroup;
  }

  onRowSelect(event) {
    debugger;
    this.nodeSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {
    this.nodeSelected = false;
    this.rowData = null;

  }

  loadCompanyGroupToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let companyGroupId = this.rowData.company_group_id;
    this.CompanyGroupService.getCompanyGroupById(companyGroupId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.companyGroupIdUpdate = data.company_group_id;
      this.companyCorporateId = data.company_corporate_id;
      this.createdDate = data.created_datetime;
      this.serverDate = data.db_server_date_time;
      this.createdUserId = data.created_user_id;

      this.companyGroupForm.controls['group_name'].setValue(data.group_name);
      this.companyGroupForm.controls['group_short_name'].setValue(data.group_short_name);
      this.companyGroupForm.controls['countryObj'].setValue(data.country_id);
      this.onSelectByCountryId(data.country_id);
      this.companyGroupForm.controls['divisionObj'].setValue(data.division_id);
      this.onSelectByDivisionId(data.division_id);
      this.companyGroupForm.controls['districtObj'].setValue(data.district_id);
      this.companyGroupForm.controls['currencyObj'].setValue(data.currency_id);
      this.companyGroupForm.controls['city'].setValue(data.city);
      this.companyGroupForm.controls['ps_area'].setValue(data.ps_area);
      this.companyGroupForm.controls['post_code'].setValue(data.post_code);
      this.companyGroupForm.controls['block'].setValue(data.block);
      this.companyGroupForm.controls['road_no'].setValue(data.road_no);
      this.companyGroupForm.controls['house_no'].setValue(data.house_no);
      this.companyGroupForm.controls['flat_no'].setValue(data.flat_no);
      this.companyGroupForm.controls['address_note'].setValue(data.address_note);
      this.companyGroupForm.controls['phone'].setValue(data.phone);
      this.companyGroupForm.controls['email'].setValue(data.email);
      this.companyGroupForm.controls['web_url'].setValue(data.web_url);
      this.companyGroupForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.companyGroupForm.controls['address_in_local_language'].setValue(data.address_in_local_language);
      this.companyGroupForm.controls['remarks'].setValue(data.remarks);
      this.companyGroupForm.controls['group_logo'].setValue(data.group_logo);


    });
    this.displayBasic = true;
  }

  deleteCompanyGroupInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let companyGroupId = this.rowData.company_group_id;
    this.CompanyGroupService.deleteCompanyGroup(companyGroupId).subscribe(data => {
      this.massage = null;
      this.loadAllCompanyGroups();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllCompanyGroups() {
    this.CompanyGroupService.getAllCompanyGroup().subscribe(data => {
      this.companyGroups = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const companyGroupdata = this.companyGroupForm.value;
    if (!(companyGroupdata.group_name)) {
      return this.notifyService.ShowNotification(2, "Please enter group name")
    }
    if (!(companyGroupdata.group_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter group short name")
    }    
    companyGroupdata.country_id = companyGroupdata.countryObj;
    if (!(companyGroupdata.country_id)) {
      return this.notifyService.ShowNotification(2, "Please select country")
    }    
    companyGroupdata.division_id = companyGroupdata.divisionObj;
    companyGroupdata.district_id = companyGroupdata.districtObj;
    companyGroupdata.currency_id = companyGroupdata.currencyObj;
    this.createCompanyGroup(companyGroupdata);
  }

  resetForm() {
    this.companyGroupForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllCompanyGroups();
  }


  createCompanyGroup(companyGroupdata: any) {

    if (this.companyGroupIdUpdate == null) {

      this.CompanyGroupService.createCompanyGroup(companyGroupdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllCompanyGroups();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.companyGroupIdUpdate = null;
          this.displayBasic = false;
        }
      );
    }
    else {
      companyGroupdata.company_group_id = this.companyGroupIdUpdate;
      companyGroupdata.company_corporate_id = this.companyCorporateId;
      companyGroupdata.created_datetime = this.createdDate;
      companyGroupdata.db_server_date_time = this.serverDate;
      companyGroupdata.created_user_id = this.createdUserId;


      this.CompanyGroupService.updateCompanyGroup(companyGroupdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllCompanyGroups();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.companyGroupIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

  onSelectImage(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photourllink = event.target.result
      }
    }

  }

}



