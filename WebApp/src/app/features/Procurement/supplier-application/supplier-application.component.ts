import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import SupplierApplication from './supplier-application.model';
import { SupplierApplicationService } from './supplier-application.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';



@Component({
    selector: 'app-supplier-application',
    templateUrl: './supplier-application.component.html',
    styleUrls: ['./supplier-application.component.css']
})

export class SupplierApplicationComponent implements OnInit {

    @ViewChild('supplierImage', {
        static: true
    }) supplierImage;

    supplierApplicationForm: FormGroup;
    businessApplicationForm: FormGroup;
    associationsApplicationForm: FormGroup;
    legalDocumentApplicationForm: FormGroup;
    locationApplicationForm: FormGroup;
    warehouseApplicationForm: FormGroup;
    contactApplicationForm: FormGroup;
    ContactLocationApplicationForm: FormGroup;
    financialApplicationForm: FormGroup;
    mobileBankingApplicationForm: FormGroup;
    bankingApplicationForm: FormGroup;



    submittedBasic = false;
    submittedBusiness = false;
    submittedBusinessSector = false;
    submittedAssociation = false;
    submittedLegalDocument = false;
    submittedLocation = false;
    submittedWarehouse = false;
    submittedContact = false;
    submittedContactLocation = false;
    submittedFinancial = false;
    submittedFinancialSecurity = false;
    submittedMobileBanking = false;
    submittedBanking = false;
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
    }
    //end grid and form show hide ********************



    // for photo and signature upload
    fileToUploadLegalForm: File | null = null;
    fileToUploadNID: File | null = null;
    fileToUploadSecurity: File | null = null;
    fileurllink: null;

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

    /*  supplier_id: any = 1;*/


    selectedSubSectorTable: SupplierApplication;
    selectedLocationTable: SupplierApplication;
    selectedContactTable: SupplierApplication;
    selectedContactLocationTable: SupplierApplication;
    selectedSecurityDepositTable: SupplierApplication;
    selectedMobileBankingTable: SupplierApplication;
    selectedBankingTable: SupplierApplication;


    subSectorDataSources: any[] = [];
    associationDataSources: any[] = [];
    documentDataSources: any[] = [];
    locationDataSources: any[] = [];
    warehouseDataSources: any[] = [];
    contactDataSources: any[] = [];
    contactLocationDataSources: any[] = [];
    SecurityDepositDataSources: any[] = [];
    mobileBankingDataSources: any[] = [];
    bankingDataSources: any[] = [];


    supplierinfoList: any[];//List Supplierinfo
    selectedsupplierinfo: any;// Selected Dealerinfo
    isSupplierinfoEdit: boolean = false;
    showBasicEdit = true;
    index: number = 0;
    rowSelected: boolean = false;
    selected = true;
    collapsedempInfo = true;
    collapsedempDetails = false;
    collapsed = false;
    checked: boolean = false;



    bank_swift_code: any;
    uploadedFiles: any[] = [];

    supplierData: any;
    businessData: any;
    phone: string;

    rowData: any;
    dataSaved = false;


    nodeSelected: boolean = false;
    allSupplierApplication: Observable<SupplierApplication[]>;
    selection = new SelectionModel<SupplierApplication>(true, []);
    supplierApplicationIdUpdate = null;
    massage = null;


    //Basic Info

    selectedDomicile: any;
    allDomicile: any[];

    selectedRegistryAuthority: any;
    allRegistryAuthority: any[];

    selectedRegulator: any;
    allRegulator: any[];

    selectedOwnershipType: any;
    allOwnershipType: any[];

    selectedSupplierApplication: any;
    supplierApplications: any[];

    selectedCountry: any;
    allCountry: any[];

    selectedDivision: any;
    allDivision: any[];

    selectedDistrict: any;
    allDistrict: any[];

    selectedThana: any;
    allThana: any[];

    selectedZone: any;
    allZone: any[];


    //Business Info

    selectedBusinessActivities: any;
    allBusinessActivities: any[];

    selectedSector: any;
    allSector: any[];

    selectedSubSector: any;
    allSubSector: any[];

    categories: any[] = [];
    selectedItemsList = [];
    checkedIDs = [];


    //Association Info

    selectedAssociation: any;
    allAssociation: any[];

    selectedCountryAssociation: any;
    allCountryAssociation: any[];

    selectedOrganizationType: any;
    allOrganizationType: any[];

    selectedMembershipType: any;
    allMembershipType: any[];

    //Legal Document

    selectedDocument: any;
    allDocument: any[];

    //Location

    selectedLocationType: any;
    allLocationType: any[];

    selectedCountryLocation: any;
    allCountryLocation: any[];

    selectedDivisionLocation: any;
    allDivisionLocation: any[];

    selectedDistrictLocation: any;
    allDistrictLocation: any[];



    //Warehouse
    selectedLocation: any;
    allLocation: any[];

    //Contact
    selectedContactType: any;
    allContactType: any[];

    selectedDesignation: any;
    allDesignation: any[];

    selectedNationality: any;
    allNationality: any[];

    selectedReligion: any;
    allReligionList: any[];

    selectedMaritalStatus: any;
    allMaritalStatusList: any[];

    selectedGender: any;
    allGenderList: any[];

    selectedBloodGroup: any;
    allBloodGroupList: any[];


    selectedWarehouse: any;
    allWarehouse: any[];

    // Contact Location
    selectedContactLocation: any;
    allContactLocation: any[];

    selectedContactPerson: any;
    allContactPerson: any[];



    //Financial Info
    selectedCurrency: any;
    allCurrency: any[];

    selectedPaymentFrequency: any;
    allPaymentFrequency: any[];

    selectedSecurityType: any;
    allSecurityType: any[];

    selectedMFS: any;
    allMFS: any[];

    selectedMFSType: any;
    allMFSType: any[];

    selectedBankType: any;
    allBankType: any[];

    selectedBank: any;
    allBank: any[];

    selectedBankBranch: any;
    allBankBranch: any[];




    first = 0;
    rows = 10;

    TotalCredit = 0;

    collapsedLocationInfo = true;
    collapsedWarehouseInfo = false;

    collapsedContactInfo = true;
    collapsedLocationWiseContactInfo = false;


    collapsedSecurityDepositInfo = true;
    collapsedMobileBankingInfo = true;
    collapsedBankingInfo = false;


    // for Insert and update data modal
    display: boolean = false;
    displaySubmit: boolean = false;
    displayBasic: boolean = false;

    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }

    showBasicDialog() {
        this.resetForm();
        this.toggleGridDisplay();
    }

    showSubmitDialog() {
        this.displaySubmit = true;
    }


    onRowSelect(event) {

        this.nodeSelected = true;
        this.rowData = event.data;

        let confirmStatus = this.rowData.IsConfirm;
        let feedbackStatus = this.rowData.FeedbackStatus;

        if (confirmStatus == true && feedbackStatus == '1') {
            this.showBasicEdit = false;
        }
        else {
            this.showBasicEdit = true;
        }
    }
    onRowUnselect(event) {
        this.nodeSelected = false;
        this.rowData = null;
    }



    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private router: Router, private SupplierApplicationService: SupplierApplicationService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.formInit();
        this.loadAllSupplierinfos();
        this.loadAllDomicileEnum();
        this.loadAllRegistryAuthorityCboList();
        this.loadAllRegulatorCboList();
        this.loadAllOwnershipTypeCboList();
        this.loadAllCountryCboList();

        this.loadAllBusinessActivitiesEnum();
        this.loadAllSectorCboList();
        this.loadAllEcommerceList();

        this.loadAllAssociationCboList();
        this.loadAllOrganizationTypeEnum();
        this.loadAllMembershipEnum();

        this.loadAllDocumentCboList();

        this.loadAllLocationTypeCboList();

        this.loadAllContactTypeCboList();
        this.LoadAllDesignationCboList();
        this.loadGenderdrpdwn();
        this.loadReligiondrpdwn();
        this.loadBloodGroupdrpdwn();
        this.loadNationalitydrpdwn();
        this.loadMaritalStatusdrpdwn();

        this.LoadAllCurrencyCboList();
        this.LoadAllSecurityTypeCboList();
        this.LoadAllPaymentFrequencyCboList();

        this.LoadAllMfsCboList();
        this.LoadAllMfsTypeCboList();

        this.LoadAllBankTypeCboList();
    }

    formInit() {
        this.supplierApplicationForm = this.formbulider.group({
            supplier_code: [''],
            legal_name: ['', [Validators.required]],
            short_name: ['', [Validators.required]],
            year_established: [null],

            domicile_enum_id: ['', [Validators.required]],
            registry_authority_id: ['', [Validators.required]],
            regulator_id: ['', [Validators.required]],
            ownership_type_id: ['', [Validators.required]],

            name_in_local_language: [''],
            address_in_local_language: [''],
            ImageUpload: new FormControl(''),
            country_id: ['', [Validators.required]],
            division_id: ['', [Validators.required]],
            district_id: ['', [Validators.required]],
            city: [''],
            ps_area: [''],
            post_code: [''],
            block: [''],
            road_no: [''],
            house_no: [''],
            flat_no: [''],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            mobile_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone_no: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            pabx: [''],

        });
        this.supplierApplicationForm.controls['supplier_code'].disable();


        //Business
        this.businessApplicationForm = this.formbulider.group({
            business_activities_enum_id: ['', [Validators.required]],
            industry_sector_id: ['', [Validators.required]],
            industry_sub_sector_id: ['', [Validators.required]],
            management_staff_no: [0],
            nonmanagement_staff_no: [0],
            permanent_worker_no: [0],
            casual_worker_no: [0],
            status: [''],
        });



        //Association
        this.associationsApplicationForm = this.formbulider.group({
            association_id: ['', [Validators.required]],
            abbreviation: [''],
            country_id_association: [''],
            organization_type_id_enum: [''],
            membership_type_enum_id: ['', [Validators.required]],
            association_number: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
        });
        this.associationsApplicationForm.controls['abbreviation'].disable();
        this.associationsApplicationForm.controls['country_id_association'].disable();
        this.associationsApplicationForm.controls['organization_type_id_enum'].disable();

        //LegalDocument
        this.legalDocumentApplicationForm = this.formbulider.group({
            document_type_id: ['', [Validators.required]],
            document_number: ['', [Validators.required]],
            issue_date: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            file_path: [null],
            FileUpload: new FormControl('', [Validators.required]),
        });

        ////Location
        this.locationApplicationForm = this.formbulider.group({
            location_type_id: ['', [Validators.required]],
            supplier_location_name: ['', [Validators.required]],
            country_id_location: ['', [Validators.required]],
            division_id_location: ['', [Validators.required]],
            district_id_location: ['', [Validators.required]],
            city: [''],
            ps_area: [''],
            post_code: [''],
            block: [''],
            road_no: [''],
            house_no: [''],
            flat_no: [''],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            mobile_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone_no: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            pabx: [''],
        });


        ////Warehouse
        this.warehouseApplicationForm = this.formbulider.group({
            supplier_location_id: ['', [Validators.required]],
            supplier_warehouse_name: ['', [Validators.required]],
            add_note: [''],
        });


        ////Contact
        this.contactApplicationForm = this.formbulider.group({
            contact_type_id: ['', [Validators.required]],
            first_name: ['', [Validators.required]],
            middle_name: [''],
            sur_name: [''],
            designation_id: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            mobile_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            phone_no: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            whatsapp: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            facebook: [''],
            linkedin: [''],
            nationality_id: ['', [Validators.required]],
            religion_enum_id: [0],
            date_of_birth: [null],
            gender_enum_id: ['', [Validators.required]],
            marital_status_enum_id: [0],
            date_of_marriage: [null],
            nid_number: ['', [Validators.required]],
            FileUpload: new FormControl('', [Validators.required]),
            blood_group_enum_id: [0],
            passport_no: [''],
            birth_id: [''],
            driving_license_no: [''],

        });


        this.ContactLocationApplicationForm = this.formbulider.group({
            supplier_location_id: ['', [Validators.required]],
            supplier_contact_id: ['', [Validators.required]],
            add_note: [''],
        });


        ////Financial Info
        this.financialApplicationForm = this.formbulider.group({
            currency_id: ['', [Validators.required]],
            credit_days: ['', [Validators.required]],
            credit_limit: [0, [Validators.required]],
            payment_frequency_id: ['', [Validators.required]],
            security_deposit_id: ['', [Validators.required]],
            security_amount: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            //security_document_path: [null],
            //FileUpload: new FormControl('', [Validators.required]),
        });
       /* this.financialApplicationForm.controls['credit_limit'].disable();*/

        this.mobileBankingApplicationForm = this.formbulider.group({
            mfs_id: ['', [Validators.required]],
            account_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            mfs_type_id: ['', [Validators.required]],
        });

        this.bankingApplicationForm = this.formbulider.group({
            bank_type_id: ['', [Validators.required]],
            bank_id: ['', [Validators.required]],
            bank_branch_id: ['', [Validators.required]],
            account_name: ['', [Validators.required]],
            account_number: ['', [Validators.required]],
            bank_branch_routing: [''],
            bank_swift_code: [''],
            iban: [''],
        });
        this.bankingApplicationForm.controls['bank_branch_routing'].disable();
        this.bankingApplicationForm.controls['bank_swift_code'].disable();


    }



    toggle() {
        if (this.collapsedLocationInfo) {
            this.collapsedWarehouseInfo = true;
            this.collapsedLocationInfo = false;
        }
        else {
            this.collapsedLocationInfo = true;
            this.collapsedWarehouseInfo = false;
        }
    }

    toggleContact() {
        if (this.collapsedContactInfo) {
            this.collapsedLocationWiseContactInfo = true;
            this.collapsedContactInfo = false;
        }
        else {
            this.collapsedLocationWiseContactInfo = true;
            this.collapsedWarehouseInfo = false;
        }
    }

    toggleFinancialInfo() {
        if (this.collapsedSecurityDepositInfo) {
            this.collapsedMobileBankingInfo = true;
            this.collapsedSecurityDepositInfo = false;
            this.collapsedBankingInfo = true;

        }
        if (this.collapsedMobileBankingInfo) {
            this.collapsedMobileBankingInfo = false;
            this.collapsedSecurityDepositInfo = true;
            this.collapsedBankingInfo = true;

        }
        else {
            this.collapsedSecurityDepositInfo = true;
            this.collapsedMobileBankingInfo = true;
            this.collapsedBankingInfo = false;
        }
    }


    // All Supplier List 
    loadAllSupplierinfos() {
        this.SupplierApplicationService.getAllSupplierInfo().subscribe(data => {
            this.supplierinfoList = data;
        });
    }

    loadAllDomicileEnum() {
        this.SupplierApplicationService.getAllDomicileEnum().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllRegistryAuthorityCboList() {
        this.SupplierApplicationService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegistryAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.SupplierApplicationService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllOwnershipTypeCboList() {
        this.SupplierApplicationService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllCountryCboList() {
        this.SupplierApplicationService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
            this.allCountryAssociation = data;
            this.allCountryLocation = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.SupplierApplicationService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByCountryIdLocation(countryId: Number) {
        if (countryId != null) {
            this.SupplierApplicationService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivisionLocation = data;
            });
        }
        else
            this.allDivisionLocation = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierApplicationService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }


    onSelectByDivisionIdLocation(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierApplicationService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrictLocation = data;
            });
        }
        else
            this.allDistrictLocation = null;

    }

    //Business dd load

    loadAllBusinessActivitiesEnum() {
        this.SupplierApplicationService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.SupplierApplicationService.getAllIndustrySectorCboList().subscribe(data => {
            this.allSector = data;
        });
    }

    onSelectBySectorId() {
        let IndustrysectorObj = this.businessApplicationForm.get('industry_sector_id')?.value;
        let IndustrySectorId = IndustrysectorObj.industry_sector_id;
        if (IndustrySectorId != null) {
            this.SupplierApplicationService.getAllIndustrySubSectorCboList(IndustrySectorId).subscribe(data => {
                this.allSubSector = data;
            });
        }
        else
            this.allSubSector = null;
    }

    loadAllEcommerceList() {
        this.SupplierApplicationService.getAllEcommerceList().subscribe(data => {

            this.categories = data;

        });
    }

    //Association dd load

    loadAllAssociationCboList() {
        this.SupplierApplicationService.getAllAssociationCboList().subscribe(data => {
            this.allAssociation = data;
        });
    }


    onSelectByAssociationId() {
        let associationObj = this.associationsApplicationForm.get('association_id')?.value;
        let associationId = associationObj.association_id;
        //if (associationId != null) {
        this.SupplierApplicationService.getAllDataByAssociationId(associationId).subscribe(data => {
            this.associationsApplicationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
            this.associationsApplicationForm.controls['abbreviation'].setValue(data.abbreviation);
            let countryAssociationId = data.country_id;
            if (countryAssociationId != null) {
                this.SupplierApplicationService.GetByCountryId(countryAssociationId).subscribe(data => {
                    this.associationsApplicationForm.controls['country_id_association'].setValue(data.country_id);
                });
            }
        });
    }


    loadAllOrganizationTypeEnum() {
        this.SupplierApplicationService.getAllOrganizationTypeEnum().subscribe(data => {
            this.allOrganizationType = data;
        });
    }

    loadAllMembershipEnum() {
        this.SupplierApplicationService.getAllMembershipEnum().subscribe(data => {
            this.allMembershipType = data;
        });
    }

    loadAllSupplierAssociation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationDataSources = data;
        });
    }


    ////Legal dd load
    loadAllDocumentCboList() {
        this.SupplierApplicationService.getAllDocumentCboList().subscribe(data => {
            this.allDocument = data;
        });
    }

    LoadAllLegalDocument() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllLegalDocument(supplierId).subscribe(data => {
            this.documentDataSources = data;
        });
    }

    //Location dd load
    loadAllLocationTypeCboList() {
        this.SupplierApplicationService.getAllLocationTypeCboList().subscribe(data => {
            this.allLocationType = data;
        });
    }

    loadAllSupplierLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;
        });
    }



    ////Warehouse dd load
    loadAllSupplierWarehouse() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });
    }

    ////Contact dd load
    loadAllContactTypeCboList() {
        this.SupplierApplicationService.getAllContactTypeCboList().subscribe(data => {
            this.allContactType = data;
        });
    }

    LoadAllDesignationCboList() {
        this.SupplierApplicationService.getAllDesignationCboList().subscribe(data => {
            this.allDesignation = data;
        });
    }

    loadGenderdrpdwn() {
        this.SupplierApplicationService.getGenderCboList().subscribe(data => {
            this.allGenderList = data;
        });
    }

    loadReligiondrpdwn() {
        this.SupplierApplicationService.getReligionCboList().subscribe(data => {
            this.allReligionList = data;
        });
    }

    loadBloodGroupdrpdwn() {
        this.SupplierApplicationService.getBloodGroupCboList().subscribe(data => {
            this.allBloodGroupList = data;
        });
    }

    loadNationalitydrpdwn() {
        this.SupplierApplicationService.getAllCountryCboList().subscribe(data => {
            this.allNationality = data;
        });
    }

    loadMaritalStatusdrpdwn() {
        this.SupplierApplicationService.getMaritalStatusCboList().subscribe(data => {
            this.allMaritalStatusList = data;
        });
    }

    loadAllSupplierContact() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierContact(supplierId).subscribe(data => {
            this.contactDataSources = data;
            this.allContactPerson = data;
        });
    }

    loadAllSupplierContactLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            this.contactLocationDataSources = data;
        });
    }

    //// Financial dd load


    LoadAllCurrencyCboList() {
        this.SupplierApplicationService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    LoadAllSecurityTypeCboList() {
        this.SupplierApplicationService.getAllSecurityTypeCboList().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    LoadAllPaymentFrequencyCboList() {
        this.SupplierApplicationService.getAllPaymentFrequencyCboList().subscribe(data => {
            this.allPaymentFrequency = data;
        });
    }


    LoadAllMfsCboList() {
        this.SupplierApplicationService.getAllMfsCboList().subscribe(data => {
            this.allMFS = data;
        });
    }

    LoadAllMfsTypeCboList() {
        this.SupplierApplicationService.getAllMfsTypeCboList().subscribe(data => {
            this.allMFSType = data;
        });
    }

    LoadAllBankTypeCboList() {
        this.SupplierApplicationService.getAllBankTypeCboList().subscribe(data => {
            this.allBankType = data;
        });
    }



    loadAllSupplierMFS() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.mobileBankingDataSources = data;
        });
    }

    loadAllSupplierBankAccount() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierApplicationService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });
    }


    onSelectByBankTypeId(bankTypeId: Number) {
        if (bankTypeId != null) {
            this.SupplierApplicationService.getAllBankCboListByBankTypeId(bankTypeId).subscribe(data => {
                this.allBank = data;
            });
        }
        else
            this.allBank = null;
    }


    onSelectByBankId(bankId: Number) {

        this.SupplierApplicationService.getAllBankBranchCboListByBankId(bankId).subscribe(data => {
            this.allBankBranch = data;
        });

        this.SupplierApplicationService.GetBankById(bankId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.BankSwiftCode);
        });

    }

    onSelectByBankBranchId(bankBranchId: Number) {
        this.SupplierApplicationService.GetAllBankBranchByBankBranchId(bankBranchId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_branch_routing'].setValue(data.BankBranchRouting);
        });

    }


    loadSupplierinfoToEdit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let supplierId = this.rowData.SupplierId;

        this.SupplierApplicationService.getSupplierBasicInfo(supplierId).subscribe(data => {
            this.supplierApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;

                this.supplierApplicationForm.controls['supplier_code'].setValue(data.SupplierCode);
                this.supplierApplicationForm.controls['legal_name'].setValue(data.LegalName);
                this.supplierApplicationForm.controls['short_name'].setValue(data.ShortName);
                this.supplierApplicationForm.controls['year_established'].setValue(new Date(data.YearEstablished));
                this.supplierApplicationForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
                this.supplierApplicationForm.controls['registry_authority_id'].setValue(data.RegistryAuthorityId);
                this.supplierApplicationForm.controls['regulator_id'].setValue(data.RegulatorId);
                this.supplierApplicationForm.controls['ownership_type_id'].setValue(data.OwnershipTypeId);
                this.supplierApplicationForm.controls['name_in_local_language'].setValue(data.NameInLocalLanguage);
                this.supplierApplicationForm.controls['address_in_local_language'].setValue(data.AddressInLocalLanguage);
                this.supplierApplicationForm.controls['country_id'].setValue(data.CountryId);
                this.onSelectByCountryId(data.CountryId);
                this.supplierApplicationForm.controls['division_id'].setValue(data.DivisionId);
                this.onSelectByDivisionId(data.DivisionId);
                this.supplierApplicationForm.controls['district_id'].setValue(data.DistrictId);
                this.supplierApplicationForm.controls['city'].setValue(data.City);
                this.supplierApplicationForm.controls['ps_area'].setValue(data.PsArea);
                this.supplierApplicationForm.controls['post_code'].setValue(data.PostCode);
                this.supplierApplicationForm.controls['block'].setValue(data.Block);
                this.supplierApplicationForm.controls['road_no'].setValue(data.RoadNo);
                this.supplierApplicationForm.controls['house_no'].setValue(data.HouseNo);
                this.supplierApplicationForm.controls['flat_no'].setValue(data.FlatNo);
                this.supplierApplicationForm.controls['email'].setValue(data.Email);
                this.supplierApplicationForm.controls['mobile_no'].setValue(data.MobileNo);
                this.supplierApplicationForm.controls['phone_no'].setValue(data.PhoneNo);
                this.supplierApplicationForm.controls['pabx'].setValue(data.Pabx);
            }
        });

        this.SupplierApplicationService.getAllSupplierBusiness(supplierId).subscribe(data => {
            /*            this.businessApplicationForm.reset();*/
            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
                this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
                this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
                this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
                this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
            }
        });

        this.SupplierApplicationService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
            this.subSectorDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
            this.categories = data;
            for (let i = 0; i < data.length; i++) {
                const id = data[i].id;
                const name = data[i].name;
                const status = data[i].status;
                if (status == true) {
                    let supplierId = this.rowData.SupplierId;
                    const ecommerceobj = { supplier_id: supplierId, ecommerce_platforms_id: id, ecommerce_paltforms_name: name }
                    this.checkedIDs.push(ecommerceobj);
                }
            }
        });

        this.SupplierApplicationService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationsApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.associationDataSources = data;
        });

        this.SupplierApplicationService.getAllLegalDocument(supplierId).subscribe(data => {
            this.legalDocumentApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.documentDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;
        });

        this.SupplierApplicationService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierContact(supplierId).subscribe(data => {
            this.ContactLocationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.contactDataSources = data;
            this.allContactPerson = data;
        });

        this.SupplierApplicationService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            this.contactLocationDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierMFS(supplierId).subscribe(data => {
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.mobileBankingDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
            this.SecurityDepositDataSources = data;
        });

        this.SupplierApplicationService.getAllSupplierCreditHistory(supplierId).subscribe(data => {

            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.financialApplicationForm.controls['currency_id'].setValue(data.currency_id);
                this.financialApplicationForm.controls['credit_days'].setValue(data.credit_days);
                this.financialApplicationForm.controls['credit_limit'].setValue(data.credit_limit);
                this.financialApplicationForm.controls['payment_frequency_id'].setValue(data.payment_frequency_id);
            }
        });

        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get a(): { [key: string]: AbstractControl } {
        return this.supplierApplicationForm.controls;
    }

    get b(): { [key: string]: AbstractControl } {
        return this.businessApplicationForm.controls;
    }

    get c(): { [key: string]: AbstractControl } {
        return this.associationsApplicationForm.controls;
    }

    get d(): { [key: string]: AbstractControl } {
        return this.legalDocumentApplicationForm.controls;
    }

    get e(): { [key: string]: AbstractControl } {
        return this.locationApplicationForm.controls;
    }

    get f(): { [key: string]: AbstractControl } {
        return this.warehouseApplicationForm.controls;
    }

    get g(): { [key: string]: AbstractControl } {
        return this.contactApplicationForm.controls;
    }

    get h(): { [key: string]: AbstractControl } {
        return this.ContactLocationApplicationForm.controls;
    }

    get i(): { [key: string]: AbstractControl } {
        return this.financialApplicationForm.controls;
    }

    get j(): { [key: string]: AbstractControl } {
        return this.mobileBankingApplicationForm.controls;
    }

    get k(): { [key: string]: AbstractControl } {
        return this.bankingApplicationForm.controls;
    }




    onFormSubmit(): void {

        //for validation message -----------
        this.submittedBasic = true;
        const data = this.supplierApplicationForm.value;
        if (this.supplierApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        let formData = new FormData();
        for (const key of Object.keys(this.supplierApplicationForm.value)) {
            const value = this.supplierApplicationForm.value[key];
            if (key == "year_established") {
                let date = new Date(value).toISOString();
                formData.append("year_established", date);
            }
            else {
                formData.append(key, value);
            }
        } formData.append("domicile_enum_id", this.supplierApplicationForm.value.domicile_enum);
        formData.append("registry_authority_id", this.supplierApplicationForm.value.registry_authority_id);
        formData.append("regulator_id", this.supplierApplicationForm.value.regulator_id);
        formData.append("ownership_type_id", this.supplierApplicationForm.value.ownership_type_id);
        formData.append("country_id", this.supplierApplicationForm.value.country_id);
        formData.append("division_id", this.supplierApplicationForm.value.divisionObj);
        formData.append("district_id", this.supplierApplicationForm.value.districtObj);

        if (this.rowData != null) {

            data.supplierId = this.rowData.SupplierId;
            formData.append("supplier_id", this.rowData.SupplierId);
            this.SupplierApplicationService.updateSupplierApplication(formData).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.supplierinfoList.splice(this.supplierinfoList.findIndex(item => item.SupplierId === data.SupplierId), 1);
                    this.supplierinfoList.unshift(result.Data[0]);
                    this.selectedsupplierinfo = result.Data[0];
                    this.rowData = result.Data[0];
                    this.submitted = false;

                }
            });
        }
        else {
            this.SupplierApplicationService.createSupplierApplication(formData).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.supplierinfoList.unshift(result.Data[0]);
                    this.selectedsupplierinfo = result.Data[0];
                    this.rowData = result.Data[0];
                    this.submitted = false;
                }
            }
            );
        }
    }

    openBasicNext() {
        this.onFormSubmit();
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }


    deleteModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This Supplier already approved");
        }
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteSupplierinfo();
            },
            reject: () => {

            }
        });
    }

    deleteSupplierinfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let supplierId = this.rowData.SupplierId;

        this.SupplierApplicationService.DeleteSupplierApplication(supplierId).subscribe(data => {
            this.massage = null;
            this.loadAllSupplierinfos();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            this.rowData == null;
        });
        this.display = false;
    }

    submitSupplierInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let supplierId = this.rowData.SupplierId;

        if (this.bankingDataSources.length == 0) {
            return this.notifyService.ShowNotification(2, "Please add at least one Bank Account Information")
        }
        if (this.SecurityDepositDataSources.length == 0) {
            return this.notifyService.ShowNotification(2, "Please add Security Deposit")
        }
        else {
            this.SupplierApplicationService.SubmitSupplierInfoData(supplierId).subscribe(data => {
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
                this.displaySubmit = false;
                this.loadAllSupplierinfos();
                /*   this.resetForm();*/
                //this.index = (this.index === 3) ? 0 : this.index + 1;
                //this.index = 0;


                this.toggleFormDisplay();
            });
        }

    }

    //Business Submit
    addSubSectorToTable(a) {

        debugger

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please save Basic Info first');
        }

        this.submittedBusinessSector = true;
        const data = this.businessApplicationForm.value;
        if ((data.industry_sector_id == "") || (data.industry_sector_id == null) || (data.industry_sector_id == undefined)) {
            return;
        }
        else if ((data.industry_sub_sector_id == "") || (data.industry_sub_sector_id == null) || (data.industry_sub_sector_id == undefined)) {
            return;
        }

        else {

            let IndustrySectorObj = this.businessApplicationForm.get('industry_sector_id')?.value;
            let IndustrySectorId = IndustrySectorObj.industry_sector_id;
            let IndustrySectorName = IndustrySectorObj.industry_sector_name;

            let IndustrySubSectorObj = this.businessApplicationForm.get('industry_sub_sector_id')?.value;
            let industrySubSectorId = IndustrySubSectorObj.industry_sub_sector_id;
            let industrySubSectorName = IndustrySubSectorObj.industry_sub_sector_name;
            if (this.dataSubSectorExist(industrySubSectorId)) {
                return this.notifyService.ShowNotification(2, "Selected Sub Sector already added")
            }
            else {
                if (this.subSectorDataSources.includes(this.businessApplicationForm.get('industry_sub_sector_id')?.value)) {
                    return this.toastr.warning("Please select Sub Sector")
                }
                let supplierId = this.rowData.SupplierId;
                const sectorSubSectorobj = { supplier_id: supplierId, industry_sector_id: IndustrySectorId, industry_sector_name: IndustrySectorName, industry_sub_sector_id: industrySubSectorId, industry_sub_sector_name: industrySubSectorName }
                this.subSectorDataSources.push(sectorSubSectorobj);
            }
        }
    }

    dataSubSectorExist(industrySubSectorId) {
        return this.subSectorDataSources.some(function (el) {
            return el.industry_sub_sector_id === industrySubSectorId;
        });
    }

    removeSubSector(a, row) {
        this.subSectorDataSources = this.subSectorDataSources.slice(0, a).concat(this.subSectorDataSources.slice(a + 1));

    }

    onCheckboxChange(category, id, name) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (category.checked) {
            let supplierId = this.rowData.SupplierId;
            const ecommerceobj = { supplier_id: supplierId, ecommerce_platforms_id: id, ecommerce_paltforms_name: name }
            this.checkedIDs.push(ecommerceobj);
        }
        else {
            this.checkedIDs = this.checkedIDs.filter(item => item.ecommerce_platforms_id !== id);
        }
    }

    onBusinessFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        this.submittedBusiness = true;
        const businessData = this.businessApplicationForm.value;
        if ((businessData.business_activities_enum_id == "") || (businessData.business_activities_enum_id == null) || (businessData.business_activities_enum_id == undefined)) {
            return;
        }
        else if (this.subSectorDataSources.length == 0) {
            return this.notifyService.ShowNotification(2, "Please add at least one subsector")
        }

        else {
            let supplierId = this.rowData.SupplierId;
            businessData.subSectorSession = this.subSectorDataSources;

            businessData.ecommerceSession = this.checkedIDs;
            businessData.supplier_id = supplierId;

            this.SupplierApplicationService.updateBusinessData(businessData).subscribe(data => {
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }
    }

    openBusinessNext() {
        this.onBusinessFormSubmit();
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }

    // Association submit

    formatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }

    onAssociationFormSubmit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        //for validation message -----------
        this.submittedAssociation = true;
        const associationData = this.associationsApplicationForm.value;
        if (this.associationsApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        let association_id = this.associationsApplicationForm.get('association_id')?.value.association_id;
        let association_name = this.associationsApplicationForm.get('association_id')?.value.association_name;
        if (this.dataExistAssociation(association_name)) {
            return this.notifyService.ShowNotification(2, "Selected Association already added")
        }

        else {
            let supplierId = this.rowData.SupplierId;
            associationData.membership_type_enum_id = associationData.membership_type_enum_id;
            associationData.association_id = association_id;
            associationData.supplier_id = supplierId;
            this.SupplierApplicationService.updateAssociationData(associationData).subscribe(data => {
                this.dataSaved = true;
                this.loadAllSupplierAssociation();
                /*    this.resetForm();*/
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }
    }

    dataExistAssociation(association_name) {
        return this.associationDataSources.some(function (el) {
            return el.association_name === association_name;
        });
    }

    deleteAssociationInfo(a, row) {
        let supplier_association_id = row.supplier_association_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteAssociationInfo(supplier_association_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierAssociation(supplierId).subscribe(data => {
                    this.associationDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.associationDataSources = this.associationDataSources.slice(0, a).concat(this.associationDataSources.slice(a + 1));
        }
    }


    //// Location submit

    onLegalDocumentFormSubmit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        //for validation message -----------
        this.submittedLegalDocument = true;
        if (this.legalDocumentApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;

        let supplierId = this.rowData.SupplierId;

        let document_type_id = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_id;
        let document_type_name = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_name;
        if (this.dataExistDocument(document_type_name)) {
            return this.notifyService.ShowNotification(2, "Selected Document already added")
        }

        else {
            let formData = new FormData();

            for (const key of Object.keys(this.legalDocumentApplicationForm.value)) {
                const value = this.legalDocumentApplicationForm.value[key];
                if (key == "issue_date") {
                    let date = new Date(value).toISOString();
                    formData.append("issue_date", date);
                }
                else if (key == "expiry_date") {
                    let date = new Date(value).toISOString();
                    formData.append("expiry_date", date);
                }
                else if (key == "document_type_id") {

                    formData.append("document_type_id", document_type_id);
                }
                else {
                    formData.append(key, value);
                    formData.append("supplier_id", supplierId);
                    formData.append("FileUpload", this.fileToUploadLegalForm);
                }
            }


            this.SupplierApplicationService.updateDocumentData((formData)).subscribe(data => {
                this.dataSaved = true;
                this.LoadAllLegalDocument();
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
                /*       this.resetForm();*/
            });
        }





        //if (this.associationIdUpdate == null) {

        //  this.AssociationService.CreateAssociation(associationdata).subscribe(
        //    result => {
        //      this.dataSaved = true;
        //      this.loadAllassociations();
        //      this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        //      this.associationIdUpdate = null;
        //      this.displayBasic = false;
        //    }
        //  );
        //}

        //let formData = new FormData();

        //const documentData = this.legalDocumentApplicationForm.value;

        //documentData.documentSession = this.documentDataSources;
        //for (let i = 0; i < this.documentDataSources.length; i++) {
        //  for (const key of Object.keys(this.documentDataSources[i])) {
        //    const value = this.documentDataSources[i][key];
        //    if (key == "issue_date") {
        //      let date = new Date(value).toISOString();
        //      formData.append("issue_date", date);
        //    }
        //    else if (key == "expiry_date") {
        //      let date = new Date(value).toISOString();
        //      formData.append("expiry_date", date);
        //    }
        //    else {
        //      formData.append(key, value);
        //      formData.append("supplier_id", this.supplier_id);
        //    }
        //  }

        //}

        //var arr = [];
        //var object = {};
        //formData.forEach(function (value, key) {
        //  arr[key] = value;
        //  //fd.append(key, value);
        //});

        //var json = JSON.stringify(arr);
        //console.log(object)

        //if (this.documentDataSources.length == 0) {
        //  return this.notifyService.ShowNotification(2, "Please select at least one Document")
        //}
        //else {
        //  //formData.append("supplier_id", this.supplierApplicationIdUpdate);
        //  this.SupplierApplicationService.updateDocumentData((formData)).subscribe(data => {
        //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
        //  });
        //}


    }

    dataExistDocument(document_type_name) {
        return this.documentDataSources.some(function (el) {
            return el.document_type_name === document_type_name;
        });
    }

    deleteDocumentinfo(a, row) {
        let supplier_document_id = row.supplier_document_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteDocumentInfo(supplier_document_id).subscribe(data => {
                this.SupplierApplicationService.getAllLegalDocument(supplierId).subscribe(data => {
                    this.documentDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.documentDataSources = this.documentDataSources.slice(0, a).concat(this.documentDataSources.slice(a + 1));
        }
    }


    //// Location submit

    onLocationFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        //for validation message -----------
        this.submittedLocation = true;
        const locationData = this.locationApplicationForm.value;
        if (this.locationApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;


        let location_type_id = this.locationApplicationForm.get('location_type_id')?.value.location_type_id;
        let location_type_name = this.locationApplicationForm.get('location_type_id')?.value.location_type_name;
        if (this.dataExistLocation(location_type_name)) {
            return this.notifyService.ShowNotification(2, "Selected location name already added")
        }


        else {


            locationData.supplier_id = this.rowData.SupplierId;
            locationData.country_id = locationData.country_id_location;
            locationData.division_id = locationData.division_id_location;
            locationData.district_id = locationData.district_id_location;
            locationData.location_type_id = location_type_id;

            this.SupplierApplicationService.updateLocationData(locationData).subscribe(data => {
                this.dataSaved = true
                this.loadAllSupplierLocation();
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
                /* this.resetForm();*/
            });

        }

    }

    dataExistLocation(location_type_name) {
        return this.locationDataSources.some(function (el) {
            return el.location_type_name === location_type_name;
        });
    }

    deleteLocation(a, row) {
        let supplier_location_id = row.supplier_location_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteLocationInfo(supplier_location_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierLocation(supplierId).subscribe(data => {
                    this.locationDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.locationDataSources = this.locationDataSources.slice(0, a).concat(this.locationDataSources.slice(a + 1));
        }
    }

    ////Warehouse


    onWarehouseFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        //for validation message -----------
        this.submittedWarehouse = true;
        const warehouseData = this.warehouseApplicationForm.value;
        if (this.warehouseApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;

        let supplier_warehouse_name = warehouseData.supplier_warehouse_name;
        if (this.dataExistWarehouse(supplier_warehouse_name)) {
            return this.notifyService.ShowNotification(2, "Selected Warehouse already added")
        }
        else {

            let supplierId = this.rowData.SupplierId;
            let locationObj = this.warehouseApplicationForm.get('supplier_location_id')?.value;
            let supplier_location_id = locationObj.supplier_location_id;
            let supplier_location_type_name = locationObj.supplier_location_type_name;
            let supplier_warehouse_name = this.warehouseApplicationForm.get('supplier_warehouse_name')?.value;
            let add_note = this.warehouseApplicationForm.get('add_note')?.value;


            const warehouseSessionobj = {
                supplier_id: supplierId,
                supplier_location_id: supplier_location_id,
                supplier_location_type_name: supplier_location_type_name,
                supplier_warehouse_name: supplier_warehouse_name,
                add_note: add_note
            }
            this.warehouseDataSources.push(warehouseSessionobj);
            warehouseData.supplier_id = supplierId;
            warehouseData.warehouseSession = this.warehouseDataSources;

            this.SupplierApplicationService.updateWarehouseData(warehouseData).subscribe(data => {
                this.dataSaved = true;
                this.loadAllSupplierWarehouse();
                /*     this.resetForm();*/
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }
    }

    dataExistWarehouse(supplier_warehouse_name) {
        return this.warehouseDataSources.some(function (el) {
            return el.supplier_warehouse_name === supplier_warehouse_name;
        });
    }

    deleteWarehouseInfo(a, row) {
        let supplier_warehouse_id = row.supplier_warehouse_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteWarehouseInfo(supplier_warehouse_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierWarehouse(supplierId).subscribe(data => {
                    this.warehouseDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.warehouseDataSources = this.warehouseDataSources.slice(0, a).concat(this.warehouseDataSources.slice(a + 1));
        }
    }



    ////Contacts

    onContactFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        //for validation message -----------
        this.submittedContact = true;
        if (this.contactApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;

        let supplierId = this.rowData.SupplierId;

        let contact_type_id = this.contactApplicationForm.get('contact_type_id')?.value.contact_type_id;
        let contact_type_name = this.contactApplicationForm.get('contact_type_id')?.value.contact_type_name;
        if (this.dataExistContact(contact_type_name)) {
            return this.notifyService.ShowNotification(2, "Selected Contact Type already added")
        }

        else {
            let formData = new FormData();
            for (const key of Object.keys(this.contactApplicationForm.value)) {
                const value = this.contactApplicationForm.value[key];
                if (key == "date_of_birth") {
                    let date = new Date(value).toISOString();
                    formData.append("date_of_birth", date);
                }
                else if (key == "date_of_marriage") {
                    let date = new Date(value).toISOString();
                    formData.append("date_of_marriage", date);
                }
                else if (key == "contact_type_id") {

                    formData.append("contact_type_id", contact_type_id);
                }
                else {
                    formData.append(key, value);
                    formData.append("supplier_id", supplierId);
                    formData.append("FileUpload", this.fileToUploadNID);
                }
            } formData.append("designation_id", this.contactApplicationForm.value.designation_id);
            formData.append("nationality_id", this.contactApplicationForm.value.nationality_id);
            formData.append("religion_enum_id", this.contactApplicationForm.value.religion_enum_id);
            formData.append("gender_enum_id", this.contactApplicationForm.value.gender_enum_id);
            formData.append("marital_status_enum_id", this.contactApplicationForm.value.marital_status_enum_id);
            formData.append("blood_group_enum_id", this.contactApplicationForm.value.blood_group_enum_id);


            var arr = [];
            var object = {};
            formData.forEach(function (value, key) {
                arr[key] = value;
                //fd.append(key, value);
            });

            var json = JSON.stringify(arr);
            console.log(object)

            if (this.contactDataSources.length = 0) {
                return this.notifyService.ShowNotification(2, "Please add at least one Contact")
            }
            else {
                this.SupplierApplicationService.updateContactData((formData)).subscribe(data => {
                    this.loadAllSupplierContact();
                    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
                });
            }
        }

    }

    dataExistContact(contact_type_name) {
        return this.contactDataSources.some(function (el) {
            return el.contact_type_name === contact_type_name;
        });
    }

    DeleteContactInfo(a, row) {
        let supplier_contact_id = row.supplier_contact_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteContactInfo(supplier_contact_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierContact(supplierId).subscribe(data => {
                    this.contactDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.contactDataSources = this.contactDataSources.slice(0, a).concat(this.contactDataSources.slice(a + 1));
        }
    }


    onContactLocationFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let supplierId = this.rowData.SupplierId;

        const contactLocationData = this.ContactLocationApplicationForm.value;

        //for validation message -----------
        this.submittedContactLocation = true;
        if (this.ContactLocationApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;

        let supplier_contact_id = contactLocationData.supplier_contact_id;
        if (this.dataExistContactLocation(supplier_contact_id)) {
            return this.notifyService.ShowNotification(2, "Selected Contact Type already added")
        }

        else {


            let supplier_location_id = contactLocationData.supplier_location_id;
            let supplier_contact_id = contactLocationData.supplier_contact_id;
            let add_note = this.ContactLocationApplicationForm.get('add_note')?.value;


            const contactLocationSessionobj = {
                supplier_id: supplierId,
                supplier_location_id: supplier_location_id,
                supplier_contact_id: supplier_contact_id,
                add_note: add_note

            }
            this.SupplierApplicationService.updateContactLocationData(contactLocationSessionobj).subscribe(data => {
                this.dataSaved = true;
                this.loadAllSupplierContactLocation();
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }
    }

    dataExistContactLocation(supplier_contact_id) {
        return this.contactLocationDataSources.some(function (el) {
            return el.supplier_contact_id === supplier_contact_id;
        });
    }

    deleteContactLocationInfo(a, row) {
        let supplier_contact_location_id = row.supplier_contact_location_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteLocationWiseContactInfo(supplier_contact_location_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
                    this.contactLocationDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.contactLocationDataSources = this.contactLocationDataSources.slice(0, a).concat(this.contactLocationDataSources.slice(a + 1));
        }
    }

    ////Financial Info

    addSecurityDepositToTable(a) {

        this.submittedFinancialSecurity = true;
        const securityDepositData = this.financialApplicationForm.value;


        if ((securityDepositData.security_deposit_id == "") || (securityDepositData.security_deposit_id == null) || (securityDepositData.security_deposit_id == undefined)) {
            return;
        }
        if ((securityDepositData.security_amount == "") || (securityDepositData.security_amount == null) || (securityDepositData.security_amount == undefined)) {
            return;
        }
        if ((securityDepositData.expiry_date == "") || (securityDepositData.expiry_date == null) || (securityDepositData.expiry_date == undefined)) {
            return;
        }


        this.dataSaved = false;
        let security_deposit_id = this.financialApplicationForm.get('security_deposit_id')?.value.security_deposit_id;
        let security_deposit_name = this.financialApplicationForm.get('security_deposit_id')?.value.security_deposit_name;
        if (this.dataExistSecurityDeposit(security_deposit_name)) {
            return this.notifyService.ShowNotification(2, "Selected Security Deposit already added")
        }

        else {


            let supplierId = this.rowData.SupplierId;
            let securityDepositObj = this.financialApplicationForm.get('security_deposit_id')?.value;
            let security_deposit_id = securityDepositObj.security_deposit_id;
            let security_deposit_name = securityDepositObj.security_deposit_name;
            let security_amount = this.financialApplicationForm.get('security_amount')?.value;
            let expiry_date = this.financialApplicationForm.get('expiry_date')?.value;

            //var previous_credit = this.financialApplicationForm.value.credit_limit;
            //var new_security = this.financialApplicationForm.value.security_amount;
            //this.financialApplicationForm.controls['credit_limit'].setValue(previous_credit + new_security);

            const securityDepositSessionobj = {
                supplier_id: supplierId,
                security_deposit_id: security_deposit_id,
                security_deposit_name: security_deposit_name,
                security_amount: security_amount,
                expiry_date_str: this.formatDate(expiry_date),
                expiry_date: (expiry_date),

            }
            this.SecurityDepositDataSources.push(securityDepositSessionobj);



            this.TotalCredit = 0;
            for (let i = 0; i < this.SecurityDepositDataSources.length; i++) {
                for (const key of Object.keys(this.SecurityDepositDataSources[i])) {
                    const value = this.SecurityDepositDataSources[i][key];
                    if (key == "security_amount") {
                        this.TotalCredit = this.TotalCredit + value;
                    }
                }
            }
            this.financialApplicationForm.controls['credit_limit'].setValue(this.TotalCredit);

            //this.credit_limit = totalCreditLimit;


        }
    }

    onSecurityDepositFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        const financialInfoData = this.financialApplicationForm.value;

        //for validation message -----------
        this.submittedFinancial = true;
        if ((financialInfoData.currency_id == "") || (financialInfoData.currency_id == null) || (financialInfoData.currency_id == undefined)) {
            return;
        }
        if ((financialInfoData.credit_days == "") || (financialInfoData.credit_days == null) || (financialInfoData.credit_days == undefined)) {
            return;
        }
        if ((financialInfoData.credit_limit == "") || (financialInfoData.credit_limit == null) || (financialInfoData.credit_limit == undefined)) {
            return;
        }
        if ((financialInfoData.payment_frequency_id == "") || (financialInfoData.payment_frequency_id == null) || (financialInfoData.payment_frequency_id == undefined)) {
            return;
        }
        else if (this.SecurityDepositDataSources.length == 0) {
            return this.notifyService.ShowNotification(2, "Please add at least security first")
        }
        //end validation messate -----------

        else {
            let supplierId = this.rowData.SupplierId;
            financialInfoData.securityDepositSession = this.SecurityDepositDataSources;
            financialInfoData.supplier_id = supplierId;
            this.SupplierApplicationService.updateSupplierCreditDepositApplication(financialInfoData).subscribe(data => {
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }

    }

    dataExistSecurityDeposit(security_deposit_name) {
        return this.SecurityDepositDataSources.some(function (el) {
            return el.security_deposit_name === security_deposit_name;
        });
    }

    removeSecurityDeposit(a, row) {
        this.SecurityDepositDataSources = this.SecurityDepositDataSources.slice(0, a).concat(this.SecurityDepositDataSources.slice(a + 1));

        this.TotalCredit = 0;
        for (let i = 0; i < this.SecurityDepositDataSources.length; i++) {
            for (const key of Object.keys(this.SecurityDepositDataSources[i])) {
                const value = this.SecurityDepositDataSources[i][key];
                if (key == "security_amount") {
                    this.TotalCredit = this.TotalCredit + value;
                }
            }
        }
        this.financialApplicationForm.controls['credit_limit'].setValue(this.TotalCredit);
    }



    ///// Mobile


    onMobileBankingFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let supplierId = this.rowData.SupplierId;

        //for validation message -----------
        this.submittedMobileBanking = true;
        const mobileBankingData = this.mobileBankingApplicationForm.value;
        if (this.mobileBankingApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;


        let mfs_id = this.mobileBankingApplicationForm.get('mfs_id')?.value.mfs_id;
        let mfs_name = this.mobileBankingApplicationForm.get('mfs_id')?.value.mfs_name;
        if (this.dataExistMFS(mfs_name)) {
            return this.notifyService.ShowNotification(2, "Selected MFS name already added")
        }

        else {
            mobileBankingData.supplier_id = supplierId;
            this.SupplierApplicationService.updateMobileBankingData(mobileBankingData).subscribe(data => {
                this.dataSaved = true;
                this.loadAllSupplierMFS();
                /*   this.resetForm();*/
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }

    }

    dataExistMFS(mfs_name) {
        return this.mobileBankingDataSources.some(function (el) {
            return el.mfs_name === mfs_name;
        });
    }

    deleteMFS(a, row) {
        let supplier_mobile_bank_id = row.supplier_mobile_bank_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteMFSAccount(supplier_mobile_bank_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierMFS(supplierId).subscribe(data => {
                    this.mobileBankingDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.mobileBankingDataSources = this.mobileBankingDataSources.slice(0, a).concat(this.mobileBankingDataSources.slice(a + 1));
        }
    }


    //// Banking

    onBankingFormSubmit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let supplierId = this.rowData.SupplierId;

        //for validation message -----------
        this.submittedBanking = true;
        const bankingData = this.bankingApplicationForm.value;
        if (this.bankingApplicationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;


        let bank_id = this.mobileBankingApplicationForm.get('bank_id')?.value.bank_id;
        let bank_name = this.mobileBankingApplicationForm.get('bank_id')?.value.bank_name;
        if (this.dataExistBankAccount(bank_name)) {
            return this.notifyService.ShowNotification(2, "Selected Bank name already added")
        }

        else {
            bankingData.supplier_id = supplierId;
            this.SupplierApplicationService.UpdateBankAccountData(bankingData).subscribe(data => {
                this.dataSaved = true;
                this.loadAllSupplierBankAccount();
                /*     this.resetForm();*/
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            });
        }
    }

    dataExistBankAccount(bank_name) {
        return this.bankingDataSources.some(function (el) {
            return el.bank_name === bank_name;
        });
    }

    deleteBankAccount(a, row) {
        let supplier_bank_account_id = row.supplier_bank_account_id;
        if (this.loadSupplierinfoToEdit) {
            let supplierId = this.rowData.SupplierId;
            this.SupplierApplicationService.deleteBankAccount(supplier_bank_account_id).subscribe(data => {
                this.SupplierApplicationService.getAllSupplierBankAccount(supplierId).subscribe(data => {
                    this.bankingDataSources = data;
                });
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.bankingDataSources = this.bankingDataSources.slice(0, a).concat(this.bankingDataSources.slice(a + 1));
        }
    }


    // File Upload

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
                this.supplierImage.nativeElement.innerText = file.name;
                this.supplierApplicationForm.patchValue({
                    ImageUpload: file,
                });
            }
        }
    }

    handleLegalFormFileInput(files: FileList) {
        this.fileToUploadLegalForm = files.item(0);
    }

    handleNIDFileInput(files: FileList) {
        this.fileToUploadNID = files.item(0);
    }

    handleSecurityFileInput(files: FileList) {
        this.fileToUploadSecurity = files.item(0);
    }

    // Tab index Manintain

    dealerIndex() {
        this.index = 0;
    }

    function(e) {
        this.index = e.index;
    }

    openNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 6 : this.index - 1;
    }


    resetForm() {
        this.supplierApplicationForm.reset();
        this.businessApplicationForm.reset();
        this.associationsApplicationForm.reset();
        this.legalDocumentApplicationForm.reset();
        this.locationApplicationForm.reset();

        this.warehouseApplicationForm.reset();
        this.contactApplicationForm.reset();
        this.ContactLocationApplicationForm.reset();
        this.financialApplicationForm.reset();
        this.mobileBankingApplicationForm.reset();
        this.bankingApplicationForm.reset();


        this.subSectorDataSources = null;
        this.associationDataSources = null;
        this.documentDataSources = null;
        this.locationDataSources = null;
        this.warehouseDataSources = null;
        this.contactDataSources = null;
        this.contactLocationDataSources = null;
        this.SecurityDepositDataSources = null;
        this.mobileBankingDataSources = null;
        this.bankingDataSources = null;
        this.categories = null;

        this.loadAllEcommerceList();

        this.isSupplierinfoEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }


}




