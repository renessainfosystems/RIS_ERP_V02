import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { RetailerInfoService } from './retailerinfo.service';

@Component({
    selector: 'app-retailerinfo',
    templateUrl: './retailerinfo.component.html',
    styleUrls: ['./retailerinfo.component.css']
})
export class RetailerinfoComponent implements OnInit {
    @ViewChild('retailerinfoImage', {
        static: true
    }) retailerinfoImage;
    @ViewChild('retailerContactinfoImage', {
        static: true
    }) retailerContactinfoImage;

    retailerinfoForm: any;//RetailerFormName  
    retailerinfoList: any[];//List Retailerinfo
    retailerinfodataSource: any[];//single retailerinfo
    selectedretailerinfo: any;// Selected Retailerinfo  
    isRetailerinfoEdit: boolean = false;
    nodeSelected: boolean = false;

    retailercontactForm: any;//Retailer Contact Form
    isRetailerContactinfoEdit: boolean = false;
    retailercontactinfoList: any[];//List Retailer Contact info
    selectedretailercontactinfo: any;// Selected Retailerinfo

    retailerlocationForm: any;//Retailer Contact Form
    isRetailerLocationinfoEdit: boolean = false;
    retailerlocationinfoList: any[];//List Retailer Contact info
    selectedretailerlocationinfo: any;// Selected Retailerinfo 

    //declare dropdown List Property
    selectedDomicile: any;
    allDomicile: any[];

    selectedContinent: any;
    allContinent: any[];

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

    selectedBusinessActivities: any;
    allBusinessActivities: any[];

    selectedIndustrySector: any;
    allIndustrySector: any[];

    selectedIndustrySubSector: any;
    allIndustrySubSector: any[];

    selectedAllOwnershipType: any;
    allOwnershipType: any[];

    selectedAllOrganazationType: any;
    allOrganazationType: any[];

    selectedAllRegisterAuthority: any;
    allRegisterAuthority: any[];

    selectedAllRegulator: any;
    allRegulator: any[];

    selectedZone: any;
    allZone: any[];

    selectedPreferredMethod: any;
    allPreferredMethod: any[];

    selectedSecurityType: any;
    allSecurityType: any[];

    allRetailerInfo: any[];
    allGender: any[];
    allReligion: any[];
    allBloodGroup: any[];

