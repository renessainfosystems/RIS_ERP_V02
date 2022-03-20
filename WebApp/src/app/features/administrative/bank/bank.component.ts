import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Bank from './bank.model';
import { BankService } from './bank.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {

    is_bank: any = null;
    is_local: any = null;

    rowData: any;
    dataSaved = false;
    bankForm: any;
    allBank: Observable<Bank[]>;
    selection = new SelectionModel<Bank>(true, []);
    bankIdUpdate = null;
    massage = null;



    selectedCountry: Bank;
    allCountry: Bank[];

    selectedDivision: Bank;
    allDivision: Bank[];

    selectedDistrict: Bank;
    allDistrict: Bank[];

    selectedBank: Bank;
    banks: Bank[];

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
    }

    /*  constructor(public fb: FormBuilder) { }*/
    constructor(public formbulider: FormBuilder, private BankService: BankService, private toastr: ToastrService, private notifyService: NotificationService) {

    }



    ngOnInit(): void {


        this.BankService.getAllBank().subscribe(data => {
            this.banks = data;
        });


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
            is_local: [true, [Validators.required]]
        });


        this.loadAllCountryCboList();
        this.loadAllBanks();
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
        return this.banks ? this.first === (this.banks.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.banks ? this.first === 0 : true;
    }


    loadAllCountryCboList() {
        this.BankService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }



    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.BankService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
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

    selectRow(bank) {
        this.rowData = bank;
    }


    loadBankToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_id = this.rowData.BankId;
        this.BankService.GetBankById(bank_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.bankIdUpdate = data.BankId;
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

        });
        this.displayBasic = true;
    }

    deleteBankInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_id = this.rowData.BankId;
        this.BankService.DeleteBank(bank_id).subscribe(data => {
            this.massage = null;
            this.loadAllBanks();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    loadAllBanks() {
        this.BankService.getAllBank().subscribe(data => {
            this.banks = data;
        });
    }

    onFormSubmit() {
        const bankdata = this.bankForm.value;
        if (!(bankdata.bank_name)) {
            return this.notifyService.ShowNotification(2, "Please Input Bank Name")
        }
        if (!(bankdata.bank_swift_code)) {
            return this.notifyService.ShowNotification(2, "Please Input Bank Swift Code")
        }
        if (!(bankdata.country_id_location)) {
            return this.notifyService.ShowNotification(2, "Please select Country")
        }
        if (!(bankdata.division_id_location)) {
            return this.notifyService.ShowNotification(2, "Please select Division")
        }
        if (!(bankdata.district_id_location)) {
            return this.notifyService.ShowNotification(2, "Please select District")
        }
        this.dataSaved = false;
        if (bankdata.is_bank == "true") {
            bankdata.is_bank = true;
        }
        else {
            bankdata.is_bank = false;
        }

        if (bankdata.is_local == "true") {
            bankdata.is_local = true;
        }
        else {
            bankdata.is_local = false;
        }
        this.CreateBank(bankdata);
        this.bankForm.reset();

    }

    resetForm() {
        this.bankForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.loadAllBanks();
    }


    CreateBank(bankdata: any) {
        if (this.bankIdUpdate == null) {
            this.BankService.CreateBank(bankdata).subscribe(
                result => {
                    this.dataSaved = true;
                    this.loadAllBanks();
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    this.bankIdUpdate = null;
                    this.displayBasic = false;
                });
        } else {
            bankdata.bank_id = this.bankIdUpdate;
            this.BankService.UpdateBank(bankdata).subscribe(result => {
                this.dataSaved = true;
                this.loadAllBanks();
                console.log(result);
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.bankIdUpdate = null;
                this.displayBasic = false;
            });
        }
    }


}





