import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { BankService } from './bank.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {

    is_bank: any = true;
    is_local: any = true;

    rowData: any;
    dataSaved = false;
    bankForm: any;
    allBank: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['BankName', 'Remarks'];
    isBankEdit: boolean = false;
    rowSelected: boolean = false;

    selectedCountry: any;
    allCountry: any[];

    selectedDivision: any;
    allDivision: any[];

    selectedDistrict: any;
    allDistrict: any[];

    selectedBank: any;
    banks: any[];

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
        this.bankForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.displayBasic = true;
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;
    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }

    /*  constructor(public fb: FormBuilder) { }*/
    constructor(public formbulider: FormBuilder, private BankService: BankService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {
        this.formInit();
        this.loadAllCountryCboList();
        this.loadAllBanks();
    }

    formInit() {
        this.bankForm = this.formbulider.group({
            bank_name: ['', [Validators.required]],
            bank_short_name: [''],
            bank_swift_code: ['', [Validators.required]],
            bank_email: [''],
            bank_web_url: [''],
            country_id: [null],
            division_id: [null],
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
            is_bank: ['true', [Validators.required]],
            is_local: ['true', [Validators.required]]
        });
    }

    loadAllCountryCboList() {
        this.BankService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadAllBanks() {
        this.BankService.getAllBank().subscribe(data => {
            debugger
            this.banks = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.BankService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                debugger
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.BankService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }


    loadBankToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_id = this.rowData.BankId;
        this.BankService.GetBankById(bank_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.bankForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.bankForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.bankForm.controls['district_id'].setValue(data.DistrictId);
            this.bankForm.controls['bank_name'].setValue(data.BankName);
            this.bankForm.controls['bank_short_name'].setValue(data.BankShortName);
            this.bankForm.controls['bank_swift_code'].setValue(data.BankSwiftCode);
            this.bankForm.controls['bank_email'].setValue(data.BankEmail);
            this.bankForm.controls['bank_web_url'].setValue(data.BankWebUrl);
            this.bankForm.controls['city'].setValue(data.City);
            this.bankForm.controls['ps_area'].setValue(data.PsArea);
            this.bankForm.controls['post_code'].setValue(data.PostCode);
            this.bankForm.controls['block'].setValue(data.Block);
            this.bankForm.controls['road_no'].setValue(data.RoadNo);
            this.bankForm.controls['house_no'].setValue(data.HouseNo);
            this.bankForm.controls['flat_no'].setValue(data.FlatNo);
            this.bankForm.controls['address_note'].setValue(data.AddressNote);
            this.bankForm.controls['remarks'].setValue(data.Remarks);
            this.bankForm.controls['is_bank'].setValue(data.IsBank);
            this.bankForm.controls['is_local'].setValue(data.IsLocal);
            this.isBankEdit = true;

        });
        this.displayBasic = true;
    }

    deleteBankInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_id = this.rowData.BankId;
        this.BankService.DeleteBank(bank_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.banks.splice(this.banks.findIndex(item => item.BankId === bank_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    onFormSubmit() {
        debugger
        const bankdata = this.bankForm.value;
        if (!(bankdata.bank_name)) {
            return this.notifyService.ShowNotification(2, "Please Input Bank Name")
        }
        if (!(bankdata.bank_swift_code)) {
            return this.notifyService.ShowNotification(2, "Please Input Bank Swift Code")
        }
        if (!(bankdata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please select Country")
        }
        if (!(bankdata.division_id)) {
            return this.notifyService.ShowNotification(2, "Please select Division")
        }
        if (!(bankdata.district_id)) {
            return this.notifyService.ShowNotification(2, "Please select District")
        }
        this.dataSaved = false;
        if (bankdata.is_bank == "true" || bankdata.is_bank == null) {
            bankdata.is_bank = true;
        }
        else {
            bankdata.is_bank = false;
        }

        if (bankdata.is_local == "true" || bankdata.is_local == null) {
            bankdata.is_local = true;
        }
        else {
            bankdata.is_local = false;
        }
        if (this.isBankEdit) {
            bankdata.bank_id = this.rowData.BankId;
            this.BankService.UpdateBank(bankdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                debugger
                if (result.MessageType == 1) {
                    this.clear();
                    this.banks.splice(this.banks.findIndex(item => item.BankId === bankdata.bank_id), 1);
                    this.banks.unshift(result.Data[0]);
                    this.selectedBank = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                }
            });
        }
        else {
            this.BankService.CreateBank(JSON.stringify(bankdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                debugger
                if (result.MessageType == 1) {
                    this.clear();
                    this.banks.unshift(result.Data[0]);
                    this.selectedBank = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                }
            });
        }
    }

    resetForm() {
        this.bankForm.reset();
        this.isBankEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }


}