    first = 0;
    rows = 10;
    //end dropdown List prperty
    rowData: any;
    // for delete data modal
    display: boolean = false;
    rowSelected: boolean = false;
    selected = true;
    collapsedempInfo = true;
    collapsedempDetails = false;
    collapsed = false;
    checked: boolean = false;
    index: number = 0;
    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }

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

    constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private retailerinfoService: RetailerInfoService) {

    }

    clear() {
        this.retailerinfoForm = this.formbulider.group({
            code: [''],
            retailerinfo_name: [''],
            ImageUpload: new FormControl(''),
            SignatureUpload: new FormControl('')
        });


    }
    ngOnInit(): void {
        this.retailerinfoService.getAllRetailerInfo().subscribe(data => this.retailerinfoList = data);
        //this.retailerinfoService.getAllRetailerContactInfo().subscribe(data => this.retailercontactinfoList = data);
        //this.retailerinfoService.getAllRetailerLocationInfo().subscribe(data => this.retailerlocationinfoList = data);

        this.retailerinfoForm = this.formbulider.group({
            retailer_info_code: ['', [Validators.required]],
            retailer_info_short_name: ['', [Validators.required]],
            retailer_info_name: ['', [Validators.required]],            
            trade_license: null,
            trade_license_date: null,
            TIN: '',
            BIN: '',
            domicile_enum_id: ['', [Validators.required]],
            domicile_enum_name: ['', [Validators.required]],
            business_type_enum_id: '',
            business_type_enum_name: '',
            industry_sector_id: ['', [Validators.required]],
            industry_sub_sector_id: '',
            ownership_type_id: ['', [Validators.required]],
            organization_type_enum_id: '',
            organization_type_enum_name: '',
            registry_authority_id: '',
            regulator_id: '',
            currency_id: ['', [Validators.required]],
            security_type_enum_id: '',
            security_type_enum_name: '',
            prefered_method_enum_id: '',
            prefered_method_enum_name: '',
            internal_credit_rating: [0],
            maximum_credit: [0],
            allowable_credit: [0],
            credit_days: [0],
            mobile: '',
            phone: '',
            email: '',
            web_url: '',
            logo_path: '',
            continent_enum_id: ['', [Validators.required]],
            continent_enum_name: ['', [Validators.required]],
            country_id: ['', [Validators.required]],
            division_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]],
            thana_id: ['', [Validators.required]],
            zone_id: '',
            ps_area: '',
            post_code: '',
            block: '',
            road_no: '',
            house_no: '',
            flat_no: '',
            address_note: '',
            ImageUpload: new FormControl(''),

        });

        this.retailercontactForm = this.formbulider.group({
            retailer_contact_info_code: ['', [Validators.required]],
            retailer_info_id: ['', [Validators.required]],
            person_name: ['', [Validators.required]],
            person_designation: ['', [Validators.required]],
            father_name: '',
            mother_name: '',
            date_of_birth: '',
            religion_enum_id: '',
            nationality: '',
            national_id_no: '',
            birth_certificate_no: '',
            passport_no: '',
            mobile: '',
            phone: '',
            email: '',
            emergency_contact: '',
            blood_group_enum_id: '',
            image_path: '',
            permanent_country_id: ['', [Validators.required]],
            permanent_division_id: ['', [Validators.required]],
            permanent_district_id: ['', [Validators.required]],
            permanent_thana_id: ['', [Validators.required]],
            permanent_zone_id: '',
            permanent_ps_area: '',
            permanent_post_code: '',
            permanent_block: '',
            permanent_road_no: '',
            permanent_house_no: '',
            permanent_flat_no: '',
            present_country_id: ['', [Validators.required]],
            present_division_id: ['', [Validators.required]],
            present_district_id: ['', [Validators.required]],
            present_thana_id: ['', [Validators.required]],
            present_zone_id: '',
            present_ps_area: '',
            present_post_code: '',
            present_block: '',
            present_road_no: '',
            present_house_no: '',
            present_flat_no: '',
            ImageUpload: new FormControl(''),

        });

        this.retailerlocationForm = this.formbulider.group({
            retailer_location_info_code: ['', [Validators.required]],
            retailer_info_id: ['', [Validators.required]],
            retailer_location_info_name: ['', [Validators.required]],
            retailer_location_info_short_name: ['', [Validators.required]],
            trade_license: '',
            trade_license_date: null,
            mobile: '',
            phone: '',
            email: '',
            emergency_contact: '',
            country_id: ['', [Validators.required]],
            division_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]],
            thana_id: ['', [Validators.required]],
            ps_area: '',
            post_code: '',
            block: '',
            road_no: '',
            house_no: '',
            flat_no: '',
            address_note: '',

        });

        //Load Dropdown
        this.loadAllDomicileEnum();
        this.loadAllContinentEnum();
        this.loadAllCountryCboList();
        this.loadAllCurrencyCboList();
        this.loadAllBusinessActivitiesEnum();
        this.loadAllSectorCboList();
        this.loadAllOwnershipTypeCboList();
        this.loadAllOrganazationTypeEnum();
        this.loadAllRegisterAuthorityCboList();
        this.loadAllRegulatorCboList();
        this.loadAllZoneCboList();
        this.loadAllPreferredMethodEnum();
        this.loadAllSecurityTypeEnum();
        this.loadAllRetailerInfoCboList();
        this.loadAllGenderEnum();
        this.loadAllReligionEnum();
        this.loadAllBloodGroupEnum();
    }

    selectRow(retailerinfo) {
        this.rowData = retailerinfo;
    }

    onRowSelect(event) {
        debugger;
        // this.toggle();
        this.nodeSelected = true;
        this.rowData = event.data;

    }
    onRowUnselect(event) {
        // this.toggle();
        this.nodeSelected = false;
        this.rowData = null;

    }


    toggle() {
        if (this.collapsedempInfo) {
            this.collapsedempDetails = true;
            this.collapsedempInfo = false;
        }
        else {
            this.collapsedempInfo = true;
            this.collapsedempDetails = false;
        }
    }
    toggleAddress() {
        if (this.collapsed) {
            this.collapsed = false;
        }
        else {
            this.collapsed = true;
        }

    }

    toggleContactAddress() {
        if (this.collapsed) {
            this.collapsed = false;
        }
        else {
            this.collapsed = true;
        }

    }

    btnNew() {

        this.toggle();
    }

    loadRetailerinfoToEdit() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getRetailerInfoById(retailerinfoId).subscribe(data => {
            if (data != null) {
                this.isRetailerinfoEdit = true;
            }

            this.retailerinfoForm.controls['retailer_info_code'].setValue(data.RetailerInfoCode);
            this.retailerinfoForm.controls['retailer_info_short_name'].setValue(data.RetailerInfoShortName);
            this.retailerinfoForm.controls['retailer_info_name'].setValue(data.RetailerInfoName);            
            this.retailerinfoForm.controls['trade_license'].setValue(data.TradeLicense);
            this.retailerinfoForm.controls['trade_license_date'].setValue(new Date(data.TradeLicenseDate));
            this.retailerinfoForm.controls['TIN'].setValue(data.TIN);
            this.retailerinfoForm.controls['BIN'].setValue(data.BIN);
            this.retailerinfoForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
            this.retailerinfoForm.controls['domicile_enum_name'].setValue(data.DomicileEnumName);
            this.retailerinfoForm.controls['business_type_enum_id'].setValue(data.BusinessTypeEnumId);
            this.retailerinfoForm.controls['business_type_enum_name'].setValue(data.BusinessTypeEnumName);
            this.retailerinfoForm.controls['industry_sector_id'].setValue(data.IndustrySectorId);
            this.onSelectBySectorId(data.IndustrySectorId);
            this.retailerinfoForm.controls['industry_sub_sector_id'].setValue(data.IndustrySubSectorId);
            this.retailerinfoForm.controls['ownership_type_id'].setValue(data.OwnershipTypeId);
            this.retailerinfoForm.controls['currency_id'].setValue(data.CurrencyId);
            this.retailerinfoForm.controls['mobile'].setValue(data.Mobile);
            this.retailerinfoForm.controls['phone'].setValue(data.Phone);
            this.retailerinfoForm.controls['email'].setValue(data.Email);
            this.retailerinfoForm.controls['web_url'].setValue(data.WebUrl);
            this.retailerinfoForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.retailerinfoForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.retailerinfoForm.controls['district_id'].setValue(data.DistrictId);
            this.onSelectByDistrictId(data.DistrictId);
            this.retailerinfoForm.controls['thana_id'].setValue(data.ThanaId);
            this.retailerinfoForm.controls['zone_id'].setValue(data.ZoneId);
            this.retailerinfoForm.controls['ps_area'].setValue(data.PSArea);
            this.retailerinfoForm.controls['post_code'].setValue(data.PostCode);
            this.retailerinfoForm.controls['block'].setValue(data.Block);
            this.retailerinfoForm.controls['road_no'].setValue(data.RoadNo);
            this.retailerinfoForm.controls['house_no'].setValue(data.HouseNo);
            this.retailerinfoForm.controls['flat_no'].setValue(data.FlatNo);
            this.retailerinfoForm.controls['address_note'].setValue(data.AddressNote);
            this.retailerinfoForm.controls['image_path'].setValue(data.ImagePath);
            this.photourllink = data.ImagePath;
            this.loadAllRetailerContactinfos();
            this.loadAllRetailerLocationinfos();

        });
        this.toggle();
    }

    deleteRetailerinfo() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerinfoId = this.rowData.retailerinfo_id;
        this.retailerinfoService.getRetailerInfoById(retailerinfoId).subscribe(data => {

            this.loadAllRetailerinfos();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    SaveRetailerinfo() {
        const data = this.retailerinfoForm.value;
        if (!(data.retailer_info_code)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer code")
        }
        if (!(data.retailer_info_short_name)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer short name")
        }
        if (!(data.retailer_info_name)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer name")
        }

        if (!(data.domicile_enum_id)) {
            return this.notifyService.ShowNotification(2, "Please enter domicile")
        }
        if (!(data.industry_sector_id)) {
            return this.notifyService.ShowNotification(2, "Please enter industry sector")
        }
        if (!(data.ownership_type_id)) {
            return this.notifyService.ShowNotification(2, "Please enter ownership type")
        }
        if (!(data.currency_id)) {
            return this.notifyService.ShowNotification(2, "Please enter currency")
        }
        if (!(data.country_id)) {
            return this.notifyService.ShowNotification(2, "Please enter country")
        }
        if (!(data.division_id)) {
            return this.notifyService.ShowNotification(2, "Please enter division")
        }
        if (!(data.district_id)) {
            return this.notifyService.ShowNotification(2, "Please enter district")
        }
        if (!(data.thana_id)) {
            return this.notifyService.ShowNotification(2, "Please enter thana")
        }

        let formData = new FormData();
        for (const key of Object.keys(this.retailerinfoForm.value)) {
            const value = this.retailerinfoForm.value[key];
            if (key == "trade_license_date") {
                let date = new Date(value).toISOString();
                formData.append("trade_license_date", date);
            }
            else {

                formData.append(key, value);
            }
        }

        if (this.isRetailerinfoEdit) {

            data.retailerinfoId = this.rowData.RetailerInfoId;
            formData.append("retailer_info_id", this.rowData.RetailerInfoId);
            this.retailerinfoService.updateRetailerInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllRetailerinfos();
                this.isRetailerinfoEdit = false;
                this.collapsedempInfo = true;
                this.collapsedempDetails = false;
                this.onRowUnselect(event);
            });
        }
        else {

            this.retailerinfoService.createRetailerInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    this.loadAllRetailerinfos();
                    this.resetForm();
                    this.collapsedempInfo = true;
                    this.collapsedempDetails = false;
                }
            );
        }

    }

    // All Dropdown Load here
    loadAllDomicileEnum() {
        this.retailerinfoService.getAllDomicile().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllContinentEnum() {
        this.retailerinfoService.getAllContinent().subscribe(data => {
            this.allContinent = data;
        });
    }

    loadAllCountryCboList() {
        this.retailerinfoService.getAllCountry().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.retailerinfoService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.retailerinfoService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.retailerinfoService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadAllZoneCboList() {
        this.retailerinfoService.getAllZone().subscribe(data => {
            this.allZone = data;
        });
    }

    loadAllCurrencyCboList() {
        this.retailerinfoService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    loadAllBusinessActivitiesEnum() {
        this.retailerinfoService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.retailerinfoService.getAllIndustrySectorCboList().subscribe(data => {
            this.allIndustrySector = data;
        });
    }

    onSelectBySectorId(sectorId: Number) {
        if (sectorId != null) {
            this.retailerinfoService.getAllIndustrySubSectorCboList(sectorId).subscribe(data => {
                this.allIndustrySubSector = data;
            });
        }
        else
            this.allIndustrySubSector = null;
    }

    loadAllOwnershipTypeCboList() {
        this.retailerinfoService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllOrganazationTypeEnum() {
        this.retailerinfoService.getAllOrganaizationEnum().subscribe(data => {
            this.allOrganazationType = data;
        });
    }

    loadAllRegisterAuthorityCboList() {
        this.retailerinfoService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegisterAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.retailerinfoService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllPreferredMethodEnum() {
        this.retailerinfoService.getAllPreferredMethod().subscribe(data => {
            this.allPreferredMethod = data;
        });
    }

    loadAllSecurityTypeEnum() {
        this.retailerinfoService.getAllSecurityType().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    loadAllRetailerInfoCboList() {
        this.retailerinfoService.getRetailerInfoCboList().subscribe(data => {
            this.allRetailerInfo = data;
        });
    }

    loadAllGenderEnum() {
        this.retailerinfoService.getGenderEnum().subscribe(data => {
            this.allGender = data;
        });
    }

    loadAllReligionEnum() {
        this.retailerinfoService.getReligionEnum().subscribe(data => {
            this.allReligion = data;
        });
    }

    loadAllBloodGroupEnum() {
        this.retailerinfoService.getBloodGroupEnum().subscribe(data => {
            this.allBloodGroup = data;
        });
    }

    // All Retailer List 
    loadAllRetailerinfos() {
        this.retailerinfoService.getAllRetailerInfo().subscribe(data => {
            this.retailerinfoList = data;
        });
    }

    loadAllRetailerContactinfos() {
        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getContactInfoByRetailerId(retailerinfoId).subscribe(data => {
            this.retailercontactinfoList = data;
        });
    }

    loadAllRetailerLocationinfos() {
        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getLocationInfoByRetailerId(retailerinfoId).subscribe(data => {
            this.retailerlocationinfoList = data;
        });
    }

    resetForm() {
        this.retailerinfoForm.reset();
        this.isRetailerinfoEdit = false;
        this.loadAllRetailerinfos();
        this.retailerinfodataSource = [];
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
                this.retailerinfoImage.nativeElement.innerText = file.name;
                this.retailerinfoForm.patchValue({
                    ImageUpload: file
                });
            }
        }
    }

    // Contact Info Start

    sameAddress(event) {
        if (event.checked) {
            const data = this.retailercontactForm.value;
            debugger;

            this.retailercontactForm.controls['present_country_id'].setValue(data.permanent_country_id);
            this.onSelectByCountryId(data.permanent_country_id);
            this.retailercontactForm.controls['present_division_id'].setValue(data.permanent_division_id);
            this.onSelectByDivisionId(data.present_division_id);
            this.retailercontactForm.controls['present_district_id'].setValue(data.permanent_district_id);
            this.onSelectByDistrictId(data.permanent_district_id);
            this.retailercontactForm.controls['present_thana_id'].setValue(data.permanent_thana_id);
            this.retailercontactForm.controls['present_zone_id'].setValue(data.permanent_zone_id);
            this.retailercontactForm.controls['present_ps_area'].setValue(data.permanent_ps_area);
            this.retailercontactForm.controls['present_post_code'].setValue(data.permanent_post_code);
            this.retailercontactForm.controls['present_block'].setValue(data.permanent_block);
            this.retailercontactForm.controls['present_house_no'].setValue(data.permanent_house_no);
            this.retailercontactForm.controls['present_road_no'].setValue(data.permanent_road_no);
            this.retailercontactForm.controls['present_flat_no'].setValue(data.permanent_flat_no);

        }
        else {
            this.retailercontactForm.controls['present_country_id'].setValue('');
            this.retailercontactForm.controls['present_district_id'].setValue('');
            this.retailercontactForm.controls['present_division_id'].setValue('');
            this.retailercontactForm.controls['present_thana_id'].setValue('');
            this.retailercontactForm.controls['present_zone_id'].setValue('');
            this.retailercontactForm.controls['present_ps_area'].setValue('');
            this.retailercontactForm.controls['present_post_code'].setValue('');
            this.retailercontactForm.controls['present_block'].setValue('');
            this.retailercontactForm.controls['present_house_no'].setValue('');
            this.retailercontactForm.controls['present_road_no'].setValue('');
            this.retailercontactForm.controls['present_flat_no'].setValue('');
        }
    }


    SaveRetailerContactInfo() {
        const data = this.retailercontactForm.value;
        if (!(data.retailer_info_id)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer name")
        }
        if (!(data.retailer_contact_info_code)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer contact info code")
        }
        if (!(data.person_name)) {
            return this.notifyService.ShowNotification(2, "Please enter contact person name")
        }
        if (!(data.person_designation)) {
            return this.notifyService.ShowNotification(2, "Please enter contact person designation")
        }
        if (!(data.date_of_birth)) {
            return this.notifyService.ShowNotification(2, "Please enter contact person designation")
        }
        if (!(data.mobile)) {
            return this.notifyService.ShowNotification(2, "Please enter mobile number")
        }
        if (!(data.permanent_country_id)) {
            return this.notifyService.ShowNotification(2, "Please enter permanent country")
        }
        if (!(data.permanent_division_id)) {
            return this.notifyService.ShowNotification(2, "Please enter permanent division")
        }
        if (!(data.permanent_district_id)) {
            return this.notifyService.ShowNotification(2, "Please enter permanent district")
        }
        if (!(data.permanent_thana_id)) {
            return this.notifyService.ShowNotification(2, "Please enter permanent thana")
        }
        if (!(data.present_country_id)) {
            return this.notifyService.ShowNotification(2, "Please enter present country")
        }
        if (!(data.present_division_id)) {
            return this.notifyService.ShowNotification(2, "Please enter present division")
        }
        if (!(data.present_district_id)) {
            return this.notifyService.ShowNotification(2, "Please enter present district")
        }
        if (!(data.present_thana_id)) {
            return this.notifyService.ShowNotification(2, "Please enter present thana")
        }

        let formData = new FormData();
        for (const key of Object.keys(this.retailercontactForm.value)) {
            const value = this.retailercontactForm.value[key];
            if (key == "date_of_birth") {
                let date = new Date(value).toISOString();
                formData.append("date_of_birth", date);
            }
            else {
                formData.append(key, value);
            }
        }

        if (this.isRetailerContactinfoEdit) {

            data.retailerContactinfoId = this.rowData.RetailerContactInfoId;
            formData.append("retailer_contact_info_id", this.rowData.RetailerContactInfoId);
            this.retailerinfoService.updateRetailerContactInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllRetailerContactinfos();
                this.isRetailerContactinfoEdit = false;
                this.collapsedempInfo = true;
                this.collapsedempDetails = false;
                this.onRowUnselect(event);
            });
        }
        else {

            this.retailerinfoService.createRetailerContactInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    this.loadAllRetailerContactinfos();
                    this.resetForm();
                    this.collapsedempInfo = true;
                    this.collapsedempDetails = false;
                }
            );
        }

    }

    loadRetailerContactinfoToEdit() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerContactinfoId = this.rowData.RetailerContactInfoId;
        this.retailerinfoService.getRetailerContactInfoById(retailerContactinfoId).subscribe(data => {
            if (data != null) {
                this.isRetailerContactinfoEdit = true;
            }

            this.retailercontactForm.controls['retailer_info_id'].setValue(data.RetailerInfoId);
            this.retailercontactForm.controls['retailer_contact_info_code'].setValue(data.RetailerContactInfoCode);
            this.retailercontactForm.controls['person_name'].setValue(data.PersonName);
            this.retailercontactForm.controls['person_designation'].setValue(data.PersonDesignation);
            this.retailercontactForm.controls['father_name'].setValue(data.FatherName);
            this.retailercontactForm.controls['mother_name'].setValue(data.MotherName);
            this.retailercontactForm.controls['date_of_birth'].setValue(new Date(data.DateOfBirth));
            this.retailercontactForm.controls['religion_enum_id'].setValue(data.ReligionEnumId);
            this.retailercontactForm.controls['nationality'].setValue(data.Nationality);
            this.retailercontactForm.controls['national_id_no'].setValue(data.NationalIdNo);
            this.retailercontactForm.controls['birth_certificate_no'].setValue(data.BirthCertificateNo);
            this.retailercontactForm.controls['passport_no'].setValue(data.PassportNo);
            this.retailercontactForm.controls['mobile'].setValue(data.Mobile);
            this.retailercontactForm.controls['phone'].setValue(data.Phone);
            this.retailercontactForm.controls['email'].setValue(data.Email);
            this.retailercontactForm.controls['emergency_contact'].setValue(data.EmergencyContact);
            this.retailercontactForm.controls['blood_group_enum_id'].setValue(data.BloodGroupEnumId);
            // Permanent Address part
            this.retailercontactForm.controls['permanent_country_id'].setValue(data.PermanentCountryId);
            this.onSelectByCountryId(data.PermanentCountryId);
            this.retailercontactForm.controls['permanent_division_id'].setValue(data.PermanentDivisionId);
            this.onSelectByDivisionId(data.PermanentDivisionId);
            this.retailercontactForm.controls['permanent_district_id'].setValue(data.PermanentDistrictId);
            this.onSelectByDistrictId(data.PermanentDistrictId);
            this.retailercontactForm.controls['permanent_thana_id'].setValue(data.PermanentThanaId);
            this.retailercontactForm.controls['permanent_zone_id'].setValue(data.PermanentZoneId);
            this.retailercontactForm.controls['permanent_ps_area'].setValue(data.PermanentPsArea);
            this.retailercontactForm.controls['permanent_post_code'].setValue(data.PermanentPostCode);
            this.retailercontactForm.controls['permanent_block'].setValue(data.PermanentBlock);
            this.retailercontactForm.controls['permanent_road_no'].setValue(data.PermanentRoadNo);
            this.retailercontactForm.controls['permanent_house_no'].setValue(data.PermanentHouseNo);
            this.retailercontactForm.controls['permanent_flat_no'].setValue(data.PermanentFlatNo);

            //Present Address Part
            this.retailercontactForm.controls['present_country_id'].setValue(data.PresentCountryId);
            this.onSelectByCountryId(data.PresentCountryId);
            this.retailercontactForm.controls['present_division_id'].setValue(data.PresentDivisionId);
            this.onSelectByDivisionId(data.PresentDivisionId);
            this.retailercontactForm.controls['present_district_id'].setValue(data.PresentDistrictId);
            this.onSelectByDistrictId(data.PresentDistrictId);
            this.retailercontactForm.controls['present_thana_id'].setValue(data.PresentThanaId);
            this.retailercontactForm.controls['present_zone_id'].setValue(data.PresentZoneId);
            this.retailercontactForm.controls['present_ps_area'].setValue(data.PresentPsArea);
            this.retailercontactForm.controls['present_post_code'].setValue(data.PresentPostCode);
            this.retailercontactForm.controls['present_block'].setValue(data.PresentBlock);
            this.retailercontactForm.controls['present_road_no'].setValue(data.PresentRoadNo);
            this.retailercontactForm.controls['present_house_no'].setValue(data.PresentHouseNo);
            this.retailercontactForm.controls['present_flat_no'].setValue(data.PresentFlatNo);
            this.retailercontactForm.controls['image_path'].setValue(data.ImagePath);
            this.photourllink = data.ImagePath;

        });
        this.toggle();
    }

    onSelectContactImage(event) {

        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result;
            }
            //alert(this.photourllink)
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                this.retailerContactinfoImage.nativeElement.innerText = file.name;
                this.retailercontactForm.patchValue({
                    ImageUpload: file
                });
            }
        }
    }
    // Contact info end --------***----------

    // Start Retailer Location Info --------****--------


    SaveRetailerLocationInfo() {
        const data = this.retailerlocationForm.value;
        if (!(data.retailer_info_id)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer name")
        }
        if (!(data.retailer_location_info_code)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer location info code")
        }
        if (!(data.retailer_location_info_short_name)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer location short name")
        }
        if (!(data.retailer_location_info_name)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer location name")
        }
        if (!(data.mobile)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer location mobile number")
        }
        if (!(data.country_id)) {
            return this.notifyService.ShowNotification(2, "Please enter country")
        }
        if (!(data.division_id)) {
            return this.notifyService.ShowNotification(2, "Please enter division")
        }
        if (!(data.district_id)) {
            return this.notifyService.ShowNotification(2, "Please enter district")
        }
        if (!(data.thana_id)) {
            return this.notifyService.ShowNotification(2, "Please enter thana")
        }
        if (!(data.address_note)) {
            return this.notifyService.ShowNotification(2, "Please enter retailer location address note")
        }

        let formData = new FormData();
        for (const key of Object.keys(this.retailerlocationForm.value)) {
            const value = this.retailerlocationForm.value[key];
            if (key == "trade_license_date") {
                let date = new Date(value).toISOString();
                formData.append("trade_license_date", date);
            }
            else {
                formData.append(key, value);
            }
        }

        if (this.isRetailerLocationinfoEdit) {

            data.retailerLocationinfoId = this.rowData.RetailerLocationInfoId;
            formData.append("retailer_location_info_id", this.rowData.RetailerLocationInfoId);
            this.retailerinfoService.updateRetailerLocationInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllRetailerLocationinfos();
                this.isRetailerLocationinfoEdit = false;
                this.collapsedempInfo = true;
                this.collapsedempDetails = false;
                this.onRowUnselect(event);
            });
        }
        else {

            this.retailerinfoService.createRetailerLocationInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    this.loadAllRetailerLocationinfos();
                    this.resetForm();
                    this.collapsedempInfo = true;
                    this.collapsedempDetails = false;
                }
            );
        }

    }

    loadRetailerLocationinfoToEdit() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerLocationinfoId = this.rowData.RetailerLocationInfoId;
        this.retailerinfoService.getRetailerLocationInfoById(retailerLocationinfoId).subscribe(data => {
            if (data != null) {
                this.isRetailerLocationinfoEdit = true;
            }
            this.retailerlocationForm.controls['retailer_info_id'].setValue(data.RetailerInfoId);
            this.retailerlocationForm.controls['retailer_location_info_code'].setValue(data.RetailerLocationInfoCode);
            this.retailerlocationForm.controls['retailer_location_info_name'].setValue(data.RetailerLocationInfoName);
            this.retailerlocationForm.controls['retailer_location_info_short_name'].setValue(data.RetailerLocationInfoShortName);
            this.retailerlocationForm.controls['trade_license'].setValue(data.TradeLicense);
            this.retailerlocationForm.controls['trade_license_date'].setValue(new Date(data.TradeLicenseDate));
            this.retailerlocationForm.controls['mobile'].setValue(data.Mobile);
            this.retailerlocationForm.controls['phone'].setValue(data.Phone);
            this.retailerlocationForm.controls['email'].setValue(data.Email);
            this.retailerlocationForm.controls['emergency_contact'].setValue(data.EmergencyContact);
            this.retailerlocationForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.retailerlocationForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.retailerlocationForm.controls['district_id'].setValue(data.DistrictId);
            this.onSelectByDistrictId(data.DistrictId);
            this.retailerlocationForm.controls['thana_id'].setValue(data.ThanaId);
            this.retailerlocationForm.controls['ps_area'].setValue(data.PSArea);
            this.retailerlocationForm.controls['post_code'].setValue(data.PostCode);
            this.retailerlocationForm.controls['block'].setValue(data.Block);
            this.retailerlocationForm.controls['road_no'].setValue(data.RoadNo);
            this.retailerlocationForm.controls['house_no'].setValue(data.HouseNo);
            this.retailerlocationForm.controls['flat_no'].setValue(data.FlatNo);
            this.retailerlocationForm.controls['address_note'].setValue(data.AddressNote);

        });
        this.toggle();
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
