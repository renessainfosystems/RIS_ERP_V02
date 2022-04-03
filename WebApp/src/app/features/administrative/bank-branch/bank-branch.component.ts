
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
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


    bankBranchForm: FormGroup;
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

    selectedBankBranchValue: string = '1';


    index: number = 0;
    rowData: any;
    dataSaved = false;
    allBankBranch: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['BankBranchName', 'Remarks'];
    isBankBranchEdit: boolean = false;
    rowSelected: boolean = false;

    selectedBank: any;
    allBank: any[];

    selectedCountry: any;
    allCountry: any[];

    selectedDivision: any;
    allDivision: any[];

    selectedDistrict: any;
    allDistrict: any[];

    selectedBankBranch: any;
    bankBranchs: any[];

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

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private BankBranchService: BankBranchService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {
        this.formInit();
        this.loadAllCountryCboList();
        this.loadAllBankCboList();
        this.loadAllBankBranchs();
    }

    formInit() {
        this.bankBranchForm = this.formbulider.group({
            bank_id: [null, [Validators.required]],
            bank_branch_name: [null, [Validators.required]],
            bank_branch_short_name: [''],
            bank_branch_routing: [null, [Validators.required]],
            bank_branch_contact_number: [''],
            bank_branch_email: [''],
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
            is_branch: ['1', [Validators.required]]

        });
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

    loadAllBankBranchs() {
        this.BankBranchService.getAllBankBranch().subscribe(data => {
            this.bankBranchs = data;
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


    loadBankBranchToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_branch_id = this.rowData.BankBranchId;
        this.BankBranchService.GetBankBranchById(bank_branch_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.bankBranchForm.controls['bank_id'].setValue(data.BankId);
            this.bankBranchForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.bankBranchForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.bankBranchForm.controls['district_id'].setValue(data.DistrictId);
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

            if (data.IsBranch == true) {
                data.IsBranch = '1';
            }
            else {
                data.IsBranch = '0';
            }
            this.bankBranchForm.controls['is_branch'].setValue(data.IsBranch);
            this.isBankBranchEdit = true;

        });

        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.bankBranchForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const bankBranchdata = this.bankBranchForm.value;
        if (bankBranchdata.bank_id === null) {
            return;
        }
        else if (bankBranchdata.bank_branch_name === null) {
            return;
        }
        else if (bankBranchdata.bank_branch_routing === null) {
            return;
        }    
        else {
            this.openNext();
        }
        if (this.bankBranchForm.invalid) {
            return;
        }
    }

    onFormSubmit() {
        //for validation message -----------
        this.submitted = true;
        const bankBranchdata = this.bankBranchForm.value;

        if ((bankBranchdata.country_id === null)) {
            return;
        }
        else if (bankBranchdata.division_id === null) {
            return;
        }
        else if (bankBranchdata.district_id === null) {
            return;
        }
        if (this.bankBranchForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        if (bankBranchdata.is_branch == "1" || bankBranchdata.is_branch == null) {
            bankBranchdata.is_branch = true;
        }
        else {
            bankBranchdata.is_branch = false;
        }

        if (this.isBankBranchEdit) {
            bankBranchdata.bank_branch_id = this.rowData.BankBranchId;
            this.BankBranchService.UpdateBankBranch(bankBranchdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                debugger
                if (result.MessageType == 1) {
                    this.clear();
                    this.bankBranchs.splice(this.bankBranchs.findIndex(item => item.BankBranchId === bankBranchdata.bank_branch_id), 1);
                    this.bankBranchs.unshift(result.Data[0]);
                    this.selectedBankBranch = result.Data[0];
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
            this.BankBranchService.CreateBankBranch(JSON.stringify(bankBranchdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                debugger
                if (result.MessageType == 1) {
                    this.clear();
                    this.bankBranchs.unshift(result.Data[0]);
                    this.selectedBankBranch = result.Data[0];
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
                this.deleteBankBranchInfo();
            },
            reject: () => {

            }
        });
    }

    deleteBankBranchInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let bank_branch_id = this.rowData.BankBranchId;
        this.BankBranchService.DeleteBankBranch(bank_branch_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.bankBranchs.splice(this.bankBranchs.findIndex(item => item.BankBranchId === bank_branch_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.rowData = null;
    }

    resetForm() {
        this.bankBranchForm.reset();
        this.isBankBranchEdit = false;
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






