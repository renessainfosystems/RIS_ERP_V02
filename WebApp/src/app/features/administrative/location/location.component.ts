import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Location from './location.model';
import { LocationService } from './location.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

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

    index: number = 0;
    //end grid and form show hide ********************

    // for photo and signature upload

    photourllink: string = "assets/images/user-photo1.png";
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
    locationForm: FormGroup;
    allLocation: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    locationIdUpdate = null;
    createdDate = null;
    serverDate = null;
    createdUserId = null;
    companyCorporateId = null;
    companyGroupId = null;
    companyId = null;
    massage = null;
    displayedColumns: string[] = ['LocationName', 'Remarks'];

    selectedCountry: any;
    allCountry: any[];

    selectedDivision: any;
    allDivision: any[];

    selectedDistrict: any;
    allDistrict: any[];

    selectedThana: any;
    allThana: any[];

    selectedVatApplicable: any;
    allVatApplicable: any[];

    selectedLocation: any;
    locations: any[];

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

    constructor(private formbulider: FormBuilder, private LocationService: LocationService, private toastr: ToastrService, private notifyService: NotificationService) {


    }

    ngOnInit(): void {
        this.LocationService.getAllLocation().subscribe(data => this.locations = data);

        this.locationForm = this.formbulider.group({
            location_code: [null],
            location_name: [null, [Validators.required]],
            location_short_name: [null, [Validators.required]],
            location_prefix: [null, [Validators.required]],
            country_id: [null, [Validators.required]],
            division_id: [null],
            district_id: [null],
            thana_id: [null],
            vat_applicable_type_enum_id: [null, [Validators.required]],
            location_reg_no: [null],
            location_reg_date: [null],
            location_reg_file_path: [null],
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
            name_in_local_language: [null],
            address_in_local_language: [null],
            remarks: [null],

        });
        this.loadAllCountryCboList();
        this.loadVatApplicableEnumCboList();        
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
        return this.locations ? this.first === (this.locations.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.locations ? this.first === 0 : true;
    }

    loadAllCountryCboList() {
        this.LocationService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.LocationService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
        this.allDivision = null;
        this.allDistrict = null;
        this.allThana = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.LocationService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
            this.allThana = null;
    }

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.LocationService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadVatApplicableEnumCboList() {
        this.LocationService.getVatApplicableEnumCboList().subscribe(data => {
            this.allVatApplicable = data;
        });
    }
     
    onRowSelect(event) {
        debugger;
        // this.toggle();
        this.rowSelected = true;
        this.rowData = event.data;

    }
    onRowUnselect(event) {
        // this.toggle();
        this.rowSelected = false;
        this.rowData = null;

    }

    loadLocationToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let locationId = this.rowData.location_id;
        this.LocationService.getLocationById(locationId).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.locationIdUpdate = data.location_id;
            this.companyCorporateId = data.company_corporate_id;
            this.companyGroupId = data.company_group_id;
            this.companyId = data.company_id;
            this.createdDate = data.created_datetime;
            this.serverDate = data.db_server_date_time;
            this.createdUserId = data.created_user_id;
            this.locationForm.controls['location_code'].setValue(data.location_code);
            this.locationForm.controls['location_name'].setValue(data.location_name);
            this.locationForm.controls['location_short_name'].setValue(data.location_short_name);
            this.locationForm.controls['location_prefix'].setValue(data.location_prefix);
            this.locationForm.controls['country_id'].setValue(data.country_id);
            this.onSelectByCountryId(data.country_id);
            this.locationForm.controls['division_id'].setValue(data.division_id);
            this.onSelectByDivisionId(data.division_id);
            this.locationForm.controls['district_id'].setValue(data.district_id);
            this.onSelectByDistrictId(data.district_id);
            this.locationForm.controls['thana_id'].setValue(data.thana_id);
            this.locationForm.controls['vat_applicable_type_enum_id'].setValue(data.vat_applicable_type_enum_id);
            this.locationForm.controls['location_reg_no'].setValue(data.location_reg_no);
            this.locationForm.controls['location_reg_date'].setValue(data.location_reg_date);
            this.locationForm.controls['city'].setValue(data.city);           
            this.locationForm.controls['post_code'].setValue(data.post_code);
            this.locationForm.controls['block'].setValue(data.block);
            this.locationForm.controls['road_no'].setValue(data.road_no);
            this.locationForm.controls['house_no'].setValue(data.house_no);
            this.locationForm.controls['flat_no'].setValue(data.flat_no);
            this.locationForm.controls['address_note'].setValue(data.address_note);
            this.locationForm.controls['phone'].setValue(data.phone);
            this.locationForm.controls['email'].setValue(data.email);
            this.locationForm.controls['web_url'].setValue(data.web_url);
            this.locationForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
            this.locationForm.controls['address_in_local_language'].setValue(data.address_in_local_language);
            this.locationForm.controls['remarks'].setValue(data.remarks);
            this.locationForm.controls['location_reg_file_path'].setValue(data.location_reg_file_path);

        });
        this.toggleGridDisplay();
    }

    deleteLocationInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let locationId = this.rowData.location_id;
        this.LocationService.deleteLocation(locationId).subscribe(data => {
            this.massage = null;
            this.loadAllLocations();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    loadAllLocations() {
        this.LocationService.getAllLocation().subscribe(data => {
            this.locations = data;


        });
    }


    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.locationForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const locationdata = this.locationForm.value;
        if (locationdata.location_name === null) {
            return;
        }
        else if (locationdata.location_short_name === null) {
            return;
        }
        else if (locationdata.location_prefix === null) {
            return;
        }        
        else {
            this.openNext();
        }
        if (this.locationForm.invalid) {
            return;
        }
    }

    onAddress(): void {
        this.submitted = true;
        const locationdata = this.locationForm.value;
        if ((locationdata.country_id === null)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.locationForm.invalid) {
            return;
        }
    }
    
    onFormSubmit() {
        this.submitted = true;
        const locationdata = this.locationForm.value;

        if (this.locationForm.invalid) {
            return;
        }       

        this.createLocation(locationdata);
    }

    resetForm() {
        this.locationForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.loadAllLocations();
    }

    createLocation(locationdata: any) {

        let formData = new FormData();
        console.log(this.locationForm.value)
        for (const key of Object.keys(this.locationForm.value)) {
            const value = this.locationForm.value[key];
            if (key == "location_reg_date") {
                let date = new Date(value).toISOString();
                formData.append("location_reg_date", date);
            }
            else {

                formData.append(key, value);
            }
        }

        if (this.locationIdUpdate == null) {
            this.LocationService.createLocation(formData).subscribe(
                result => {
                    this.dataSaved = true;
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.locations.unshift(result.Data);
                        this.selectedLocation = result.Data;
                        this.rowSelected = true;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();
                        this.generalIndex();
                        this.locationForm.reset();
                        this.submitted = false;
                    }
                }
            );
        }
        else {            
            formData.append("location_id", this.locationIdUpdate);
            formData.append("company_corporate_id", this.companyCorporateId);
            formData.append("company_group_id", this.companyGroupId);
            formData.append("company_id", this.companyId);
            formData.append("created_datetime", this.createdDate);
            formData.append("db_server_date_time", this.serverDate);
            formData.append("created_user_id", this.createdUserId);

            this.LocationService.updateLocation(formData).subscribe(result => {
                this.dataSaved = true;
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.locationIdUpdate = null;
                if (result.MessageType == 1) {
                    this.locations.splice(this.locations.findIndex(item => item.location_id === locationdata.location_id), 1);
                    this.locations.unshift(result.Data);
                    this.selectedLocation = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.onRowUnselect(event);
                    this.toggleFormDisplay();
                    this.generalIndex();
                    this.locationForm.reset();
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



