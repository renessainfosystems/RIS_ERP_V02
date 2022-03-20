import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import VatCommissionerate from './vat-commissionerate.model';
import { VatCommissionerateService } from './vat-commissionerate.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-vat-commissionerate',
  templateUrl: './vat-commissionerate.component.html',
  styleUrls: ['./vat-commissionerate.component.css'],  
})
export class VatCommissionerateComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  vatCommissionerateForm: any;
  allVatCommissionerate: Observable<VatCommissionerate[]>;
  selection = new SelectionModel<VatCommissionerate>(true, []);
  vatCommissionerateIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['VatCommissionerateName', 'Remarks'];

  selectedCountry: VatCommissionerate;
  allCountry: VatCommissionerate[];

  selectedDivision: VatCommissionerate;
  allDivision: VatCommissionerate[];

  selectedDistrict: VatCommissionerate;
  allDistrict: VatCommissionerate[];

  selectedVatCommissionerate: VatCommissionerate;
  vatCommissionerates: VatCommissionerate[];
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


  constructor(private formbulider: FormBuilder, private VatCommissionerateService: VatCommissionerateService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.VatCommissionerateService.getAllVatCommissionerate().subscribe(data => this.vatCommissionerates = data);

    this.vatCommissionerateForm = this.formbulider.group({
      vat_commissionerate_name: [null, [Validators.required]],
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
    return this.vatCommissionerates ? this.first === (this.vatCommissionerates.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vatCommissionerates ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.VatCommissionerateService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  onSelectByCountryId(countryId: Number) {
    if (countryId != null) {
      this.VatCommissionerateService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.allDivision = data;
      });
    }
    else
      this.allDivision = null;
      this.allDistrict = null;
  }

  onSelectByDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.VatCommissionerateService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.allDistrict = data;
      });
    }
    else
      this.allDistrict = null;
    
  }
   
  
  selectRow(vatCommissionerate) {
    this.rowData = vatCommissionerate;
  }

  loadVatCommissionerateToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatCommissionerateId = this.rowData.vat_commissionerate_id;
    this.VatCommissionerateService.GetVatCommissionerateById(vatCommissionerateId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.vatCommissionerateIdUpdate = data.vat_commissionerate_id;
      this.companyCorporateId = data.company_corporate_id;
      this.vatCommissionerateForm.controls['countryObj'].setValue(data.country_id);
      this.onSelectByCountryId(data.country_id);
      this.vatCommissionerateForm.controls['divisionObj'].setValue(data.division_id);
      this.onSelectByDivisionId(data.division_id);
      this.vatCommissionerateForm.controls['districtObj'].setValue(data.district_id);
      this.vatCommissionerateForm.controls['vat_commissionerate_name'].setValue(data.vat_commissionerate_name);
      this.vatCommissionerateForm.controls['city'].setValue(data.city);
      this.vatCommissionerateForm.controls['ps_area'].setValue(data.ps_area);
      this.vatCommissionerateForm.controls['post_code'].setValue(data.post_code);
      this.vatCommissionerateForm.controls['block'].setValue(data.block);
      this.vatCommissionerateForm.controls['road_no'].setValue(data.road_no);
      this.vatCommissionerateForm.controls['house_no'].setValue(data.house_no);
      this.vatCommissionerateForm.controls['flat_no'].setValue(data.flat_no);
      this.vatCommissionerateForm.controls['address_note'].setValue(data.address_note);
      this.vatCommissionerateForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteVatCommissionerateInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatCommissionerateId = this.rowData.vat_commissionerate_id;
    this.VatCommissionerateService.DeleteVatCommissionerate(vatCommissionerateId).subscribe(data => {
      this.massage = null;
      this.loadAllVatCommissionerates();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllVatCommissionerates() {
    this.VatCommissionerateService.getAllVatCommissionerate().subscribe(data => {
      this.vatCommissionerates = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const vatCommissioneratedata = this.vatCommissionerateForm.value;
    vatCommissioneratedata.country_id = vatCommissioneratedata.countryObj;
    vatCommissioneratedata.division_id = vatCommissioneratedata.divisionObj;
    vatCommissioneratedata.district_id = vatCommissioneratedata.districtObj;
    this.CreateVatCommissionerate(vatCommissioneratedata);
    this.vatCommissionerateForm.reset();
  }

  resetForm() {
    this.vatCommissionerateForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllVatCommissionerates();
  }
  
  CreateVatCommissionerate(vatCommissioneratedata: any) {

    if (this.vatCommissionerateIdUpdate == null) {

      this.VatCommissionerateService.CreateVatCommissionerate(vatCommissioneratedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllVatCommissionerates();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.vatCommissionerateIdUpdate = null;
          this.displayBasic = false;
        }
      );
    }
    else
    {
      vatCommissioneratedata.vat_commissionerate_id = this.vatCommissionerateIdUpdate;
      vatCommissioneratedata.company_corporate_id = this.companyCorporateId;

      this.VatCommissionerateService.UpdateVatCommissionerate(vatCommissioneratedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllVatCommissionerates();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.vatCommissionerateIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

