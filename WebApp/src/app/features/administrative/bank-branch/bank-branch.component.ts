
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import BankBranch from './bank-branch.model';
import { BankBranchService } from './bank-branch.service';



@Component({
  selector: 'app-Bank-branch',
  templateUrl: './Bank-branch.component.html',
  styleUrls: ['./Bank-branch.component.css']
})
export class BankBranchComponent implements OnInit {


  is_BankBranch: any = null;

  is_local: any = null;
  //cities2: any[] = [];




  rowData: any;
  dataSaved = false;
  bankBranchForm: any;
  allBankBranch: Observable<BankBranch[]>;
  selection = new SelectionModel<BankBranch>(true, []);
  bankBranchIdUpdate = null;
  massage = null;

  selectedBank: BankBranch;
  allBank: BankBranch[];

  selectedCountry: BankBranch;
  allCountry: BankBranch[];

  selectedDivision: BankBranch;
  allDivision: BankBranch[];

  selectedDistrict: BankBranch;
  allDistrict: BankBranch[];

  selectedBankBranch: BankBranch;
  bankBranchs: BankBranch[];

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

  // for search
  disabled: boolean = true;
  value1: string;

   // for Insert and update data modal

  displayBasic: boolean;
  showBasicDialog() {
    this.displayBasic = true;
    this.resetForm();
  }


  constructor(private formbulider: FormBuilder, private BankBranchService: BankBranchService, private toastr: ToastrService, private notifyService: NotificationService) {

  }


  ngOnInit(): void {


    //this.BankBranchService.getAllBankBranch().subscribe(data =>
    //  this.BankBranchs = data);
    //this.BankBranchService.getAllBankBranch().subscribe(data => {

    //  this.BankBranchs = data;

    //});
    this.bankBranchForm = this.formbulider.group({
      bank_branch_name: ['', [Validators.required]],
      bank_branch_short_name: [''],
      bank_branch_routing: ['', [Validators.required]],
      bank_id: [null],
      bank_branch_contact_number: [''],
      bank_branch_email: [''],

      countryObj: [null],
      country_id: [null],
      divisionObj: [null],
      division_id: [null],
      districtObj: [null],
      district_id: [null],
      city: [''],
      ps_area: [''],
      post_code: [''],
      block: [''],
      road_no: [''],
      house_no: [''],
      flat_no: [''],
      address_note: [''],
      remarks: [''],
      is_branch: [true, [Validators.required]]

      //is_active: ['']

    });

    this.loadAllCountryCboList();
    this.loadAllBankCboList();
    this.loadAllBankBranchs();
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
    return this.bankBranchs ? this.first === (this.bankBranchs.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.bankBranchs ? this.first === 0 : true;
  }

  loadAllBankCboList() {
    this.BankBranchService.getAllBankCboList().subscribe(data => { 
      this.allBank = data;
    });
  }


  loadAllCountryCboList() {
    this.BankBranchService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }



  onSelectByCountryId(countryId: Number) {
    if (countryId != null) {
      this.BankBranchService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.allDivision = data;
      });
    }
    else
      this.allDivision = null;
  }

  onSelectByDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.BankBranchService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.allDistrict = data;
      });
    }
    else
      this.allDistrict = null;

  }

  selectRow(bankBranch) {
    this.rowData = bankBranch;
  }


  loadBankBranchToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let bank_branch_id = this.rowData.BankBranchId;
    this.BankBranchService.GetBankBranchById(bank_branch_id).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.bankBranchIdUpdate = data.BankBranchId;
      this.bankBranchForm.controls['bank_id'].setValue(data.BankId);
      this.bankBranchForm.controls['countryObj'].setValue(data.CountryId);
      this.onSelectByCountryId(data.CountryId);
      this.bankBranchForm.controls['divisionObj'].setValue(data.DivisionId);
      this.onSelectByDivisionId(data.DivisionId);
      this.bankBranchForm.controls['districtObj'].setValue(data.DistrictId);
      this.bankBranchForm.controls['bank_branch_name'].setValue(data.BankBranchName);
      this.bankBranchForm.controls['bank_branch_short_name'].setValue(data.BankBranchShortName);
      this.bankBranchForm.controls['bank_branch_routing'].setValue(data.BankBranchRouting);
      this.bankBranchForm.controls['bank_branch_contact_number'].setValue(data.BankBranchContactNumber);
      this.bankBranchForm.controls['bank_branch_email'].setValue(data.BankBranchEmail);
      this.bankBranchForm.controls['city'].setValue(data.City);
      this.bankBranchForm.controls['ps_area'].setValue(data.PsArea);
      this.bankBranchForm.controls['post_code'].setValue(data.PostCode);
      this.bankBranchForm.controls['block'].setValue(data.Block);
      this.bankBranchForm.controls['road_no'].setValue(data.RoadNo);
      this.bankBranchForm.controls['house_no'].setValue(data.HouseNo);
      this.bankBranchForm.controls['flat_no'].setValue(data.FlatNo);
      this.bankBranchForm.controls['address_note'].setValue(data.AddressNote);
      this.bankBranchForm.controls['remarks'].setValue(data.Remarks);
      this.bankBranchForm.controls['is_branch'].setValue(data.IsBranch);
      //this.BankBranchForm.controls['is_non_BankBranch'].setValue(data.is_non_BankBranch);


    });
    this.displayBasic = true;
  }

  deleteBankBranchInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let bank_branch_id = this.rowData.BankBranchId;
    this.BankBranchService.DeleteBankBranch(bank_branch_id).subscribe(data => {
      this.massage = null;
      this.loadAllBankBranchs();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllBankBranchs() {
    this.BankBranchService.getAllBankBranch().subscribe(data => {
      this.bankBranchs = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const bankBranchdata = this.bankBranchForm.value;
    bankBranchdata.bank_id = bankBranchdata.bank_id;
    bankBranchdata.country_id = bankBranchdata.countryObj;
    bankBranchdata.division_id = bankBranchdata.divisionObj;
    bankBranchdata.district_id = bankBranchdata.districtObj;
    if (bankBranchdata.is_branch == "true") {
      bankBranchdata.is_branch = true;
    }
    else {
      bankBranchdata.is_branch = false;
    }

    this.CreateBankBranch(bankBranchdata);
    this.bankBranchForm.reset();

  }

  resetForm() {
    this.bankBranchForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllBankBranchs();
  }


  CreateBankBranch(bankBranchdata: any) {
    if (this.bankBranchIdUpdate == null) {

      this.BankBranchService.CreateBankBranch(bankBranchdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllBankBranchs();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.bankBranchIdUpdate = null;
          this.displayBasic = false;
        });
    } else {
      bankBranchdata.bank_branch_id = this.bankBranchIdUpdate;
      this.BankBranchService.UpdateBankBranch(bankBranchdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllBankBranchs();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.bankBranchIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }
}






