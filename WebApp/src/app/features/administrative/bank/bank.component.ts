import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
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

    bankForm: FormGroup;
    submitted = false;

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormClose() {
        this.toggleFormDisplay();
        this.generalIndex();
    }
    //end grid and form show hide ********************

    selectedBankValue: string = '1';
    selectedBankTypeValue: string = '1';


    index: number = 0;
    rowData: any;
    dataSaved = false;
/*    bankForm: any;*/
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
        this.resetForm();
        this.toggleGridDisplay();
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
    constructor(public formbulider: FormBuilder, private confirmationService: ConfirmationService,  private BankService: BankService, private toastr: ToastrService, private notifyService: NotificationService) {

    }


    ngOnInit() {
        this.formInit();
        this.loadAllCountryCboList();
        this.loadAllBanks();
    }

    formInit() {
        this.bankForm = this.formbulider.group({
            bank_name: [null, [Validators.required]],
            bank_short_name: [''],
            bank_swift_code: [null, [Validators.required]],
            bank_email: [''],
            bank_web_url: [''],
            country_id: [null, [Validators.required]],
            division_id: [null, [Validators.required]],
            district_id: [null, [Validators.required]],
            city: [''],
            ps_area: [''],
            post_code: [''],
            block: [''],
            road_no: [''],
            house_no: [''],
            flat_no: [''],
            address_note: [''],
            remarks: [''],
            is_bank: ['1', [Validators.required]],
            is_local: ['1', [Validators.required]]
        });
    }

    loadAllCountryCboList() {
        this.BankService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadAllBanks() {
        this.BankService.getAllBank().subscribe(data => {
            this.banks = data;
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


    loadBankToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_id = this.rowData.BankId;
        this.BankService.GetBankById(bank_id).subscribe(data => {
            debugger
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

            if (data.IsBank == true) {
                data.IsBank = '1';
            }
            else {
                data.IsBank = '0';
            }

            if (data.IsLocal == true) {
                data.IsLocal = '1';
            }
            else {
                data.IsLocal = '0';
            }


            this.bankForm.controls['is_bank'].setValue(data.IsBank);
            this.bankForm.controls['is_local'].setValue(data.IsLocal);
            this.isBankEdit = true;

        });
        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.bankForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const bankdata = this.bankForm.value;
        if (bankdata.bank_name === null) {
            return;
        }
        else if (bankdata.bank_short_name === null) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.bankForm.invalid) {
            return;
        }
    }

    onFormSubmit() {

        //for validation message -----------
        this.submitted = true;
        const bankdata = this.bankForm.value;

        if ((bankdata.country_id === null)) {
            return;
        }
        else if (bankdata.division_id === null) {
            return;
        }
        else if (bankdata.district_id === null) {
            return;
        }
        if (this.bankForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        if (bankdata.is_bank == "1" || bankdata.is_bank == null) {
            bankdata.is_bank = true;
        }
        else {
            bankdata.is_bank = false;
        }

        if (bankdata.is_local == "1" || bankdata.is_local == null) {
            bankdata.is_local = true;
        }
        else {
            bankdata.is_local = false;
        }
        if (this.isBankEdit) {
            bankdata.bank_id = this.rowData.BankId;
            this.BankService.UpdateBank(bankdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.banks.splice(this.banks.findIndex(item => item.BankId === bankdata.bank_id), 1);
                    this.banks.unshift(result.Data[0]);
                    this.selectedBank = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                    this.toggleFormDisplay();
                    this.generalIndex();
                    this.submitted = false;


                }
            });
        }
        else {
            this.BankService.CreateBank(JSON.stringify(bankdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.banks.unshift(result.Data[0]);
                    this.selectedBank = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;       
                    this.toggleFormDisplay();
                    this.generalIndex();
                    this.submitted = false;
                }
            });
        }
    }

    deleteModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteBankInfo();
            },
            reject: () => {

            }
        });
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
        this.rowData = null;
    }

    resetForm() {
        this.bankForm.reset();
        this.isBankEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }

    generalIndex() {
        this.index = 0;
    }

    function(e) {
        this.index = e.index;
    }

    openNext() {
        this.index = (this.index === 4) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 4 : this.index - 1;
    }

}





