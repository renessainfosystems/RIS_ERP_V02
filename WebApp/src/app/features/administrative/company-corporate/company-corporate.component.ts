import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import CompanyCorporate from './company-corporate.model';
import { CompanyCorporateService } from './company-corporate.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
    selector: 'app-company-corporate',
    templateUrl: './company-corporate.component.html',
    styleUrls: ['./company-corporate.component.css']
})
export class CompanyCorporateComponent implements OnInit {

    phone: string;
    // for photo and signature upload

    photourllink: string = "assets/images/user-photo1.png";
    userImage: any;
    selectFile(event) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result
            }
        }
    }

    rowData: any;
    dataSaved = false;
    companyCorporateForm: any;
    allCompanyCorporate: Observable<CompanyCorporate[]>;
    selection = new SelectionModel<CompanyCorporate>(true, []);
    companyCorporateIdUpdate = null;
    createdDate = null;
    serverDate = null;
    createdUserId = null;
    massage = null;
    displayedColumns: string[] = ['CompanyCorporateName', 'Remarks'];

    selectedCountry: CompanyCorporate;
    allCountry: CompanyCorporate[];

    selectedDivision: CompanyCorporate;
    allDivision: CompanyCorporate[];

    selectedDistrict: CompanyCorporate;
    allDistrict: CompanyCorporate[];

    selectedCompanyCorporate: CompanyCorporate;
    companyCorporates: CompanyCorporate[];
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
    constructor(private formbulider: FormBuilder, private CompanyCorporateService: CompanyCorporateService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit(): void {

        if (this.companyCorporates !== null) {

            let companyCorporateId = 1;
            this.CompanyCorporateService.getCompanyCorporateById(companyCorporateId).subscribe(data => {
                this.massage = null;
                this.dataSaved = false;
                this.companyCorporateIdUpdate = data.company_corporate_id;
                this.createdDate = data.created_datetime;
                this.serverDate = data.db_server_date_time;
                this.createdUserId = data.created_user_id;
                this.companyCorporateForm.controls['company_corporate_name'].setValue(data.company_corporate_name);
                this.companyCorporateForm.controls['company_corporate_short_name'].setValue(data.company_corporate_short_name);
                this.companyCorporateForm.controls['countryObj'].setValue(data.country_id);
                this.onSelectByCountryId(data.country_id);
                this.companyCorporateForm.controls['divisionObj'].setValue(data.division_id);
                this.onSelectByDivisionId(data.division_id);
                this.companyCorporateForm.controls['districtObj'].setValue(data.district_id);
                this.companyCorporateForm.controls['city'].setValue(data.city);
                this.companyCorporateForm.controls['ps_area'].setValue(data.ps_area);
                this.companyCorporateForm.controls['post_code'].setValue(data.post_code);
                this.companyCorporateForm.controls['block'].setValue(data.block);
                this.companyCorporateForm.controls['road_no'].setValue(data.road_no);
                this.companyCorporateForm.controls['house_no'].setValue(data.house_no);
                this.companyCorporateForm.controls['flat_no'].setValue(data.flat_no);
                this.companyCorporateForm.controls['address_note'].setValue(data.address_note);
                this.companyCorporateForm.controls['phone'].setValue(data.phone);
                this.companyCorporateForm.controls['email'].setValue(data.email);
                this.companyCorporateForm.controls['web_url'].setValue(data.web_url);
                this.companyCorporateForm.controls['slogan'].setValue(data.slogan);
                this.companyCorporateForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
                this.companyCorporateForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
                this.companyCorporateForm.controls['remarks'].setValue(data.remarks);
                this.companyCorporateForm.controls['logo'].setValue(data.logo);
                this.photourllink = data.logo;
            });
        }

        this.companyCorporateForm = this.formbulider.group({
            company_corporate_name: [null, [Validators.required]],
            company_corporate_short_name: [null, [Validators.required]],
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
            phone: [null, [Validators.required]],
            email: [null, [Validators.required]],
            web_url: [null, [Validators.required]],
            logo: [null, [Validators.required]],
            slogan: [null, [Validators.required]],
            name_in_local_language: [null, [Validators.required]],
            short_name_in_local_language: [null, [Validators.required]],
            remarks: [null, [Validators.required]]
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
        return this.companyCorporates ? this.first === (this.companyCorporates.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.companyCorporates ? this.first === 0 : true;
    }

    loadAllCountryCboList() {
        this.CompanyCorporateService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.CompanyCorporateService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
        this.allDistrict = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.CompanyCorporateService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;

    }

    selectRow(companyCorporate) {
        this.rowData = companyCorporate;
    }

    deleteCompanyCorporateInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let companyCorporateId = this.rowData.company_corporate_id;
        this.CompanyCorporateService.deleteCompanyCorporate(companyCorporateId).subscribe(data => {
            this.massage = null;
            this.loadAllCompanyCorporates();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    loadAllCompanyCorporates() {
        this.CompanyCorporateService.getAllCompanyCorporate().subscribe(data => {
            this.companyCorporates = data;
        });
    }

    onFormSubmit() {
        this.dataSaved = false;
        const companyCorporatedata = this.companyCorporateForm.value;
        if (!(companyCorporatedata.company_corporate_name)) {
            return this.notifyService.ShowNotification(2, "Please enter corporate name")
        }
        if (!(companyCorporatedata.company_corporate_short_name)) {
            return this.notifyService.ShowNotification(2, "Please enter corporate short name")
        }
        companyCorporatedata.country_id = companyCorporatedata.countryObj;
        if (!(companyCorporatedata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please select country")
        }
        this.onSelectByCountryId(companyCorporatedata.country_id);
        companyCorporatedata.division_id = companyCorporatedata.divisionObj;
        this.onSelectByDivisionId(companyCorporatedata.division_id);
        companyCorporatedata.district_id = companyCorporatedata.districtObj;
        this.createCompanyCorporate(companyCorporatedata);
    }

    resetForm() {
        this.companyCorporateForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.loadAllCompanyCorporates();
    }


    createCompanyCorporate(companyCorporatedata: any) {
        let formData = new FormData();
        for (const key of Object.keys(this.companyCorporateForm.value)) {
            const value = this.companyCorporateForm.value[key];
            if (key == "year_established") {
                let date = new Date(value).toISOString();
                formData.append("year_established", date);
            }
            else {

                formData.append(key, value);
            }
        }

        if (this.companyCorporateIdUpdate == null) {

            this.CompanyCorporateService.createCompanyCorporate(formData).subscribe(
                result => {
                    this.dataSaved = true;
                    this.loadAllCompanyCorporates();
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    this.companyCorporateIdUpdate = null;
                    this.displayBasic = false;
                }
            );
        } else {
            formData.append("company_corporate_id", this.companyCorporateIdUpdate);
            formData.append("created_datetime", this.createdDate);
            formData.append("db_server_date_time", this.serverDate);
            formData.append("created_user_id", this.createdUserId);
            this.CompanyCorporateService.updateCompanyCorporate(formData).subscribe(result => {
                this.dataSaved = true;
                this.loadAllCompanyCorporates();
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.displayBasic = false;
            });
        }
    }


    onSelectImage(event) {

        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result;
            }
            //alert(this.photourllink)
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                this.userImage.nativeElement.innerText = file.name;
                this.companyCorporateForm.patchValue({
                    ImageUpload: file
                });
            }
        }
    }

}



