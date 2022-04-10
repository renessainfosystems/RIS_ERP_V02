import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import DealerInfo from './dealerinfo.model';
import { DealerInfoService } from './dealerinfo.service';

@Component({
    selector: 'app-dealerinfo',
    templateUrl: './dealerinfo.component.html',
    styleUrls: ['./dealerinfo.component.css']
})
export class DealerinfoComponent implements OnInit {
    @ViewChild('dealerinfoImage', {
        static: true
    }) dealerinfoImage;
    @ViewChild('dealerContactinfoImage', {
        static: true
    }) dealerContactinfoImage;

    @ViewChild('dealerDocumentImageFile', {
        static: true
    }) dealerDocumentImageFile;

    @ViewChild('dealerCreditImageFile', {
        static: true
    }) dealerCreditImageFile;

    submitted = false; 
    dealerinfoForm: any;//DealerFormName  
    dealerinfoList: any[];//List Dealerinfo
    dealerinfodataSource: any[];//single dealerinfo
    selecteddealerinfo: any;// Selected Dealerinfo  
    isDealerinfoEdit: boolean = false;
    nodeSelected: boolean = false;

    submittedContact = false;
    dealercontactForm: any;//Dealer Contact Form
    isDealerContactinfoEdit: boolean = false;
    dealercontactinfoList: any[];//List Dealer Contact info
    selecteddealercontactinfo: any;// Selected Dealerinfo

    submittedLocation = false;
    dealerlocationForm: any;//Dealer Contact Form
    isDealerLocationinfoEdit: boolean = false;
    dealerlocationinfoList: any[];//List Dealer Contact info
    selecteddealerlocationinfo: any;// Selected Dealerinfo 

    submittedDocument = false;
    dealerdocumentForm: any;//Dealer Contact Form
    isDealerDocumentinfoEdit: boolean = false;
    dealerdocumentinfoList: any[];//List Dealer Contact info
    selecteddealerdocumentinfo: any;// Selected Dealerinfo

    submittedCredit = false;
    dealercreditForm: any;//Dealer Contact Form
    isDealerCreditinfoEdit: boolean = false;
    dealercreditinfoList: any[];//List Dealer Contact info
    selecteddealercreditinfo: any;// Selected Dealerinfo 

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

    allDealerInfo: any[];
    allGender: any[];
    allReligion: any[];
    allBloodGroup: any[];
    allDocument: any[];
    allSecurityDeposit: any[];

    first = 0;
    rows = 10;
    //end dropdown List prperty
    rowData: any;
    rowDataContact: any;
    rowDataLocation: any;
    rowDataDocument: any;
    rowDataCredit: any;
    dataSaved = false;
    // for delete data modal
    
