import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
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

    submitted = false;
    submittedContact = false;
    submittedLocation = false;
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
    allDealerInfo: any[]

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
    dataSaved = false;
    // for delete data modal
    display: boolean = false;
    rowSelected: boolean = false;
    selected = true;
    collapsedempInfo = true;
    collapsedempDetails = false;
    collapsed = false;
    checked: boolean = false;
    index: number = 0;
    indexContact: number = 0;
    indexLocation: number = 0;
    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }

    displayBasic: boolean = false;
    showBasicDialog() {
        this.ngOnInit();
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
        this.retailerIndex();
    }

    // Contact Start
    showBasicDialogContactNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.retailerContactIndex();
        this.gridDisplayContact = true;
        this.formDisplayContact = false;

    }

    showBasicDialogContactGrid() {
        this.toggleGridDisplayContact();
        this.toggleGridDisplay();
        this.retailerContactIndex();

    }
    showBasicDialogContactEdit() {
        this.toggleFormDisplayContact();
        this.toggleGridDisplay();
        this.retailerContactIndex();

    }

    gridDisplayContact = false;
    formDisplayContact = true;

    toggleFormDisplayContact() {
        this.gridDisplayContact = false;
        this.formDisplayContact = true;
        this.retailerContactIndex();
    }

    toggleGridDisplayContact() {
        this.gridDisplayContact = false;
        this.formDisplayContact = true;
    }
    toggleFormCloseContact() {
        this.toggleFormDisplayContact();
        this.retailerContactIndex();
    }

    // Location Start
    showBasicDialogLocationNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.retailerLocationIndex();
        this.gridDisplayLocation = true;
        this.formDisplayLocation = false;

    }

    showBasicDialogLocationGrid() {
        this.toggleGridDisplayLocation();
        this.toggleGridDisplay();
        this.retailerLocationIndex();

    }
    showBasicDialogLocationEdit() {
        this.toggleFormDisplayLocation();
        this.toggleGridDisplay();
        this.retailerLocationIndex();

    }

    gridDisplayLocation = false;
    formDisplayLocation = true;

    toggleFormDisplayLocation() {
        this.gridDisplayLocation = false;
        this.formDisplayLocation = true;
        this.retailerContactIndex();
    }

    toggleGridDisplayLocation() {
        this.gridDisplayLocation = false;
        this.formDisplayLocation = true;
    }
    toggleFormCloseLocation() {
        this.toggleFormDisplayLocation();
        this.retailerLocationIndex();
    }


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

    constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private retailerinfoService: RetailerInfoService) {

    }

    ngOnInit(): void {
        this.retailerinfoService.getAllRetailerInfo().subscribe(data => this.retailerinfoList = data);

        this.retailerinfoForm = this.formbulider.group({
            dealer_info_id: ['', [Validators.required]],
            retailer_info_code: [''],
            retailer_info_name: ['', [Validators.required]],
            retailer_info_short_name: ['', [Validators.required]],
            trade_license: [''],
            trade_license_date: [null],
            TIN: [''],
            BIN: [''],
            domicile_enum_id: ['', [Validators.required]],
            business_type_enum_id: [0],
            industry_sector_id: ['', [Validators.required]],
            industry_sub_sector_id: [0],
            ownership_type_id: ['', [Validators.required]],
            currency_id: ['', [Validators.required]],
            mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            web_url: [''],
            image_path: [''],
            country_id: ['', [Validators.required]],
            division_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]],
            thana_id: ['', [Validators.required]],
            zone_id: [0],
            city: [''],
            post_code: [''],
            block: [''],
            road_no: [''],
            house_no: [''],
            flat_no: [''],
            address_note: [''],
            ImageUpload: new FormControl(''),

        });

        this.retailercontactForm = this.formbulider.group({
            retailer_contact_info_code: [''],
            retailer_info_id: [''],
            person_name: ['', [Validators.required]],
            person_designation: ['', [Validators.required]],
            father_name: [''],
            mother_name: [''],
            date_of_birth: [null],
            religion_enum_id: [0],
            nationality: [''],
            national_id_no: [''],
            birth_certificate_no: [''],
            passport_no: [''],
            mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            emergency_contact: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            blood_group_enum_id: 0,
            image_path: [''],
            permanent_country_id: ['', [Validators.required]],
            permanent_division_id: ['', [Validators.required]],
            permanent_district_id: ['', [Validators.required]],
            permanent_thana_id: ['', [Validators.required]],
            permanent_zone_id: [0],
            permanent_city: [''],
            permanent_post_code: [''],
            permanent_block: [''],
            permanent_road_no: [''],
            permanent_house_no: [''],
            permanent_flat_no: [''],
            present_country_id: ['', [Validators.required]],
            present_division_id: ['', [Validators.required]],
            present_district_id: ['', [Validators.required]],
            present_thana_id: ['', [Validators.required]],
            present_zone_id: [0],
            present_city: [''],
            present_post_code: [''],
            present_block: [''],
            present_road_no: [''],
            present_house_no: [''],
            present_flat_no: [''],
            ImageUpload: new FormControl(''),

        });

        this.retailerlocationForm = this.formbulider.group({
            retailer_location_info_code: [''],
            retailer_info_id: [''],
            retailer_location_info_name: ['', [Validators.required]],
            retailer_location_info_short_name: ['', [Validators.required]],
            trade_license: [''],
            trade_license_date: [null],
            mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            emergency_contact: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            country_id: ['', [Validators.required]],
            division_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]],
            thana_id: ['', [Validators.required]],
            city: [''],
            post_code: [''],
            block: [''],
            road_no: [''],
            house_no: [''],
            flat_no: [''],
            address_note: ['', [Validators.required]]

        });

        //Load Dropdown
        this.loadAllDealerInfoCboList();
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

    onRowSelect(event) {
        debugger;
        this.rowSelected = true;
        this.rowData = event.data;

    }
    onRowUnselect(event) {
        this.rowSelected = false;
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
            this.retailerinfoForm.controls['dealer_info_id'].setValue(data.DealerInfoId);
            this.retailerinfoForm.controls['retailer_info_code'].setValue(data.RetailerInfoCode);
            this.retailerinfoForm.controls['retailer_info_short_name'].setValue(data.RetailerInfoShortName);
            this.retailerinfoForm.controls['retailer_info_name'].setValue(data.RetailerInfoName);
            this.retailerinfoForm.controls['trade_license'].setValue(data.TradeLicense);
            this.retailerinfoForm.controls['trade_license_date'].setValue(new Date(data.TradeLicenseDate));
            this.retailerinfoForm.controls['TIN'].setValue(data.TIN);
            this.retailerinfoForm.controls['BIN'].setValue(data.BIN);
            this.retailerinfoForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
            this.retailerinfoForm.controls['business_type_enum_id'].setValue(data.BusinessTypeEnumId);
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
            this.retailerinfoForm.controls['city'].setValue(data.City);
            this.retailerinfoForm.controls['post_code'].setValue(data.PostCode);
            this.retailerinfoForm.controls['block'].setValue(data.Block);
            this.retailerinfoForm.controls['road_no'].setValue(data.RoadNo);
            this.retailerinfoForm.controls['house_no'].setValue(data.HouseNo);
            this.retailerinfoForm.controls['flat_no'].setValue(data.FlatNo);
            this.retailerinfoForm.controls['address_note'].setValue(data.AddressNote);
            this.retailerinfoForm.controls['image_path'].setValue(data.ImagePath);
            this.photourllink = data.ImagePath;

        });
        this.toggleGridDisplay();
    }

    loadRetailerinfoContactGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getRetailerInfoById(retailerinfoId).subscribe(data => {
            if (data != null) {
                this.isRetailerinfoEdit = true;
            }

            this.loadAllRetailerContactinfos();

        });
        this.showBasicDialogContactEdit();
        this.index = 4;
    }

    loadRetailerinfoLocationGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getRetailerInfoById(retailerinfoId).subscribe(data => {
            if (data != null) {
                this.isRetailerinfoEdit = true;
            }
            this.loadAllRetailerLocationinfos();
        });
        this.showBasicDialogLocationEdit();
        this.index = 5;
    }

    deleteRetailerinfo() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.deleteRetailerInfo(retailerinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.retailerinfoList.splice(this.retailerinfoList.findIndex(item => item.RetailerInfoId === data.retailerinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.retailerinfoForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const data = this.retailerinfoForm.value;
        if ((data.retailer_info_name == "") || (data.retailer_info_name == null) || (data.retailer_info_name == undefined)) {
            return;
        }
        else if ((data.retailer_info_short_name == "") || (data.retailer_info_short_name == null) || (data.retailer_info_short_name == undefined)) {
            return;
        }
        else if ((data.domicile_enum_id == "") || (data.domicile_enum_id == null) || (data.domicile_enum_id == undefined)) {
            return;
        }        
        else if ((data.mobile == "") || (data.mobile == null) || (data.mobile == undefined)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.retailerinfoForm.invalid) {
            return;
        }
    }

    onBusiness(): void {
        this.submitted = true;
        const data = this.retailerinfoForm.value;
        if ((data.ownership_type_id == "") || (data.ownership_type_id == null) || (data.ownership_type_id == undefined)) {
            return;
        }
        else if ((data.industry_sector_id == "") || (data.industry_sector_id == null) || (data.industry_sector_id == undefined)) {
            return;
        }
        else if ((data.currency_id == "") || (data.currency_id == null) || (data.currency_id == undefined)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.retailerinfoForm.invalid) {
            return;
        }
    }

    SaveRetailerinfo() {
        this.submitted = true;
        const data = this.retailerinfoForm.value;

        if (this.retailerinfoForm.invalid) {
            return;
        }

        let formData = new FormData();
        for (const key of Object.keys(this.retailerinfoForm.value)) {
            const value = this.retailerinfoForm.value[key];
            if ((value == "") || (value == null) || (value == undefined)) {

            }
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
                if (result.MessageType == 1) {
                    this.retailerinfoList.splice(this.retailerinfoList.findIndex(item => item.RetailerInfoId === data.retailerinfoId), 1);
                    this.retailerinfoList.unshift(result.Data);
                    this.selectedretailerinfo = result.Data;
                    this.rowData = result.Data;
                    this.onRowUnselect(event);
                    this.retailerIndex();
                    this.retailerinfoForm.reset();
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
        else {

            this.retailerinfoService.createRetailerInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.retailerinfoList.unshift(result.Data);
                        this.selectedretailerinfo = result.Data;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();
                        this.retailerIndex();
                        this.retailerinfoForm.reset();
                        this.submitted = false;
                    }
                }
            );
        }

    }

    // All Dropdown Load here
    loadAllDealerInfoCboList() {
        this.retailerinfoService.getDealerInfoCboList().subscribe(data => {
            this.allDealerInfo = data;
        });
    }

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
        this.retailerinfoService.getAllContactInfoByRetailerId(retailerinfoId).subscribe(data => {
            this.retailercontactinfoList = data;
        });
    }

    loadAllRetailerLocationinfos() {
        let retailerinfoId = this.rowData.RetailerInfoId;
        this.retailerinfoService.getAllLocationInfoByRetailerId(retailerinfoId).subscribe(data => {
            this.retailerlocationinfoList = data;
        });
    }

    resetForm() {
        this.isRetailerinfoEdit = false;
        this.loadAllRetailerinfos();
        this.retailerinfodataSource = [];
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

    // Contact Info Start

    sameAddress(event) {
        if (event.checked) {
            const data = this.retailercontactForm.value;
            debugger;

            this.retailercontactForm.controls['present_country_id'].setValue(data.permanent_country_id);
            this.onSelectByCountryId(data.permanent_country_id);
            this.retailercontactForm.controls['present_division_id'].setValue(data.permanent_division_id);
            this.onSelectByDivisionId(data.permanent_division_id);
            this.retailercontactForm.controls['present_district_id'].setValue(data.permanent_district_id);
            this.onSelectByDistrictId(data.permanent_district_id);
            this.retailercontactForm.controls['present_thana_id'].setValue(data.permanent_thana_id);
            this.retailercontactForm.controls['present_zone_id'].setValue(data.permanent_zone_id);
            this.retailercontactForm.controls['present_city'].setValue(data.permanent_city);
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
            this.retailercontactForm.controls['present_city'].setValue('');
            this.retailercontactForm.controls['present_post_code'].setValue('');
            this.retailercontactForm.controls['present_block'].setValue('');
            this.retailercontactForm.controls['present_house_no'].setValue('');
            this.retailercontactForm.controls['present_road_no'].setValue('');
            this.retailercontactForm.controls['present_flat_no'].setValue('');
        }
    }

    get g(): { [key: string]: AbstractControl } {
        return this.retailercontactForm.controls;
    }

    onContactBasic(): void {
        this.submittedContact = true;
        const data = this.retailercontactForm.value;
        if ((data.person_name == "") || (data.person_name == null) || (data.person_name == undefined)) {
            return;
        }
        else if ((data.person_designation == "") || (data.person_designation == null) || (data.person_designation == undefined)) {
            return;
        }
        else if ((data.mobile == "") || (data.mobile == null) || (data.mobile == undefined)) {
            return;
        }
        else {
            this.openNextContact();
        }
        if (this.retailercontactForm.invalid) {
            return;
        }
    }

    SaveRetailerContactInfo() {
        this.submittedContact = true;
        const data = this.retailercontactForm.value;
        if (this.retailercontactForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.retailercontactForm.value)) {
            const value = this.retailercontactForm.value[key];
            if (key == "retailer_info_id") {
                let retailerinfoId = this.rowData.RetailerInfoId;
                formData.append("retailer_info_id", retailerinfoId);
            }
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

                if (result.MessageType == 1) {
                    this.retailercontactinfoList.splice(this.retailercontactinfoList.findIndex(item => item.RetailerContactInfoId === data.retailerContactinfoId), 1);
                    this.retailercontactinfoList.unshift(result.Data);
                    this.selectedretailerinfo = result.Data;
                    this.rowData = result.Data;
                    this.onRowUnselect(event);
                    this.retailerContactIndex();
                    this.submittedContact = false;
                }

            });
            this.gridDisplayContact = false;
            this.formDisplayContact = true;
        }
        else {
            formData.append("retailer_info_id", this.rowData.RetailerInfoId);
            this.retailerinfoService.createRetailerContactInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                    if (result.MessageType == 1) {
                        this.retailercontactinfoList.unshift(result.Data);
                        this.selectedretailercontactinfo = result.Data;
                        this.rowData = result.Data;
                        this.onRowUnselect(event);
                        this.retailerContactIndex();
                        this.submittedContact = false;
                    }
                }
            );
            this.gridDisplayContact = false;
            this.formDisplayContact = true;
        }

    }

    loadRetailerContactinfoToEdit() {

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
            this.retailercontactForm.controls['permanent_city'].setValue(data.PermanentCity);
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
            this.retailercontactForm.controls['present_city'].setValue(data.PresentCity);
            this.retailercontactForm.controls['present_post_code'].setValue(data.PresentPostCode);
            this.retailercontactForm.controls['present_block'].setValue(data.PresentBlock);
            this.retailercontactForm.controls['present_road_no'].setValue(data.PresentRoadNo);
            this.retailercontactForm.controls['present_house_no'].setValue(data.PresentHouseNo);
            this.retailercontactForm.controls['present_flat_no'].setValue(data.PresentFlatNo);
            this.retailercontactForm.controls['image_path'].setValue(data.ImagePath);
            //this.photourllink = data.ImagePath;

        });
        this.gridDisplayContact = true;
        this.formDisplayContact = false;
    }

    deleteRetailerContactinfo() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let retailerContactinfoId = this.rowData.RetailerContactInfoId;
        this.retailerinfoService.deleteRetailerContactInfo(retailerContactinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.retailercontactinfoList.splice(this.retailercontactinfoList.findIndex(item => item.RetailerContactInfoId === data.retailerContactinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    onSelectContactImage(event) {

        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result;
            }
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


    get h(): { [key: string]: AbstractControl } {
        return this.retailerlocationForm.controls;
    }

    onLocationBasic(): void {
        this.submittedLocation = true;
        const data = this.retailerlocationForm.value;
        if ((data.retailer_location_info_name == "") || (data.retailer_location_info_name == null) || (data.retailer_location_info_name == undefined)) {
            return;
        }
        else if ((data.retailer_location_info_short_name == "") || (data.retailer_location_info_short_name == null) || (data.retailer_location_info_short_name == undefined)) {
            return;
        }
        else if ((data.mobile == "") || (data.mobile == null) || (data.mobile == undefined)) {
            return;
        }
        else {
            this.openNextLocation();
        }
        if (this.retailerlocationForm.invalid) {
            return;
        }
    }

    SaveRetailerLocationInfo() {
        this.submittedLocation = true;
        const data = this.retailerlocationForm.value;

        if (this.retailerlocationForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.retailerlocationForm.value)) {
            const value = this.retailerlocationForm.value[key];
            if (key == "retailer_info_id") {
                let retailerinfoId = this.rowData.RetailerInfoId;
                formData.append("retailer_info_id", retailerinfoId);
            }
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

                if (result.MessageType == 1) {
                    this.retailerlocationinfoList.splice(this.retailerlocationinfoList.findIndex(item => item.RetailerLocationInfoId === data.retailerLocationinfoId), 1);
                    this.retailerlocationinfoList.unshift(result.Data);
                    this.selectedretailerlocationinfo = result.Data;
                    this.rowData = result.Data;
                    this.retailerLocationIndex();
                    this.submittedLocation = false;
                }
            });
            this.gridDisplayLocation = false;
            this.formDisplayLocation = true;
        }
        else {
            formData.append("retailer_info_id", this.rowData.RetailerInfoId);
            this.retailerinfoService.createRetailerLocationInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.retailerlocationinfoList.unshift(result.Data);
                        this.selectedretailerlocationinfo = result.Data;
                        this.rowData = result.Data;
                        this.retailerLocationIndex();
                        this.submittedLocation = false;
                    }
                }
            );
            this.gridDisplayLocation = false;
            this.formDisplayLocation = true;
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
            this.retailerlocationForm.controls['city'].setValue(data.City);
            this.retailerlocationForm.controls['post_code'].setValue(data.PostCode);
            this.retailerlocationForm.controls['block'].setValue(data.Block);
            this.retailerlocationForm.controls['road_no'].setValue(data.RoadNo);
            this.retailerlocationForm.controls['house_no'].setValue(data.HouseNo);
            this.retailerlocationForm.controls['flat_no'].setValue(data.FlatNo);
            this.retailerlocationForm.controls['address_note'].setValue(data.AddressNote);

        });
        this.gridDisplayLocation = true;
        this.formDisplayLocation = false;
    }

    deleteRetailerLocationinfo() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let retailerLocationinfoId = this.rowData.RetailerLocationInfoId;
        this.retailerinfoService.deleteRetailerLocationInfo(retailerLocationinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.retailerlocationinfoList.splice(this.retailerlocationinfoList.findIndex(item => item.RetailerLocationInfoId === data.retailerLocationinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }


    retailerIndex() {
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


    // Contact Infomation Start
    retailerContactIndex() {
        this.index = 3;
        this.indexContact = 0;
    }

    functionContact(e) {
        this.indexContact = e.indexContact;
    }

    openNextContact() {
        this.indexContact = (this.indexContact === 1) ? 0 : this.indexContact + 1;
    }

    openPrevContact() {
        this.indexContact = (this.indexContact === 0) ? 1 : this.indexContact - 1;
    }

    // Location Infomation Start
    retailerLocationIndex() {
        this.index = 4;
        this.indexLocation = 0;
    }

    functionLocation(e) {
        this.indexLocation = e.indexLocation;
    }

    openNextLocation() {
        this.indexLocation = (this.indexLocation === 1) ? 0 : this.indexLocation + 1;
    }

    openPrevLocation() {
        this.indexLocation = (this.indexLocation === 0) ? 1 : this.indexLocation - 1;
    }


}
