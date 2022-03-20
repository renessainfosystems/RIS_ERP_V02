import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import VatCircle from './vat-circle.model';
import { VatCircleService } from './vat-circle.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-vat-circle',
  templateUrl: './vat-circle.component.html',
  styleUrls: ['./vat-circle.component.css'],
})
export class VatCircleComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  vatCircleForm: any;
  allVatCircle: Observable<VatCircle[]>;
  selection = new SelectionModel<VatCircle>(true, []);
  vatCircleIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['VatCircleName', 'Remarks'];

  selectedVatDivision: VatCircle;
  allVatDivision: VatCircle[];

  selectedCountry: VatCircle;
  allCountry: VatCircle[];

  selectedDivision: VatCircle;
  allDivision: VatCircle[];

  selectedDistrict: VatCircle;
  allDistrict: VatCircle[];

  selectedVatCircle: VatCircle;
  vatCircles: VatCircle[];

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

  constructor(private formbulider: FormBuilder, private VatCircleService: VatCircleService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.VatCircleService.getAllVatCircle().subscribe(data => this.vatCircles = data);

    this.vatCircleForm = this.formbulider.group({
      vat_circle_name: [null, [Validators.required]],
      vatDivisionObj: [null, [Validators.required]],
      vat_division_id: [null, [Validators.required]],
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
    this.loadAllVatDivisionCboList();
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
    return this.vatCircles ? this.first === (this.vatCircles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.vatCircles ? this.first === 0 : true;
  }

  loadAllVatDivisionCboList() {
    this.VatCircleService.getAllVatDivisionCboList().subscribe(data => {
      this.allVatDivision = data;
    });
  }

  loadAllCountryCboList() {
    this.VatCircleService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  onSelectByCountryId(countryId: Number) {
    if (countryId != null) {
      this.VatCircleService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.allDivision = data;
      });
    }
    else
      this.allDivision = null;
    this.allDistrict = null;
  }

  onSelectByDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.VatCircleService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.allDistrict = data;
      });
    }
    else
      this.allDistrict = null;
  }

  selectRow(vatCircle) {
    this.rowData = vatCircle;
  }

  loadVatCircleToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatCircleId = this.rowData.vat_circle_id;
    this.VatCircleService.GetVatCircleById(vatCircleId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.vatCircleIdUpdate = data.vat_circle_id;
      this.companyCorporateId = data.company_corporate_id;
      this.vatCircleForm.controls['vatDivisionObj'].setValue(data.vat_division_id);
      this.vatCircleForm.controls['countryObj'].setValue(data.country_id);
      this.onSelectByCountryId(data.country_id);
      this.vatCircleForm.controls['divisionObj'].setValue(data.division_id);
      this.onSelectByDivisionId(data.division_id);
      this.vatCircleForm.controls['districtObj'].setValue(data.district_id);
      this.vatCircleForm.controls['vat_circle_name'].setValue(data.vat_circle_name);
      this.vatCircleForm.controls['city'].setValue(data.city);
      this.vatCircleForm.controls['ps_area'].setValue(data.ps_area);
      this.vatCircleForm.controls['post_code'].setValue(data.post_code);
      this.vatCircleForm.controls['block'].setValue(data.block);
      this.vatCircleForm.controls['road_no'].setValue(data.road_no);
      this.vatCircleForm.controls['house_no'].setValue(data.house_no);
      this.vatCircleForm.controls['flat_no'].setValue(data.flat_no);
      this.vatCircleForm.controls['address_note'].setValue(data.address_note);
      this.vatCircleForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteVatCircleInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let vatCircleId = this.rowData.vat_circle_id;
    this.VatCircleService.DeleteVatCircle(vatCircleId).subscribe(data => {
      this.massage = null;
      this.loadAllVatCircles();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllVatCircles() {
    this.VatCircleService.getAllVatCircle().subscribe(data => {
      this.vatCircles = data;

    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const vatCircledata = this.vatCircleForm.value;
    vatCircledata.vat_division_id = vatCircledata.vatDivisionObj;
    vatCircledata.country_id = vatCircledata.countryObj;
    vatCircledata.division_id = vatCircledata.divisionObj;
    vatCircledata.district_id = vatCircledata.districtObj;
    this.CreateVatCircle(vatCircledata);
    this.vatCircleForm.reset();
  }

  resetForm() {
    this.vatCircleForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllVatCircles();
  }

  CreateVatCircle(vatCircledata: any) {

    if (this.vatCircleIdUpdate == null) {

      this.VatCircleService.CreateVatCircle(vatCircledata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllVatCircles();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.vatCircleIdUpdate = null;
          this.displayBasic = false;
        }
      );
    }
    else {
      vatCircledata.vat_circle_id = this.vatCircleIdUpdate;
      vatCircledata.company_corporate_id = this.companyCorporateId;

      this.VatCircleService.UpdateVatCircle(vatCircledata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllVatCircles();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.vatCircleIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}




