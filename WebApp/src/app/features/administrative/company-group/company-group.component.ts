import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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

    submitted = false;
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
    nodeSelected: boolean = false;
    dataSaved = false;
    companyGroupForm: any;
    allCompanyGroup: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    companyGroupIdUpdate = null;
    createdDate = null;
    serverDate = null;
    createdUserId = null;
    companyCorporateId = null;
    massage = null;

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
    companyGroups: any[];
    rowSelected: boolean = false;
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
        this.resetForm();
        this.toggleGridDisplay();
    }
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

    constructor(private formbulider: FormBuilder, private CompanyGroupService: CompanyGroupService, private toastr: ToastrService, private notifyService: NotificationService) {


    }

    ngOnInit(): void {
        this.CompanyGroupService.getAllCompanyGroup().subscribe(data => this.companyGroups = data);

        this.companyGroupForm = this.formbulider.group({
            group_name: ['', [Validators.required]],
            group_short_name: ['', [Validators.required]],
            country_id: [null, [Validators.required]],
            division_id: [null],
            district_id: [null],
            currency_id: [null],
            thana_id: [null],
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

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.CompanyGroupService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadAllCurrencyCboList() {
        this.CompanyGroupService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
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
            this.companyGroupForm.controls['country_id'].setValue(data.country_id);
            this.onSelectByCountryId(data.country_id);
            this.companyGroupForm.controls['division_id'].setValue(data.division_id);
            this.onSelectByDivisionId(data.division_id);
            this.companyGroupForm.controls['district_id'].setValue(data.district_id);
            this.onSelectByDistrictId(data.district_id);
            this.companyGroupForm.controls['thana_id'].setValue(data.thana_id);
            this.companyGroupForm.controls['currency_id'].setValue(data.currency_id);
            this.companyGroupForm.controls['city'].setValue(data.city);
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
        this.toggleGridDisplay();
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

    get f(): { [key: string]: AbstractControl } {
        return this.companyGroupForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const companyGroupdata = this.companyGroupForm.value;
        if (companyGroupdata.group_name === null) {
            return;
        }
        else if (companyGroupdata.group_short_name === null) {
            return;
        }
        
        else {
            this.openNext();
        }

        if (this.companyGroupForm.invalid) {
            return;
        }
    }

    onAddress(): void {
        this.submitted = true;
        const companyGroupdata = this.companyGroupForm.value;
        if ((companyGroupdata.country_id === null)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.companyGroupForm.invalid) {
            return;
        }
    }


    onFormSubmit() {
        this.submitted = true;
        const companyGroupdata = this.companyGroupForm.value;

        if (this.companyGroupForm.invalid) {
            return;
        }
        
        companyGroupdata.division_id = companyGroupdata.division_id;
        companyGroupdata.district_id = companyGroupdata.district_id;
        companyGroupdata.currency_id = companyGroupdata.currency_id;
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
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.companyGroups.unshift(result.Data);
                        this.selectedCompanyGroup = result.Data;
                        this.rowSelected = true;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();
                        this.generalIndex();
                        this.companyGroupForm.reset();
                        this.submitted = false;
                    }
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
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.companyGroupIdUpdate = null;
                if (result.MessageType == 1) {
                    this.companyGroups.splice(this.companyGroups.findIndex(item => item.company_group_id === companyGroupdata.company_group_id), 1);
                    this.companyGroups.unshift(result.Data);
                    this.selectedCompanyGroup = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.onRowUnselect(event);
                    this.toggleFormDisplay();
                    this.generalIndex();
                    this.companyGroupForm.reset();
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
        this.index = (this.index === 2) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 2 : this.index - 1;
    }

}



