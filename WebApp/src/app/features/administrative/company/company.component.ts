import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Company from './company.model';
import { CompanyService } from './company.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { Message, MessageService } from 'primeng/api';


@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']

})
export class CompanyComponent implements OnInit {

    companyForm: FormGroup;
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

    phone: string;

    // for photo and signature upload

    photourllink: string = "assets/images/defaultimg.jpeg";
    selectFile(event) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result
            }
        }
    }
    index: number = 0;
    rowData: any;
    dataSaved = false;
    //companyForm: any;
    allCompany: Observable<Company[]>;
    selection = new SelectionModel<Company>(true, []);
    companyIdUpdate = null;
    createdDate = null;
    serverDate = null;
    createdUserId = null;
    companyCorporateId = null;
    companyGroupId = null;

    massage = null;
    displayedColumns: string[] = ['CompanyName', 'Remarks'];

    selectedCountry: any;
    allCountry: any[];

    selectedDivision: any;
    allDivision: any[];

    selectedDistrict: any;
    allDistrict: any[];

    selectedThana: any;
    allThana: any[];

    selectedCurrency: any;
    allCurrency: any[];

    selectedCompanyGroup: any;
    allCompanyGroup: any[];

    selectedCompany: any;
    companys: any[];
    rowSelected: boolean = false;
    date1: Date;

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
    //displayBasic: boolean = false;
    showBasicDialog() {
        this.resetForm();
        this.toggleGridDisplay();
    }
    constructor(private formbulider: FormBuilder, private CompanyService: CompanyService, private toastr: ToastrService, private notifyService: NotificationService) {


    }

    ngOnInit(): void {
        this.CompanyService.getAllCompany().subscribe(data => this.companys = data);

        this.companyForm = this.formbulider.group({
            company_code: [null],
            company_name: [null, [Validators.required]],
            company_short_name: [null],
            company_prefix: [null, [Validators.required]],
            company_group_id: [null, [Validators.required]],
            country_id: [null, [Validators.required]],
            division_id: [null],
            district_id: [null],
            thana_id: [null],
            currency_id: [null, [Validators.required]],
            company_reg_no: [null],
            company_reg_date: [null],
           company_reg_file_path: [null],
            company_tin_no: [null],
            company_tin_date: [null],
            company_tin_file_path: [null],
            city: [null],
            post_code: [null],
            block: [null],
            road_no: [null],
            house_no: [null],
            flat_no: [null],
            address_note: [null],
            phone: [null],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            web_url: [null],
            logo: [null],
            slogan: [null],
            name_in_local_language: [null],
            address_in_local_language: [null],
            remarks: [null]

        });
        this.loadAllCompanyGroupCboList();
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
        return this.companys ? this.first === (this.companys.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.companys ? this.first === 0 : true;
    }

    loadAllCountryCboList() {
        this.CompanyService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.CompanyService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
        this.allDistrict = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.CompanyService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.CompanyService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadAllCurrencyCboList() {
        this.CompanyService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    loadAllCompanyGroupCboList() {
        this.CompanyService.getAllCompanyGroupCboList().subscribe(data => {
            this.allCompanyGroup = data;
        });
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;
    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }

    loadCompanyToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let companyId = this.rowData.company_id;
        this.CompanyService.getCompanyById(companyId).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.companyIdUpdate = data.company_id;
            this.companyCorporateId = data.company_corporate_id;
            this.companyGroupId = data.company_group_id;
            this.createdDate = data.created_datetime;
            this.serverDate = data.db_server_date_time;
            this.createdUserId = data.created_user_id;
            this.companyForm.controls['company_code'].setValue(data.company_code);
            this.companyForm.controls['company_name'].setValue(data.company_name);
            this.companyForm.controls['company_short_name'].setValue(data.company_short_name);
            this.companyForm.controls['company_prefix'].setValue(data.company_prefix);
            this.companyForm.controls['company_group_id'].setValue(data.company_group_id);
            this.companyForm.controls['country_id'].setValue(data.country_id);
            this.onSelectByCountryId(data.country_id);
            this.companyForm.controls['division_id'].setValue(data.division_id);
            this.onSelectByDivisionId(data.division_id);
            this.companyForm.controls['district_id'].setValue(data.district_id);
            this.onSelectByDistrictId(data.district_id);
            this.companyForm.controls['thana_id'].setValue(data.thana_id);
            this.companyForm.controls['currency_id'].setValue(data.currency_id);
            this.companyForm.controls['company_reg_no'].setValue(data.company_reg_no);
            this.companyForm.controls['company_reg_date'].setValue(data.company_reg_date);
            this.companyForm.controls['company_tin_no'].setValue(data.company_tin_no);
            this.companyForm.controls['company_tin_date'].setValue(data.company_tin_date);
            this.companyForm.controls['city'].setValue(data.city);
            this.companyForm.controls['post_code'].setValue(data.post_code);
            this.companyForm.controls['block'].setValue(data.block);
            this.companyForm.controls['road_no'].setValue(data.road_no);
            this.companyForm.controls['house_no'].setValue(data.house_no);
            this.companyForm.controls['flat_no'].setValue(data.flat_no);
            this.companyForm.controls['address_note'].setValue(data.address_note);
            this.companyForm.controls['phone'].setValue(data.phone);
            this.companyForm.controls['email'].setValue(data.email);
            this.companyForm.controls['web_url'].setValue(data.web_url);
            this.companyForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
            this.companyForm.controls['address_in_local_language'].setValue(data.address_in_local_language);
            this.companyForm.controls['remarks'].setValue(data.remarks);
            this.companyForm.controls['slogan'].setValue(data.slogan);
            this.companyForm.controls['logo'].setValue(data.logo);
            this.companyForm.controls['company_reg_file_path'].setValue(data.company_reg_file_path);
            this.companyForm.controls['company_tin_file_path'].setValue(data.company_tin_file_path);

        });
        this.toggleGridDisplay();
    }

    deleteCompanyInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let companyId = this.rowData.company_id;
        this.CompanyService.deleteCompany(companyId).subscribe(data => {
            if (data.MessageType == 1) {
                this.companys.splice(this.companys.findIndex(item => item.association_id === companyId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    loadAllCompanys() {
        this.CompanyService.getAllCompany().subscribe(data => {
            this.companys = data;
        });
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.companyForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const companydata = this.companyForm.value;
        if (companydata.company_group_id === null) {
            return;
        }
        else if (companydata.company_name === null) {
            return;
        }
        else if (companydata.company_prefix === null) {
            return;
        }
        else if (companydata.company_short_name === null) {
            return;
        }
        else if (companydata.currency_id === null) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.companyForm.invalid) {
            return;
        }
    }

    onAddress(): void {
        this.submitted = true;
        const companydata = this.companyForm.value;
        if ((companydata.country_id === null)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.companyForm.invalid) {
            return;
        }
    }

    
    onFormSubmit(): void {
        //for validation message -----------
        this.submitted = true;
        const companydata = this.companyForm.value;
        
        if (this.companyForm.invalid) {
            return;
        }
        
        //end validation messate -----------

        this.dataSaved = false;
        //const companydata = this.companyForm.value;
        companydata.division_id = companydata.division_id;
        companydata.district_id = companydata.district_id;
        companydata.thana_id = companydata.thana_id;

        this.createCompany(companydata);
    }

    resetForm() {
        this.companyForm.reset();
    }

    createCompany(companydata: any) {

        if (this.companyIdUpdate == null) {

            this.CompanyService.createCompany(companydata).subscribe(
                result => {

                    this.dataSaved = true;
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.companys.unshift(result.Data);
                        this.selectedCompany = result.Data;
                        this.rowSelected = true;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();
                        this.generalIndex();
                        this.companyForm.reset();
                        this.submitted = false;
                    }                    
                }
            );
        }
        else {
            companydata.company_id = this.companyIdUpdate;
            companydata.company_corporate_id = this.companyCorporateId;
            companydata.company_group_id = this.companyGroupId;
            companydata.created_datetime = this.createdDate;
            companydata.db_server_date_time = this.serverDate;
            companydata.created_user_id = this.createdUserId;
            this.CompanyService.updateCompany(companydata).subscribe(result => {
                this.dataSaved = true;
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.companyIdUpdate = null;                
                if (result.MessageType == 1) {
                    this.companys.splice(this.companys.findIndex(item => item.company_id === companydata.company_id), 1);
                    this.companys.unshift(result.Data);
                    this.selectedCompany = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.onRowUnselect(event);
                    this.toggleFormDisplay();
                    this.generalIndex();
                    this.companyForm.reset();
                    this.submitted = false;
                }
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

    generalIndex() {
        this.index = 0;
    }    

    function(e) {
        this.index = e.index;
    }

    openNext() {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 3 : this.index - 1;
    }
}



