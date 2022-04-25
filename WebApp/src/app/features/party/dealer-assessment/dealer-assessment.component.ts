import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { Criteria } from './criteria';
import { DealerAssessmentService } from './dealer-assessment.service';

@Component({
    selector: 'app-dealer-assessment',
    templateUrl: './dealer-assessment.component.html',
    styleUrls: ['./dealer-assessment.component.scss']
})
export class DealerAssessmentComponent  implements OnInit {
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
    dealerinfoForm: FormGroup;//DealerFormName
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

    dealerAssessmentList: any[];
    selecteddealerAssessment: any;

    assessmentCriteriaList: any[];
    selectedAssessmentCriteria: any;

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
    assessmentScoreForm: FormGroup;
    
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

    criterias: Criteria[];

    clonedProducts: { [s: string]: Criteria; } = {};
        
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

    // Assessment start


    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private messageService: MessageService, private dealerAssessmentService: DealerAssessmentService) {

    }

    ngOnInit(): void {
        this.dealerAssessmentService.getAllDealerVerification().subscribe(data => this.dealerAssessmentList = data);
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
            FileUpload: new FormControl(''),
        });

        this.dealercreditForm = this.formbulider.group({
            dealer_info_id: [''],
            security_deposit_id: ['', [Validators.required]],
            amount: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            remarks: [''],
            FileUpload: new FormControl(''),
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

    viewDealerinfo(a, row) {
        let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getDealerInfoById(dealerinfoId).subscribe(data => {
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

            this.loadAllDealerContactinfos(row);
            this.loadAllDealerLocationinfos(row);
            this.loadAllDealerDocumentinfos(row);
            this.loadAllDealerCreditinfos(row);
            this.loadAllAssessmentCriteria();
        });
        this.toggleGridDisplay();
    }

    // All Dropdown Load here
    loadAllDomicileEnum() {
        this.dealerAssessmentService.getAllDomicile().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllContinentEnum() {
        this.dealerAssessmentService.getAllContinent().subscribe(data => {
            this.allContinent = data;
        });
    }

    loadAllCountryCboList() {
        this.dealerAssessmentService.getAllCountry().subscribe(data => {
            this.allCountry = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.dealerAssessmentService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.dealerAssessmentService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }

    onSelectByDistrictId(districtId: Number) {
        if (districtId != null) {
            this.dealerAssessmentService.getAllThanaCboListByDistrictId(districtId).subscribe(data => {
                this.allThana = data;
            });
        }
        else
            this.allThana = null;
    }

    loadAllZoneCboList() {
        this.dealerAssessmentService.getAllZone().subscribe(data => {
            this.allZone = data;
        });
    }

    loadAllCurrencyCboList() {
        this.dealerAssessmentService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    loadAllBusinessActivitiesEnum() {
        this.dealerAssessmentService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.dealerAssessmentService.getAllIndustrySectorCboList().subscribe(data => {
            this.allIndustrySector = data;
        });
    }

    onSelectBySectorId(sectorId: Number) {
        if (sectorId != null) {
            this.dealerAssessmentService.getAllIndustrySubSectorCboList(sectorId).subscribe(data => {
                this.allIndustrySubSector = data;
            });
        }
        else
            this.allIndustrySubSector = null;
    }

    loadAllOwnershipTypeCboList() {
        this.dealerAssessmentService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllOrganazationTypeEnum() {
        this.dealerAssessmentService.getAllOrganaizationEnum().subscribe(data => {
            this.allOrganazationType = data;
        });
    }

    loadAllRegisterAuthorityCboList() {
        this.dealerAssessmentService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegisterAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.dealerAssessmentService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllPreferredMethodEnum() {
        this.dealerAssessmentService.getAllPreferredMethod().subscribe(data => {
            this.allPreferredMethod = data;
        });
    }

    loadAllSecurityTypeEnum() {
        this.dealerAssessmentService.getAllSecurityType().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    loadAllDealerInfoCboList() {
        this.dealerAssessmentService.getDealerInfoCboList().subscribe(data => {
            this.allDealerInfo = data;
        });
    }

    loadAllGenderEnum() {
        this.dealerAssessmentService.getGenderEnum().subscribe(data => {
            this.allGender = data;
        });
    }

    loadAllReligionEnum() {
        this.dealerAssessmentService.getReligionEnum().subscribe(data => {
            this.allReligion = data;
        });
    }

    loadAllBloodGroupEnum() {
        this.dealerAssessmentService.getBloodGroupEnum().subscribe(data => {
            this.allBloodGroup = data;
        });
    }

    loadAllDocumentCboList() {
        this.dealerAssessmentService.getAllDocumentCboList().subscribe(data => {
            this.allDocument = data;
        });
    }

    LoadAllSecurityTypeCboList() {
        this.dealerAssessmentService.getAllSecurityTypeCboList().subscribe(data => {
            this.allSecurityDeposit = data;
        });
    }

    // All Dealer List 
    loadAllDealerinfos() {
        this.dealerAssessmentService.getAllDealerInfo().subscribe(data => {
            this.dealerinfoList = data;
        });
    }

    loadAllDealerContactinfos(row) {
        let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getAllContactInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealercontactinfoList = data;
        });
    }

    loadAllDealerLocationinfos(row) {
        let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getAllLocationInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealerlocationinfoList = data;
        });
    }

    loadAllDealerDocumentinfos(row) {
        let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getAllDocumentInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealerdocumentinfoList = data;
        });
    }
    loadAllDealerCreditinfos(row) {
        let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getAllCreditInfoByDealerId(dealerinfoId).subscribe(data => {
            this.dealercreditinfoList = data;
        });
    }

    loadAllAssessmentCriteria() {
        //let dealerinfoId = row.DealerInfoId;
        this.dealerAssessmentService.getAllAssessmentCriteria().subscribe(data => {
            this.criterias = data;
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


    dealerIndex() {
        this.index = 0;
    }

    function(e) {
        this.index = e.index;
    }

    openNext() {
        this.index = (this.index === 8) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 8 : this.index - 1;
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


    onRowEditInit(criteria: Criteria) {
        this.clonedProducts[criteria.assessment_criteria_id] = { ...criteria };
    }

    onRowEditSave(criteria: Criteria) {
        debugger

        if (criteria.assessment_criteria_id > 0) {

           
            let assessment_criteria_id = criteria.assessment_criteria_id;
            let criteria_type_id = 2;
            let automatic_score = criteria.automatic_score;
            let manual_score = criteria.manual_score;
            let actual_score = criteria.actual_score;
            let comment = criteria.comment;
            let dealerinfoId = this.dealerinfoForm.get('dealer_info_code')?.value;

            const scoreobj = {
                dealer_info_id: dealerinfoId,
                assessment_criteria_id: assessment_criteria_id,
                criteria_type_id: criteria_type_id,
                automatic_score: automatic_score,
                manual_score: manual_score,
                actual_score: actual_score,
                comment: comment
            }

            this.dealerAssessmentService.createDealerAssessment(scoreobj).subscribe(data => {
                this.dataSaved = true;
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });

            delete this.clonedProducts[criteria.assessment_criteria_id];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        }
    }

    onRowEditCancel(criteria: Criteria, index: number) {
        this.criterias[index] = this.clonedProducts[criteria.assessment_criteria_id];
        delete this.clonedProducts[criteria.assessment_criteria_id];
    }


}
