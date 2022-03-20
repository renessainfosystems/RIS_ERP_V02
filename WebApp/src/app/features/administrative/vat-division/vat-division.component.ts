import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import VatDivision from './vat-division.model';
import { VatDivisionService } from './vat-division.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

@Component({
  selector: 'app-vat-division',
  templateUrl: './vat-division.component.html',
  styleUrls: ['./vat-division.component.css'],  
})
export class VatDivisionComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  vatDivisionForm: any;
  allVatDivision: Observable<VatDivision[]>;
  selection = new SelectionModel<VatDivision>(true, []);
  vatDivisionIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['VatDivisionName', 'Remarks'];

  selectedCommissionerate: VatDivision;
  allCommissionerate: VatDivision[];

  selectedCountry: VatDivision;
  allCountry: VatDivision[];

  selectedDivision: VatDivision;
  allDivision: VatDivision[];

  selectedDistrict: VatDivision;
  allDistrict: VatDivision[];

  selectedVatDivision: VatDivision;
  vatDivisions: VatDivision[];

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


  constructor(private formbulider: FormBuilder, private VatDivisionService: VatDivisionService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.VatDivisionService.getAllVatDivision().subscribe(data => this.vatDivisions = data);

    this.vatDivisionForm = this.formbulider.group({
      vat_division_name: [null, [Validators.required]],
      vatCommissionerateObj: [null, [Validators.required]],
      vat_commissionerate_id: [null, [Validators.required]],
      countryObj: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      divisionObj: [null, [Validators.required]],
      division_id: [null, [Validators.required]],
      districtObj: [null, [Validators.required]],
      district_id: [null, [Validators.required]],
      city: [null, [Validators.required]],
      ps_area: [null, [Validators.required]],
      post_code: [null, [Validators.required]],
      block: [null, [Validators.required]],
      road_no: [null, [Validators.required]],
      house_no: [null, [Validators.required]],
      flat_no: [null, [Validators.required]],
      address_note: [null, [Validators.required]],
      remarks: [null, [Validators.required]],

    });
    this.loadAllComissionerateCboList();
    this.loadAllCountryCboList();
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
    return this.vatDivisions ? this.first === (this.vatDivisions.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vatDivisions ? this.first === 0 : true;
  }

  loadAllComissionerateCboList() {
    this.VatDivisionService.getAllVatComissionerateCboList().subscribe(data => {
      this.allCommissionerate = data;
    });
  }

  loadAllCountryCboList() {
    this.VatDivisionService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  onSelectByCountryId(countryId: Number) {
    if (countryId != null) {
      this.VatDivisionService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.allDivision = data;
      });
    }
    else
      this.allDivision = null;
      this.allDistrict = null;
  }

  onSelectByDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.VatDivisionService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.allDistrict = data;
      });
    }
    else
      this.allDistrict = null;

  }
  
  
  selectRow(vatDivision) {
    this.rowData = vatDivision;
  }

  loadVatDivisionToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatDivisionId = this.rowData.vat_division_id;
    this.VatDivisionService.GetVatDivisionById(vatDivisionId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.vatDivisionIdUpdate = data.vat_division_id;
      this.companyCorporateId = data.company_corporate_id;
      this.vatDivisionForm.controls['vatCommissionerateObj'].setValue(data.vat_commissionerate_id);
      this.vatDivisionForm.controls['countryObj'].setValue(data.country_id);
      this.onSelectByCountryId(data.country_id);
      this.vatDivisionForm.controls['divisionObj'].setValue(data.division_id);
      this.onSelectByDivisionId(data.division_id);
      this.vatDivisionForm.controls['districtObj'].setValue(data.district_id);
      this.vatDivisionForm.controls['vat_division_name'].setValue(data.vat_division_name);
      this.vatDivisionForm.controls['city'].setValue(data.city);
      this.vatDivisionForm.controls['ps_area'].setValue(data.ps_area);
      this.vatDivisionForm.controls['post_code'].setValue(data.post_code);
      this.vatDivisionForm.controls['block'].setValue(data.block);
      this.vatDivisionForm.controls['road_no'].setValue(data.road_no);
      this.vatDivisionForm.controls['house_no'].setValue(data.house_no);
      this.vatDivisionForm.controls['flat_no'].setValue(data.flat_no);
      this.vatDivisionForm.controls['address_note'].setValue(data.address_note);
      this.vatDivisionForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteVatDivisionInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatDivisionId = this.rowData.vat_division_id;
    this.VatDivisionService.DeleteVatDivision(vatDivisionId).subscribe(data => {
      this.massage = null;
      this.loadAllVatDivisions();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllVatDivisions() {
    this.VatDivisionService.getAllVatDivision().subscribe(data => {
      this.vatDivisions = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const vatDivisiondata = this.vatDivisionForm.value;
    vatDivisiondata.vat_commissionerate_id = vatDivisiondata.vatCommissionerateObj;
    vatDivisiondata.country_id = vatDivisiondata.countryObj;
    vatDivisiondata.division_id = vatDivisiondata.divisionObj;
    vatDivisiondata.district_id = vatDivisiondata.districtObj;
    this.CreateVatDivision(vatDivisiondata);
    this.vatDivisionForm.reset();
  }

  resetForm() {
    this.vatDivisionForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllVatDivisions();
  }
  
  CreateVatDivision(vatDivisiondata: any) {

    if (this.vatDivisionIdUpdate == null) {

      this.VatDivisionService.CreateVatDivision(vatDivisiondata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllVatDivisions();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.vatDivisionIdUpdate = null;
          this.displayBasic = false;
        }
      );
    }
    else
    {
      vatDivisiondata.vat_division_id = this.vatDivisionIdUpdate;
      vatDivisiondata.company_corporate_id = this.companyCorporateId;

      this.VatDivisionService.UpdateVatDivision(vatDivisiondata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllVatDivisions();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.vatDivisionIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}