    rowSelected: boolean = false;
    selected = true;
    collapsedempInfo = true;
    collapsedempDetails = false;
    collapsed = false;
    checked: boolean = false;
    index: number = 0;
    indexContact: number = 0;
    indexLocation: number = 0;
    indexDocument: number = 0;
    indexCredit: number = 0;
    display: boolean = false;
    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }

    displayDocument: boolean = false;
    showDialogDocument() {
        if (this.rowDataDocument == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.displayDocument = true;
    }

    displayCredit: boolean = false;
    showDialogCredit() {
        if (this.rowDataCredit == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.displayCredit = true;
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
        this.dealerIndex();
    }

    // Contact Start

    gridDisplayContact = false;
    formDisplayContact = true;

    showBasicDialogContactNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.dealerContactIndex();
        this.gridDisplayContact = true;
        this.formDisplayContact = false;       
    }

    showBasicDialogContactGrid() {
        this.toggleGridDisplayContact();
        this.toggleGridDisplay();
        this.dealerContactIndex();       
    }
    showBasicDialogContactEdit() {
        this.toggleFormDisplayContact();
        this.toggleGridDisplay();
        this.dealerContactIndex();
    }
    
    toggleFormDisplayContact() {
        this.gridDisplayContact = false;
        this.formDisplayContact = true;
        this.dealerContactIndex();
    }
    
    toggleGridDisplayContact() {
        this.gridDisplayContact = false;
        this.formDisplayContact = true;
    }
    toggleFormCloseContact() {
        this.toggleFormDisplayContact();
        this.dealerContactIndex();
    }

    // Location Start

    gridDisplayLocation = false;
    formDisplayLocation = true;

    showBasicDialogLocationNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.dealerLocationIndex();
        this.gridDisplayLocation = true;
        this.formDisplayLocation = false;
    }

    showBasicDialogLocationGrid() {
        this.toggleGridDisplayLocation();
        this.toggleGridDisplay();
        this.dealerLocationIndex();
    }
    showBasicDialogLocationEdit() {
        this.toggleFormDisplayLocation();
        this.toggleGridDisplay();
        this.dealerLocationIndex();
    }

    toggleFormDisplayLocation() {
        this.gridDisplayLocation = false;
        this.formDisplayLocation = true;
        this.dealerContactIndex();
    }

    toggleGridDisplayLocation() {
        this.gridDisplayLocation = false;
        this.formDisplayLocation = true;
    }
    toggleFormCloseLocation() {
        this.toggleFormDisplayLocation();
        this.dealerLocationIndex();
    }


    // Document Start
    gridDisplayDocument = false;
    formDisplayDocument = true;

    showBasicDialogDocumentNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
        this.gridDisplayDocument = true;
        this.formDisplayDocument = false;
    }

    showBasicDialogDocumentGrid() {
        this.toggleGridDisplayDocument();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
    }
    showBasicDialogDocumentEdit() {
        this.toggleFormDisplayDocument();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
    }   

    toggleFormDisplayDocument() {
        this.gridDisplayDocument = false;
        this.formDisplayDocument = true;
        this.dealerContactIndex();
    }

    toggleGridDisplayDocument() {
        this.gridDisplayDocument = false;
        this.formDisplayDocument = true;
    }
    toggleFormCloseDocument() {
        this.toggleFormDisplayDocument();
        this.dealerDocumentIndex();
    }


    // Credit Start
    gridDisplayCredit = false;
    formDisplayCredit = true;

    showBasicDialogCreditNew() {
        this.ngOnInit();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
        this.gridDisplayDocument = true;
        this.formDisplayDocument = false;
    }

    showBasicDialogCreditGrid() {
        this.toggleGridDisplayDocument();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
    }
    showBasicDialogCreditEdit() {
        this.toggleFormDisplayDocument();
        this.toggleGridDisplay();
        this.dealerDocumentIndex();
    }

    toggleFormDisplayCredit() {
        this.gridDisplayDocument = false;
        this.formDisplayDocument = true;
        this.dealerContactIndex();
    }

    toggleGridDisplayCredit() {
        this.gridDisplayDocument = false;
        this.formDisplayDocument = true;
    }
    toggleFormCloseCredit() {
        this.toggleFormDisplayDocument();
        this.dealerDocumentIndex();
    }


    // for photo and signature upload

    fileToUploadDocumentForm: File | null = null;
    fileToUploadCreditForm: File | null = null;

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

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private dealerinfoService: DealerInfoService) {

    }

    ngOnInit(): void {
        this.dealerinfoService.getAllDealerInfo().subscribe(data => this.dealerinfoList = data);

        this.dealerinfoForm = this.formbulider.group({
            dealer_info_code: [''],
            dealer_info_name: ['', [Validators.required]],
            dealer_info_short_name: ['', [Validators.required]],
            dealer_info_display_name: [''],
            trade_license: ['', [Validators.required]],
            year_established: [null],
            TIN: [''],
            BIN: [''],
            domicile_enum_id: ['', [Validators.required]],
            business_type_enum_id: [0],
            industry_sector_id: ['', [Validators.required]],
            industry_sub_sector_id: [0],
            ownership_type_id: ['', [Validators.required]],
            organization_type_enum_id: [0],
            registry_authority_id: [0],
            regulator_id: [0],
            currency_id: ['', [Validators.required]],
            security_type_enum_id: [0],
            prefered_method_enum_id: [0],
            internal_credit_rating: [0],
            maximum_credit: [0],
            allowable_credit: [0],
            credit_days: [0],
            mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            web_url: [''],
            logo_path: [''],
            continent_enum_id: ['', [Validators.required]],
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
            ImageUpload: new FormControl('')
        });

        this.dealercontactForm = this.formbulider.group({
            dealer_contact_info_code: [''],
            dealer_info_id: [''],
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
            ImageUpload: new FormControl('')
        });

        this.dealerlocationForm = this.formbulider.group({
            dealer_location_info_code: [''],
            dealer_info_id: [''],
            dealer_location_info_name: ['', [Validators.required]],
            dealer_location_info_short_name: ['', [Validators.required]],
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

        this.dealerdocumentForm = this.formbulider.group({
            dealer_info_id: [''],
            document_type_id: ['', [Validators.required]],
            document_number: ['', [Validators.required]],
            issue_date: [null, [Validators.required]],
            expiry_date: [null, [Validators.required]],
            //image_file: ['', [Validators.required]]
            FileUpload: new FormControl(''),
        });

        this.dealercreditForm = this.formbulider.group({
            dealer_info_id: [''],
            security_deposit_id: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            remarks: [''],
            //FileUpload: new FormControl(''),
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
        this.loadAllDealerInfoCboList();
        this.loadAllGenderEnum();
        this.loadAllReligionEnum();
        this.loadAllBloodGroupEnum();
        this.loadAllDocumentCboList();
        this.LoadAllSecurityTypeCboList();
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

    onRowSelectContact(event) {
        debugger;
        this.rowSelected = true;
        this.rowDataContact = event.data;

    }
    onRowUnselectContact(event) {
        this.rowSelected = false;
        this.rowDataContact = null;
    }

    onRowSelectLocation(event) {
        debugger;
        this.rowSelected = true;
        this.rowDataLocation = event.data;

    }
    onRowUnselectLocation(event) {
        this.rowSelected = false;
        this.rowDataLocation = null;
    }

    onRowSelectDocument(event) {
        debugger;
        this.rowSelected = true;
        this.rowDataDocument = event.data;

    }
    onRowUnselectDocument(event) {
        this.rowSelected = false;
        this.rowDataDocument = null;
    }

    onRowSelectCredit(event) {
        debugger;
        this.rowSelected = true;
        this.rowDataCredit = event.data;

    }
    onRowUnselectCredit(event) {
        this.rowSelected = false;
        this.rowDataCredit = null;
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

    loadDealerinfoToEdit() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getDealerInfoById(dealerinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerinfoEdit = true;
            }

            this.dealerinfoForm.controls['dealer_info_code'].setValue(data.DealerInfoCode);
            this.dealerinfoForm.controls['dealer_info_short_name'].setValue(data.DealerInfoShortName);
            this.dealerinfoForm.controls['dealer_info_name'].setValue(data.DealerInfoName);
            this.dealerinfoForm.controls['dealer_info_display_name'].setValue(data.DealerInfoDisplayName);
            this.dealerinfoForm.controls['trade_license'].setValue(data.TradeLicense);
            this.dealerinfoForm.controls['year_established'].setValue(new Date(data.YearEstablished));
            this.dealerinfoForm.controls['TIN'].setValue(data.TIN);
            this.dealerinfoForm.controls['BIN'].setValue(data.BIN);
            this.dealerinfoForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
            this.dealerinfoForm.controls['business_type_enum_id'].setValue(data.BusinessTypeEnumId);
            this.dealerinfoForm.controls['industry_sector_id'].setValue(data.IndustrySectorId);
            this.onSelectBySectorId(data.IndustrySectorId);
            this.dealerinfoForm.controls['industry_sub_sector_id'].setValue(data.IndustrySubSectorId);
            this.dealerinfoForm.controls['ownership_type_id'].setValue(data.OwnershipTypeId);
            this.dealerinfoForm.controls['organization_type_enum_id'].setValue(data.OrganazationTypeEnumId);
            this.dealerinfoForm.controls['registry_authority_id'].setValue(data.RegistryAuthorityId);
            this.dealerinfoForm.controls['regulator_id'].setValue(data.RegulatorId);
            this.dealerinfoForm.controls['currency_id'].setValue(data.CurrencyId);
            this.dealerinfoForm.controls['security_type_enum_id'].setValue(data.SecurityTypeEnumId);
            this.dealerinfoForm.controls['prefered_method_enum_id'].setValue(data.PreferedMethodEnumId);
            this.dealerinfoForm.controls['internal_credit_rating'].setValue(data.InternalCreditRating);
            this.dealerinfoForm.controls['maximum_credit'].setValue(data.MaximumCredit);
            this.dealerinfoForm.controls['allowable_credit'].setValue(data.AllowableCredit);
            this.dealerinfoForm.controls['credit_days'].setValue(data.CreditDays);
            this.dealerinfoForm.controls['mobile'].setValue(data.Mobile);
            this.dealerinfoForm.controls['phone'].setValue(data.Phone);
            this.dealerinfoForm.controls['email'].setValue(data.Email);
            this.dealerinfoForm.controls['web_url'].setValue(data.WebUrl);
            this.dealerinfoForm.controls['continent_enum_id'].setValue(data.ContinentEnumId);
            this.dealerinfoForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.dealerinfoForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.dealerinfoForm.controls['district_id'].setValue(data.DistrictId);
            this.onSelectByDistrictId(data.DistrictId);
            this.dealerinfoForm.controls['thana_id'].setValue(data.ThanaId);
            this.dealerinfoForm.controls['zone_id'].setValue(data.ZoneId);
            this.dealerinfoForm.controls['city'].setValue(data.City);
            this.dealerinfoForm.controls['post_code'].setValue(data.PostCode);
            this.dealerinfoForm.controls['block'].setValue(data.Block);
            this.dealerinfoForm.controls['road_no'].setValue(data.RoadNo);
            this.dealerinfoForm.controls['house_no'].setValue(data.HouseNo);
            this.dealerinfoForm.controls['flat_no'].setValue(data.FlatNo);
            this.dealerinfoForm.controls['address_note'].setValue(data.AddressNote);
            this.dealerinfoForm.controls['logo_path'].setValue(data.LogoPath);
            this.photourllink = data.LogoPath;            

        });
        this.toggleGridDisplay();
    }

    loadDealerinfoContactGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getDealerInfoById(dealerinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerinfoEdit = true;
            }
            
            this.loadAllDealerContactinfos();

        });
        this.showBasicDialogContactEdit();
        this.index = 4;
    }

    loadDealerinfoLocationGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getDealerInfoById(dealerinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerinfoEdit = true;
            }
            this.loadAllDealerLocationinfos();
        });
        this.showBasicDialogLocationEdit();
        this.index = 5;
    }
    loadDealerinfoDocumentGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getDealerInfoById(dealerinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerinfoEdit = true;
            }
            this.loadAllDealerDocumentinfos();
        });
        this.showBasicDialogDocumentEdit();
        this.index = 6;
    }

    loadDealerinfoCreditGrid() {

        debugger;
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getDealerInfoById(dealerinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerinfoEdit = true;
            }
            this.loadAllDealerCreditinfos();
        });
        this.showBasicDialogCreditEdit();
        this.index = 7;
    }

    deleteDealerinfo() {
        this.showDialog();
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.deleteDealerInfo(dealerinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.dealerinfoList.splice(this.dealerinfoList.findIndex(item => item.DealerInfoId === data.dealerinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    deleteDealer(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteDealerinfo();
            },
            reject: () => {

            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.dealerinfoForm.controls;
    }

    onGeneral(): void {
        this.submitted = true;
        const data = this.dealerinfoForm.value;
        if ((data.dealer_info_name == "") || (data.dealer_info_name == null) || (data.dealer_info_name == undefined)) {
            return;
        }
        else if ((data.dealer_info_short_name == "") || (data.dealer_info_short_name == null) || (data.dealer_info_short_name == undefined)) {
            return;
        }
        else if ((data.domicile_enum_id == "") || (data.domicile_enum_id == null) || (data.domicile_enum_id == undefined)) {
            return;
        }
        else if ((data.trade_license == "") || (data.trade_license == null) || (data.trade_license == undefined)) {
            return;
        }
        else if ((data.mobile == "") || (data.mobile == null) || (data.mobile == undefined)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.dealerinfoForm.invalid) {
            return;
        }
    }

    onBusiness(): void {
        this.submitted = true;
        const data = this.dealerinfoForm.value;
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
        if (this.dealerinfoForm.invalid) {
            return;
        }
    }

    onAddress(): void {
        this.submitted = true;
        const data = this.dealerinfoForm.value;
        if ((data.continent_enum_id == "") || (data.continent_enum_id == null) || (data.continent_enum_id == undefined)) {
            return;
        }
        else if ((data.country_id == "") || (data.country_id == null) || (data.country_id == undefined)) {
            return;
        }
        else if ((data.division_id == "") || (data.division_id == null) || (data.division_id == undefined)) {
            return;
        }
        else if ((data.district_id == "") || (data.district_id == null) || (data.district_id == undefined)) {
            return;
        }
        else if ((data.thana_id == "") || (data.thana_id == null) || (data.thana_id == undefined)) {
            return;
        }
        else {
            this.openNext();
        }
        if (this.dealerinfoForm.invalid) {
            return;
        }
    }


    SaveDealerinfo() {
        this.submitted = true;
        const data = this.dealerinfoForm.value;

        if (this.dealerinfoForm.invalid) {
            return;
        }
       
        let formData = new FormData();
        for (const key of Object.keys(this.dealerinfoForm.value)) {
            const value = this.dealerinfoForm.value[key];
            if ((value == "") || (value == null) || (value == undefined)) {
                
            }
            if (key == "year_established") {
                let date = new Date(value).toISOString();
                formData.append("year_established", date);
            }
            else {

                formData.append(key, value);
            }
        }

        if (this.isDealerinfoEdit) {

            data.dealerinfoId = this.rowData.DealerInfoId;
            formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerinfoService.updateDealerInfo(formData).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.dealerinfoList.splice(this.dealerinfoList.findIndex(item => item.DealerInfoId === data.dealerinfoId), 1);
                    this.dealerinfoList.unshift(result.Data);
                    this.selecteddealerinfo = result.Data;
                    this.rowData = null;
                    this.dealerIndex();
                    this.isDealerinfoEdit = false;
                    this.toggleFormDisplay();
                    this.submitted = false;                   
                }                
            });
        }
        else {

            this.dealerinfoService.createDealerInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);                    
                    if (result.MessageType == 1) {
                        this.dealerinfoList.unshift(result.Data);
                        this.selecteddealerinfo = result.Data;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();
                        this.dealerIndex();
                        this.isDealerinfoEdit = false;
                        this.submitted = false;                        
                    }
                }
            );
        }

    }

    // All Dropdown Load here
    loadAllDomicileEnum() {
        this.dealerinfoService.getAllDomicile().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllContinentEnum() {
        this.dealerinfoService.getAllContinent().subscribe(data => {
            this.allContinent = data;
        });
    }

    loadAllCountryCboList() {
        this.dealerinfoService.getAllCountry().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.dealerinfoService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.dealerinfoService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.dealerinfoService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadAllZoneCboList() {
        this.dealerinfoService.getAllZone().subscribe(data => {
            this.allZone = data;
        });
    }

    loadAllCurrencyCboList() {
        this.dealerinfoService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    loadAllBusinessActivitiesEnum() {
        this.dealerinfoService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.dealerinfoService.getAllIndustrySectorCboList().subscribe(data => {
            this.allIndustrySector = data;
        });
    }

    onSelectBySectorId(sectorId: Number) {
        if (sectorId != null) {
            this.dealerinfoService.getAllIndustrySubSectorCboList(sectorId).subscribe(data => {
                this.allIndustrySubSector = data;
            });
        }
        else
            this.allIndustrySubSector = null;
    }

    loadAllOwnershipTypeCboList() {
        this.dealerinfoService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllOrganazationTypeEnum() {
        this.dealerinfoService.getAllOrganaizationEnum().subscribe(data => {
            this.allOrganazationType = data;
        });
    }

    loadAllRegisterAuthorityCboList() {
        this.dealerinfoService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegisterAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.dealerinfoService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllPreferredMethodEnum() {
        this.dealerinfoService.getAllPreferredMethod().subscribe(data => {
            this.allPreferredMethod = data;
        });
    }

    loadAllSecurityTypeEnum() {
        this.dealerinfoService.getAllSecurityType().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    loadAllDealerInfoCboList() {
        this.dealerinfoService.getDealerInfoCboList().subscribe(data => {
            this.allDealerInfo = data;
        });
    }

    loadAllGenderEnum() {
        this.dealerinfoService.getGenderEnum().subscribe(data => {
            this.allGender = data;
        });
    }

    loadAllReligionEnum() {
        this.dealerinfoService.getReligionEnum().subscribe(data => {
            this.allReligion = data;
        });
    }

    loadAllBloodGroupEnum() {
        this.dealerinfoService.getBloodGroupEnum().subscribe(data => {
            this.allBloodGroup = data;
        });
    }

    loadAllDocumentCboList() {
        this.dealerinfoService.getAllDocumentCboList().subscribe(data => {
            this.allDocument = data;
        });
    }

    LoadAllSecurityTypeCboList() {
        this.dealerinfoService.getAllSecurityTypeCboList().subscribe(data => {
            this.allSecurityDeposit = data;
        });
    }

    // All Dealer List 
    loadAllDealerinfos() {
        this.dealerinfoService.getAllDealerInfo().subscribe(data => {
            this.dealerinfoList = data;
        });
    }

    loadAllDealerContactinfos() {
        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getAllContactInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealercontactinfoList = data;
        });
    }

    loadAllDealerLocationinfos() {
        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getAllLocationInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealerlocationinfoList = data;
        });
    }

    loadAllDealerDocumentinfos() {
        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getAllDocumentInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealerdocumentinfoList = data;
        });
    }
    loadAllDealerCreditinfos() {
        let dealerinfoId = this.rowData.DealerInfoId;
        this.dealerinfoService.getAllCreditInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealercreditinfoList = data;
        });
    }
    

    resetForm() {
        this.isDealerinfoEdit = false;
        this.loadAllDealerinfos();
        this.dealerinfodataSource = [];
    }

    
    // Contact Info Start

    sameAddress(event) {
        if (event.checked) {
            const data = this.dealercontactForm.value;
            debugger;

            this.dealercontactForm.controls['present_country_id'].setValue(data.permanent_country_id);
            this.onSelectByCountryId(data.permanent_country_id);
            this.dealercontactForm.controls['present_division_id'].setValue(data.permanent_division_id);
            this.onSelectByDivisionId(data.permanent_division_id);
            this.dealercontactForm.controls['present_district_id'].setValue(data.permanent_district_id);
            this.onSelectByDistrictId(data.permanent_district_id);
            this.dealercontactForm.controls['present_thana_id'].setValue(data.permanent_thana_id);
            this.dealercontactForm.controls['present_zone_id'].setValue(data.permanent_zone_id);
            this.dealercontactForm.controls['present_city'].setValue(data.permanent_city);
            this.dealercontactForm.controls['present_post_code'].setValue(data.permanent_post_code);
            this.dealercontactForm.controls['present_block'].setValue(data.permanent_block);
            this.dealercontactForm.controls['present_house_no'].setValue(data.permanent_house_no);
            this.dealercontactForm.controls['present_road_no'].setValue(data.permanent_road_no);
            this.dealercontactForm.controls['present_flat_no'].setValue(data.permanent_flat_no);
        }
        else {
            this.dealercontactForm.controls['present_country_id'].setValue('');
            this.dealercontactForm.controls['present_district_id'].setValue('');
            this.dealercontactForm.controls['present_division_id'].setValue('');
            this.dealercontactForm.controls['present_thana_id'].setValue('');
            this.dealercontactForm.controls['present_zone_id'].setValue('');
            this.dealercontactForm.controls['present_city'].setValue('');
            this.dealercontactForm.controls['present_post_code'].setValue('');
            this.dealercontactForm.controls['present_block'].setValue('');
            this.dealercontactForm.controls['present_house_no'].setValue('');
            this.dealercontactForm.controls['present_road_no'].setValue('');
            this.dealercontactForm.controls['present_flat_no'].setValue('');
        }
    }

    get g(): { [key: string]: AbstractControl } {
        return this.dealercontactForm.controls;
    }

    onContactBasic(): void {
        this.submittedContact = true;
        const data = this.dealercontactForm.value;
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
        if (this.dealercontactForm.invalid) {
            return;
        }
    }

    SaveDealerContactInfo() {
        this.submittedContact = true;
        const data = this.dealercontactForm.value;        
        if (this.dealercontactForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.dealercontactForm.value)) {
            const value = this.dealercontactForm.value[key];
            if (key == "dealer_info_id") {
                let dealerinfoId = this.rowData.DealerInfoId;
                formData.append("dealer_info_id", dealerinfoId);
            }
            if (key == "date_of_birth") {
                let date = new Date(value).toISOString();
                formData.append("date_of_birth", date);
            }
            else {
                formData.append(key, value);
            }            
        }

        if (this.isDealerContactinfoEdit) {
           
            data.dealerContactinfoId = this.rowDataContact.DealerContactInfoId;
            formData.append("dealer_contact_info_id", this.rowDataContact.DealerContactInfoId);
            this.dealerinfoService.updateDealerContactInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
               
                if (result.MessageType == 1) {
                    this.dealercontactinfoList.splice(this.dealercontactinfoList.findIndex(item => item.DealerContactInfoId === data.dealerContactinfoId), 1);
                    this.dealercontactinfoList.unshift(result.Data);
                    this.selecteddealerinfo = result.Data;
                    this.rowDataContact = result.Data;
                    this.dealerContactIndex();
                    this.isDealerContactinfoEdit = false;
                    this.submittedContact = false;
                }

            });
            this.gridDisplayContact = false;
            this.formDisplayContact = true;
        }
        else {
            formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerinfoService.createDealerContactInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                   
                    if (result.MessageType == 1) {
                        this.dealercontactinfoList.unshift(result.Data);
                        this.selecteddealercontactinfo = result.Data;
                        this.rowDataContact = result.Data;
                        this.dealerContactIndex();
                        this.isDealerContactinfoEdit = false;
                        this.submittedContact = false;
                    }
                }
            );
            this.gridDisplayContact = false;
            this.formDisplayContact = true;
        }       
        
    }

    loadDealerContactinfoToEdit() {

        if (this.rowDataContact == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerContactinfoId = this.rowDataContact.DealerContactInfoId;
        this.dealerinfoService.getDealerContactInfoById(dealerContactinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerContactinfoEdit = true;
            }

            this.dealercontactForm.controls['dealer_info_id'].setValue(data.DealerInfoId);
            this.dealercontactForm.controls['dealer_contact_info_code'].setValue(data.DealerContactInfoCode);
            this.dealercontactForm.controls['person_name'].setValue(data.PersonName);
            this.dealercontactForm.controls['person_designation'].setValue(data.PersonDesignation);
            this.dealercontactForm.controls['father_name'].setValue(data.FatherName);
            this.dealercontactForm.controls['mother_name'].setValue(data.MotherName);
            this.dealercontactForm.controls['date_of_birth'].setValue(new Date(data.DateOfBirth));
            this.dealercontactForm.controls['religion_enum_id'].setValue(data.ReligionEnumId);
            this.dealercontactForm.controls['nationality'].setValue(data.Nationality);
            this.dealercontactForm.controls['national_id_no'].setValue(data.NationalIdNo);
            this.dealercontactForm.controls['birth_certificate_no'].setValue(data.BirthCertificateNo);
            this.dealercontactForm.controls['passport_no'].setValue(data.PassportNo);
            this.dealercontactForm.controls['mobile'].setValue(data.Mobile);
            this.dealercontactForm.controls['phone'].setValue(data.Phone);
            this.dealercontactForm.controls['email'].setValue(data.Email);
            this.dealercontactForm.controls['emergency_contact'].setValue(data.EmergencyContact);
            this.dealercontactForm.controls['blood_group_enum_id'].setValue(data.BloodGroupEnumId);
            // Permanent Address part
            this.dealercontactForm.controls['permanent_country_id'].setValue(data.PermanentCountryId);
            this.onSelectByCountryId(data.PermanentCountryId);
            this.dealercontactForm.controls['permanent_division_id'].setValue(data.PermanentDivisionId);
            this.onSelectByDivisionId(data.PermanentDivisionId);
            this.dealercontactForm.controls['permanent_district_id'].setValue(data.PermanentDistrictId);
            this.onSelectByDistrictId(data.PermanentDistrictId);
            this.dealercontactForm.controls['permanent_thana_id'].setValue(data.PermanentThanaId);
            this.dealercontactForm.controls['permanent_zone_id'].setValue(data.PermanentZoneId);
            this.dealercontactForm.controls['permanent_city'].setValue(data.PermanentCity);
            this.dealercontactForm.controls['permanent_post_code'].setValue(data.PermanentPostCode);
            this.dealercontactForm.controls['permanent_block'].setValue(data.PermanentBlock);
            this.dealercontactForm.controls['permanent_road_no'].setValue(data.PermanentRoadNo);
            this.dealercontactForm.controls['permanent_house_no'].setValue(data.PermanentHouseNo);
            this.dealercontactForm.controls['permanent_flat_no'].setValue(data.PermanentFlatNo);

            //Present Address Part
            this.dealercontactForm.controls['present_country_id'].setValue(data.PresentCountryId);
            this.onSelectByCountryId(data.PresentCountryId);
            this.dealercontactForm.controls['present_division_id'].setValue(data.PresentDivisionId);
            this.onSelectByDivisionId(data.PresentDivisionId);
            this.dealercontactForm.controls['present_district_id'].setValue(data.PresentDistrictId);
            this.onSelectByDistrictId(data.PresentDistrictId);
            this.dealercontactForm.controls['present_thana_id'].setValue(data.PresentThanaId);
            this.dealercontactForm.controls['present_zone_id'].setValue(data.PresentZoneId);
            this.dealercontactForm.controls['present_city'].setValue(data.PresentCity);
            this.dealercontactForm.controls['present_post_code'].setValue(data.PresentPostCode);
            this.dealercontactForm.controls['present_block'].setValue(data.PresentBlock);
            this.dealercontactForm.controls['present_road_no'].setValue(data.PresentRoadNo);
            this.dealercontactForm.controls['present_house_no'].setValue(data.PresentHouseNo);
            this.dealercontactForm.controls['present_flat_no'].setValue(data.PresentFlatNo);
            this.dealercontactForm.controls['image_path'].setValue(data.ImagePath);
            //this.photourllink = data.ImagePath;

        });
        this.gridDisplayContact = true;
        this.formDisplayContact = false;
    }

    deleteDealerContactinfo() {
        this.showDialog();
        if (this.rowDataContact == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let dealerContactinfoId = this.rowDataContact.DealerContactInfoId;
        this.dealerinfoService.deleteDealerContactInfo(dealerContactinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.dealercontactinfoList.splice(this.dealercontactinfoList.findIndex(item => item.DealerContactInfoId === data.dealerContactinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    deleteContact(event: Event) {
        if (this.rowDataContact == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteDealerContactinfo();
            },
            reject: () => {

            }
        });
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
                this.dealerContactinfoImage.nativeElement.innerText = file.name;
                this.dealercontactForm.patchValue({
                    ImageUpload: file
                });
            }
        }
    }
    // Contact info end --------***----------

    // Start Dealer Location Info --------****--------


    get h(): { [key: string]: AbstractControl } {
        return this.dealerlocationForm.controls;
    }

    onLocationBasic(): void {
        this.submittedLocation = true;
        const data = this.dealerlocationForm.value;
        if ((data.dealer_location_info_name == "") || (data.dealer_location_info_name == null) || (data.dealer_location_info_name == undefined)) {
            return;
        }
        else if ((data.dealer_location_info_short_name == "") || (data.dealer_location_info_short_name == null) || (data.dealer_location_info_short_name == undefined)) {
            return;
        }
        else if ((data.mobile == "") || (data.mobile == null) || (data.mobile == undefined)) {
            return;
        }
        else {
            this.openNextLocation();
        }
        if (this.dealerlocationForm.invalid) {
            return;
        }
    }

    SaveDealerLocationInfo() {
        this.submittedLocation = true;
        const data = this.dealerlocationForm.value;

        if (this.dealerlocationForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.dealerlocationForm.value)) {
            const value = this.dealerlocationForm.value[key];
            if (key == "dealer_info_id") {
                let dealerinfoId = this.rowData.DealerInfoId;
                formData.append("dealer_info_id", dealerinfoId);
            }
            if (key == "trade_license_date") {
                let date = new Date(value).toISOString();
                formData.append("trade_license_date", date);
            }
            else {
                formData.append(key, value);
            }
        }

        if (this.isDealerLocationinfoEdit) {

            data.dealerLocationinfoId = this.rowDataLocation.DealerLocationInfoId;
            formData.append("dealer_location_info_id", this.rowDataLocation.DealerLocationInfoId);
            this.dealerinfoService.updateDealerLocationInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
               
                if (result.MessageType == 1) {
                    this.dealerlocationinfoList.splice(this.dealerlocationinfoList.findIndex(item => item.DealerLocationInfoId === data.dealerLocationinfoId), 1);
                    this.dealerlocationinfoList.unshift(result.Data);
                    this.selecteddealerlocationinfo = result.Data;
                    this.rowDataLocation = result.Data;
                    this.dealerLocationIndex();
                    this.isDealerLocationinfoEdit = false;
                    this.submittedLocation = false;
                }
            });
            this.gridDisplayLocation = false;
            this.formDisplayLocation = true;
        }
        else {
            formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerinfoService.createDealerLocationInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.dealerlocationinfoList.unshift(result.Data);
                        this.selecteddealerlocationinfo = result.Data;
                        this.rowDataLocation = result.Data;
                        this.dealerLocationIndex();
                        this.isDealerLocationinfoEdit = false;
                        this.submittedLocation = false;
                    }
                }
            );
            this.gridDisplayLocation = false;
            this.formDisplayLocation = true;
        }

    }

    loadDealerLocationinfoToEdit() {

        debugger;
        if (this.rowDataLocation == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerLocationinfoId = this.rowDataLocation.DealerLocationInfoId;
        this.dealerinfoService.getDealerLocationInfoById(dealerLocationinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerLocationinfoEdit = true;
            }
            this.dealerlocationForm.controls['dealer_info_id'].setValue(data.DealerInfoId);
            this.dealerlocationForm.controls['dealer_location_info_code'].setValue(data.DealerLocationInfoCode);
            this.dealerlocationForm.controls['dealer_location_info_name'].setValue(data.DealerLocationInfoName);
            this.dealerlocationForm.controls['dealer_location_info_short_name'].setValue(data.DealerLocationInfoShortName);
            this.dealerlocationForm.controls['trade_license'].setValue(data.TradeLicense);
            this.dealerlocationForm.controls['trade_license_date'].setValue(new Date(data.TradeLicenseDate));
            this.dealerlocationForm.controls['mobile'].setValue(data.Mobile);
            this.dealerlocationForm.controls['phone'].setValue(data.Phone);
            this.dealerlocationForm.controls['email'].setValue(data.Email);
            this.dealerlocationForm.controls['emergency_contact'].setValue(data.EmergencyContact);
            this.dealerlocationForm.controls['country_id'].setValue(data.CountryId);
            this.onSelectByCountryId(data.CountryId);
            this.dealerlocationForm.controls['division_id'].setValue(data.DivisionId);
            this.onSelectByDivisionId(data.DivisionId);
            this.dealerlocationForm.controls['district_id'].setValue(data.DistrictId);
            this.onSelectByDistrictId(data.DistrictId);
            this.dealerlocationForm.controls['thana_id'].setValue(data.ThanaId);
            this.dealerlocationForm.controls['city'].setValue(data.City);
            this.dealerlocationForm.controls['post_code'].setValue(data.PostCode);
            this.dealerlocationForm.controls['block'].setValue(data.Block);
            this.dealerlocationForm.controls['road_no'].setValue(data.RoadNo);
            this.dealerlocationForm.controls['house_no'].setValue(data.HouseNo);
            this.dealerlocationForm.controls['flat_no'].setValue(data.FlatNo);
            this.dealerlocationForm.controls['address_note'].setValue(data.AddressNote);

        });
        this.gridDisplayLocation = true;
        this.formDisplayLocation = false;
    }

    deleteDealerLocationinfo() {
        this.showDialog();
        if (this.rowDataLocation == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let dealerLocationinfoId = this.rowDataLocation.DealerLocationInfoId;
        this.dealerinfoService.deleteDealerLocationInfo(dealerLocationinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.dealerlocationinfoList.splice(this.dealerlocationinfoList.findIndex(item => item.DealerLocationInfoId === data.dealerLocationinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    deleteLocation(event: Event) {
        if (this.rowDataLocation == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteDealerLocationinfo();
            },
            reject: () => {

            }
        });
    }


    // Start Dealer Document Info

    get d(): { [key: string]: AbstractControl } {
        return this.dealerdocumentForm.controls;
    }

    SaveDealerDocumentInfo() {
        this.submittedDocument = true;
        const data = this.dealerdocumentForm.value;

        if (this.dealerdocumentForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.dealerdocumentForm.value)) {
            const value = this.dealerdocumentForm.value[key];
            if (key == "dealer_info_id") {
                let dealerinfoId = this.rowData.DealerInfoId;
                formData.append("dealer_info_id", dealerinfoId);
            }
            if (key == "issue_date") {
                let date = new Date(value).toISOString();
                formData.append("issue_date", date);
            }
            if (key == "expiry_date") {
                let date = new Date(value).toISOString();
                formData.append("expiry_date", date);
            }
            else {
                formData.append(key, value);
                formData.append("dealer_info_id", this.rowData.DealerInfoId);
                formData.append("FileUpload", this.fileToUploadDocumentForm);
            }
        }

        if (this.isDealerDocumentinfoEdit) {

            data.dealerDocumentinfoId = this.rowDataDocument.DealerDocumentInfoId;
            formData.append("dealer_document_info_id", this.rowDataDocument.DealerDocumentInfoId);
            this.dealerinfoService.updateDealerDocumentInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                if (result.MessageType == 1) {
                    this.dealerdocumentinfoList.splice(this.dealerdocumentinfoList.findIndex(item => item.DealerDocumentInfoId === data.dealerDocumentinfoId), 1);
                    this.dealerdocumentinfoList.unshift(result.Data);
                    this.selecteddealerdocumentinfo = result.Data;
                    this.rowDataDocument = result.Data;
                    this.dealerDocumentIndex();
                    this.isDealerDocumentinfoEdit = false;
                    this.submittedDocument = false;
                    this.dealerdocumentForm.reset();
                }
            });
            this.gridDisplayDocument = false;
            this.formDisplayDocument = true;
        }
        else {
            this.dealerinfoService.createDealerDocumentInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.dealerdocumentinfoList.unshift(result.Data);
                        this.selecteddealerdocumentinfo = result.Data;
                        this.rowDataDocument = result.Data;
                        this.dealerDocumentIndex();
                        this.isDealerDocumentinfoEdit = false;
                        this.submittedDocument = false;
                        this.dealerdocumentForm.reset();
                    }
                }
            );
            this.gridDisplayDocument = false;
            this.formDisplayDocument = true;
        }

    }

    loadDealerDocumentinfoToEdit() {

        debugger;
        if (this.rowDataDocument == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerDocumentinfoId = this.rowDataDocument.DealerDocumentInfoId;
        this.dealerinfoService.getDealerDocumentInfoById(dealerDocumentinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerDocumentinfoEdit = true;
            }
            this.dealerdocumentForm.controls['dealer_info_id'].setValue(data.DealerInfoId);
            this.dealerdocumentForm.controls['document_type_id'].setValue(data.DocumentTypeId);
            this.dealerdocumentForm.controls['document_number'].setValue(data.DocumentNumber);
            this.dealerdocumentForm.controls['issue_date'].setValue(new Date(data.IssueDate));
            this.dealerdocumentForm.controls['expiry_date'].setValue(new Date(data.ExpiryDate));
            this.dealerdocumentForm.controls['status'].setValue(data.Status);
            this.dealerdocumentForm.controls['remarks'].setValue(data.Remarks);
            this.dealerdocumentForm.controls['image_file'].setValue(data.ImageFile);
            //this.photourllink = data.ImageFile;

        });
        this.gridDisplayDocument = true;
        this.formDisplayDocument = false;
    }

    deleteDealerDocumentinfo() {
        this.showDialogDocument();
        if (this.rowDataDocument == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        
        this.rowSelected = true;
        let dealerDocumentinfoId = this.rowDataDocument.DealerDocumentInfoId;
        this.dealerinfoService.deleteDealerDocumentInfo(dealerDocumentinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.dealerdocumentinfoList.splice(this.dealerdocumentinfoList.findIndex(item => item.DealerDocumentInfoId === data.dealerDocumentinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.displayDocument = false;
    }

    deleteDocument(event: Event) {
        if (this.rowDataDocument == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteDealerDocumentinfo();
            },
            reject: () => {

            }
        });
    }

    onSelectImage(event) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result
            }
            alert(this.photourllink)
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                this.dealerDocumentImageFile.nativeElement.innerText = file.name;
                this.dealerdocumentForm.patchValue({
                    FileUpload: file,
                });
            }
        }
    }

    documnetFormFileInput(files: FileList) {
        this.fileToUploadDocumentForm = files.item(0);
    }


    // Start Dealer Credit Info

    get e(): { [key: string]: AbstractControl } {
        return this.dealercreditForm.controls;
    }

    SaveDealerCreditInfo() {
        this.submittedCredit = true;
        const data = this.dealercreditForm.value;

        if (this.dealercreditForm.invalid) {
            return;
        }
        let formData = new FormData();
        for (const key of Object.keys(this.dealercreditForm.value)) {
            const value = this.dealercreditForm.value[key];
            if (key == "dealer_info_id") {
                let dealerinfoId = this.rowData.DealerInfoId;
                formData.append("dealer_info_id", dealerinfoId);
            }
            
            if (key == "expiry_date") {
                let date = new Date(value).toISOString();
                formData.append("expiry_date", date);
            }
            else {
                formData.append(key, value);
                formData.append("dealer_info_id", this.rowData.DealerInfoId);
                //formData.append("FileUpload", this.fileToUploadCreditForm);
            }
        }

        if (this.isDealerCreditinfoEdit) {

            data.dealerCreditinfoId = this.rowDataCredit.DealerCreditInfoId;
            formData.append("dealer_credit_info_id", this.rowDataCredit.DealerCreditInfoId);
            this.dealerinfoService.updateDealerCreditInfo(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                if (result.MessageType == 1) {
                    this.dealercreditinfoList.splice(this.dealercreditinfoList.findIndex(item => item.DealerCreditInfoId === data.dealerCreditinfoId), 1);
                    this.dealercreditinfoList.unshift(result.Data);
                    this.selecteddealercreditinfo = result.Data;
                    this.rowDataCredit = result.Data;
                    this.dealerCreditIndex();
                    this.isDealerCreditinfoEdit = false;
                    this.submittedCredit = false;
                    this.dealercreditForm.reset();
                }
            });
            this.gridDisplayCredit = false;
            this.formDisplayCredit = true;
        }
        else {
            this.dealerinfoService.createDealerCreditInfo(formData).subscribe(
                result => {
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                    if (result.MessageType == 1) {
                        this.dealercreditinfoList.unshift(result.Data);
                        this.selecteddealercreditinfo = result.Data;
                        this.rowDataCredit = result.Data;
                        this.dealerCreditIndex();
                        this.isDealerCreditinfoEdit = false;
                        this.submittedCredit = false;
                        this.dealercreditForm.reset();
                    }
                }
            );
            this.gridDisplayCredit = false;
            this.formDisplayCredit = true;
        }

    }

    loadDealerCreditinfoToEdit() {

        debugger;
        if (this.rowDataCredit == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let dealerCreditinfoId = this.rowDataCredit.DealerCreditInfoId;
        this.dealerinfoService.getDealerCreditInfoById(dealerCreditinfoId).subscribe(data => {
            if (data != null) {
                this.isDealerCreditinfoEdit = true;
            }
            this.dealercreditForm.controls['dealer_info_id'].setValue(data.DealerInfoId);
            this.dealercreditForm.controls['security_deposit_id'].setValue(data.SecurityDepositId);
            this.dealercreditForm.controls['amount'].setValue(data.Amount);
            this.dealercreditForm.controls['expiry_date'].setValue(new Date(data.ExpiryDate));
            this.dealercreditForm.controls['remarks'].setValue(data.Remarks);
            //this.dealercreditForm.controls['image_file'].setValue(data.ImageFile);
            //this.photourllink = data.ImageFile;

        });
        this.gridDisplayCredit = false;
        this.formDisplayCredit = true;
    }

    deleteDealerCreditinfo() {
        if (this.rowDataCredit == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.rowSelected = true;
        let dealerCreditinfoId = this.rowDataCredit.DealerCreditInfoId;
        this.dealerinfoService.deleteDealerCreditInfo(dealerCreditinfoId).subscribe(data => {
            if (data.MessageType == 1) {
                this.dealercreditinfoList.splice(this.dealercreditinfoList.findIndex(item => item.DealerCreditInfoId === data.dealerCreditinfoId), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.displayCredit = false;
    }

    deleteCredit(event: Event) {
        if (this.rowDataCredit == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteDealerCreditinfo();
            },
            reject: () => {

            }
        });
    }

    onSelectCreditImage(event) {
        if (event.target.files) {
            var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.photourllink = event.target.result
            }
            alert(this.photourllink)
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                this.dealerCreditImageFile.nativeElement.innerText = file.name;
                this.dealercreditForm.patchValue({
                    FileUpload: file,
                });
            }
        }
    }

    creditFormFileInput(files: FileList) {
        this.fileToUploadCreditForm = files.item(0);
    }

    
    dealerIndex() {
        this.index = 0;
    }     
    
    function(e) {
        this.index = e.index;
    }

    openNext() {
        this.index = (this.index === 7) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 7 : this.index - 1;
    }


    // Contact Infomation Start
    dealerContactIndex() {
        this.index = 4;
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
    dealerLocationIndex() {
        this.index = 5;
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

    // Document Infomation Start
    dealerDocumentIndex() {
        this.index = 6;
        this.indexDocument = 0;
    }

    functionDocument(e) {
        this.indexDocument = e.indexDocument;
    }

    openNextDocument() {
        this.indexDocument = (this.indexDocument === 1) ? 0 : this.indexDocument + 1;
    }

    openPrevDocument() {
        this.indexDocument = (this.indexDocument === 0) ? 1 : this.indexDocument - 1;
    }

    // Credit Infomation Start
    dealerCreditIndex() {
        this.index = 7;
        this.indexCredit = 0;
    }

    functionCredit(e) {
        this.indexCredit = e.indexCredit;
    }

    openNextCredit() {
        this.indexCredit = (this.indexCredit === 1) ? 0 : this.indexCredit + 1;
    }

    openPrevCredit() {
        this.indexCredit = (this.indexCredit === 0) ? 1 : this.indexCredit - 1;
    }

}
