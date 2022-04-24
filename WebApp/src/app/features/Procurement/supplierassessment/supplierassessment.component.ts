import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { SupplierAssessmentService } from './supplierassessment.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Criteria } from './criteria';



@Component({
    selector: 'app-supplierassessment',
    templateUrl: './supplierassessment.component.html',
    styleUrls: ['./supplierassessment.component.css']
})


export class SupplierAssessmentComponent implements OnInit {

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
    AssesmentApplicationForm: FormGroup;
    assessmentScoreForm: FormGroup;



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

    categories: any[];

    criterias: Criteria[];

    clonedProducts: { [s: string]: Criteria; } = {};


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


    selectedSubSectorTable: any;
    selectedLocationTable: any;
    selectedContactTable: any;
    selectedContactLocationTable: any;
    selectedSecurityDepositTable: any;
    selectedMobileBankingTable: any;
    selectedBankingTable: any;


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
    allSupplierApplication: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
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



    /*  products2: Product[];*/
    selectedItemsList = [];
    assessmentScore = [];


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



    constructor(private formbulider: FormBuilder, private SupplierAssessmentService: SupplierAssessmentService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer, private messageService: MessageService, private route: ActivatedRoute) {

    }


    ngOnInit(): void {
        //Basic
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

        this.loadAllConfirmSupplierinfos();
        this.supplierApplicationForm.controls['supplier_code'].disable();
        this.supplierApplicationForm.controls['legal_name'].disable();
        this.supplierApplicationForm.controls['short_name'].disable();
        this.supplierApplicationForm.controls['year_established'].disable();
        this.supplierApplicationForm.controls['domicile_enum_id'].disable();
        this.supplierApplicationForm.controls['registry_authority_id'].disable();
        this.supplierApplicationForm.controls['regulator_id'].disable();
        this.supplierApplicationForm.controls['ownership_type_id'].disable();
        this.supplierApplicationForm.controls['name_in_local_language'].disable();
        this.supplierApplicationForm.controls['address_in_local_language'].disable();
        this.supplierApplicationForm.controls['country_id'].disable();
        this.supplierApplicationForm.controls['division_id'].disable();
        this.supplierApplicationForm.controls['district_id'].disable();
        this.supplierApplicationForm.controls['city'].disable();
        this.supplierApplicationForm.controls['ps_area'].disable();
        this.supplierApplicationForm.controls['post_code'].disable();
        this.supplierApplicationForm.controls['block'].disable();
        this.supplierApplicationForm.controls['road_no'].disable();
        this.supplierApplicationForm.controls['house_no'].disable();
        this.supplierApplicationForm.controls['flat_no'].disable();
        this.supplierApplicationForm.controls['email'].disable();
        this.supplierApplicationForm.controls['mobile_no'].disable();
        this.supplierApplicationForm.controls['phone_no'].disable();
        this.supplierApplicationForm.controls['pabx'].disable();

        this.loadAllDomicileEnum();
        this.loadAllRegistryAuthorityCboList();
        this.loadAllRegulatorCboList();
        this.loadAllOwnershipTypeCboList();
        this.loadAllCountryCboList();



        //Business
        this.businessApplicationForm = this.formbulider.group({
            business_activities_enum_id: ['', [Validators.required]],
            industry_sector_id: ['', [Validators.required]],
            industry_sub_sector_id: ['', [Validators.required]],
            management_staff_no: [''],
            nonmanagement_staff_no: [''],
            permanent_worker_no: [''],
            casual_worker_no: [''],
            ecommerce_platforms_id: [''],
        });
        this.loadAllBusinessActivitiesEnum();
        this.loadAllSectorCboList();
        this.loadAllEcommerceList();

        this.businessApplicationForm.controls['business_activities_enum_id'].disable();
        this.businessApplicationForm.controls['management_staff_no'].disable();
        this.businessApplicationForm.controls['nonmanagement_staff_no'].disable();
        this.businessApplicationForm.controls['permanent_worker_no'].disable();
        this.businessApplicationForm.controls['casual_worker_no'].disable();
        this.businessApplicationForm.controls['ecommerce_platforms_id'].disable();



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
        this.loadAllAssociationCboList();
        this.loadAllOrganizationTypeEnum();
        this.loadAllMembershipEnum();



        //LegalDocument
        this.legalDocumentApplicationForm = this.formbulider.group({
            document_type_id: ['', [Validators.required]],
            document_number: ['', [Validators.required]],
            issue_date: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            file_path: [null],
            FileUpload: new FormControl('', [Validators.required]),
        });
        this.loadAllDocumentCboList();


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
        this.loadAllLocationTypeCboList();

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
        this.loadAllContactTypeCboList();
        this.LoadAllDesignationCboList();
        this.loadGenderdrpdwn();
        this.loadReligiondrpdwn();
        this.loadBloodGroupdrpdwn();
        this.loadNationalitydrpdwn();
        this.loadMaritalStatusdrpdwn();


        this.ContactLocationApplicationForm = this.formbulider.group({
            supplier_location_id: ['', [Validators.required]],
            supplier_contact_id: ['', [Validators.required]],
            add_note: [''],
        });


        ////Financial Info

        this.financialApplicationForm = this.formbulider.group({
            currency_id: ['', [Validators.required]],
            credit_days: ['', [Validators.required]],
            credit_limit: ['', [Validators.required]],
            payment_frequency_id: ['', [Validators.required]],
            security_deposit_id: ['', [Validators.required]],
            security_amount: ['', [Validators.required]],
            expiry_date: ['', [Validators.required]],
            //security_document_path: [null],
            //FileUpload: new FormControl('', [Validators.required]),
        });
        this.LoadAllCurrencyCboList();
        this.LoadAllSecurityTypeCboList();
        this.LoadAllPaymentFrequencyCboList();
        this.financialApplicationForm.controls['currency_id'].disable();
        this.financialApplicationForm.controls['credit_days'].disable();
        this.financialApplicationForm.controls['credit_limit'].disable();
        this.financialApplicationForm.controls['payment_frequency_id'].disable();

        this.mobileBankingApplicationForm = this.formbulider.group({
            mfs_id: ['', [Validators.required]],
            account_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
            mfs_type_id: ['', [Validators.required]],
        });
        this.LoadAllMfsCboList();
        this.LoadAllMfsTypeCboList();

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
        this.LoadAllBankTypeCboList();
        this.bankingApplicationForm.controls['bank_branch_routing'].disable();
        this.bankingApplicationForm.controls['bank_swift_code'].disable();

        //this.AssesmentApplicationForm = this.formbulider.group({
        //    comment: ['', [Validators.required]],
        //    suggestion: ['', [Validators.required]],
        //    category_id: [''],
        //    category_name: [''],
        //});
        //this.LoadAllBankTypeCboList();
        //this.AssesmentApplicationForm.controls['comment'].disable();
        //this.AssesmentApplicationForm.controls['suggestion'].disable();

        //this.assessmentScoreForm = this.formbulider.group({

        //    assessment_criteria_id: ['', [Validators.required]],
        //    assessment_criteria_name: ['', [Validators.required]],
        //    manual_weight: ['', [Validators.required]],
        //    actual_weight: ['', [Validators.required]],
        //    comments: ['', [Validators.required]],
        //});




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

    viewDocumentinfo(a, row) {
        let supplierId = row.SupplierId;
        /*     this.supplierId = row.SupplierId;*/
        this.SupplierAssessmentService.getSupplierBasicInfo(supplierId).subscribe(data => {
            debugger
            this.supplierApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
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

            this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
            this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
            this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
            this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
            this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
        });

        //this.SupplierAssessmentService.getAllSupplierBusiness(supplierId).subscribe(data => {
        //    this.businessApplicationForm.reset();
        //    if (data != null) {
        //        this.isSupplierinfoEdit = true;
        //        this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
        //        this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
        //        this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
        //        this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
        //        this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
        //    }
        //});

        this.SupplierAssessmentService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
            this.subSectorDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
            this.categories = data;
        });

        this.SupplierAssessmentService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationsApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.associationDataSources = data;
        });

        this.SupplierAssessmentService.getAllLegalDocument(supplierId).subscribe(data => {
            this.legalDocumentApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.documentDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;

        });

        this.SupplierAssessmentService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierContact(supplierId).subscribe(data => {
            this.ContactLocationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.contactDataSources = data;
            this.allContactPerson = data;
        });

        this.SupplierAssessmentService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            debugger
            this.contactLocationDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.mobileBankingDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
            this.SecurityDepositDataSources = data;
        });

        this.SupplierAssessmentService.getAllSupplierCreditHistory(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.financialApplicationForm.controls['currency_id'].setValue(data.currency_id);
                this.financialApplicationForm.controls['credit_days'].setValue(data.credit_days);
                this.financialApplicationForm.controls['credit_limit'].setValue(data.credit_limit);
                this.financialApplicationForm.controls['payment_frequency_id'].setValue(data.payment_frequency_id);
            }
        });

        this.SupplierAssessmentService.getAllSupplierMasterAssessmentCriteria(supplierId).subscribe(data => {
            debugger
            this.criterias = data;
      /*      this.cri*/


            this.clonedProducts[data.assessment_criteria_id] = { ...data };

        });
        this.toggleGridDisplay();
    }

    loadAllConfirmSupplierinfos() {
        this.SupplierAssessmentService.getAllConfirmSupplierInfo().subscribe(data => {
            debugger
            this.supplierinfoList = data;
        });
    }




    loadAllDomicileEnum() {
        this.SupplierAssessmentService.getAllDomicileEnum().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllRegistryAuthorityCboList() {
        this.SupplierAssessmentService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegistryAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.SupplierAssessmentService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllOwnershipTypeCboList() {
        this.SupplierAssessmentService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllCountryCboList() {
        this.SupplierAssessmentService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
            this.allCountryAssociation = data;
            this.allCountryLocation = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.SupplierAssessmentService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByCountryIdLocation(countryId: Number) {
        if (countryId != null) {
            this.SupplierAssessmentService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivisionLocation = data;
            });
        }
        else
            this.allDivisionLocation = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierAssessmentService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }


    onSelectByDivisionIdLocation(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierAssessmentService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrictLocation = data;
            });
        }
        else
            this.allDistrictLocation = null;

    }

    //Business dd load

    loadAllBusinessActivitiesEnum() {
        this.SupplierAssessmentService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.SupplierAssessmentService.getAllIndustrySectorCboList().subscribe(data => {
            this.allSector = data;
        });
    }

    onSelectBySectorId() {
        let IndustrysectorObj = this.businessApplicationForm.get('industry_sector_id')?.value;
        let IndustrySectorId = IndustrysectorObj.industry_sector_id;
        if (IndustrySectorId != null) {
            this.SupplierAssessmentService.getAllIndustrySubSectorCboList(IndustrySectorId).subscribe(data => {
                this.allSubSector = data;
            });
        }
        else
            this.allSubSector = null;
    }

    loadAllEcommerceList() {
        this.SupplierAssessmentService.getAllEcommerceList().subscribe(data => {
            this.categories = data;
        });
    }

    //Association dd load

    loadAllAssociationCboList() {
        this.SupplierAssessmentService.getAllAssociationCboList().subscribe(data => {
            this.allAssociation = data;
        });
    }


    onSelectByAssociationId() {
        let associationObj = this.associationsApplicationForm.get('association_id')?.value;
        let associationId = associationObj.association_id;
        //if (associationId != null) {
        this.SupplierAssessmentService.getAllDataByAssociationId(associationId).subscribe(data => {
            this.associationsApplicationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
            this.associationsApplicationForm.controls['abbreviation'].setValue(data.abbreviation);
            let countryAssociationId = data.country_id;
            if (countryAssociationId != null) {
                this.SupplierAssessmentService.GetByCountryId(countryAssociationId).subscribe(data => {
                    this.associationsApplicationForm.controls['country_id_association'].setValue(data.country_id);
                });
            }
        });
    }


    loadAllOrganizationTypeEnum() {
        this.SupplierAssessmentService.getAllOrganizationTypeEnum().subscribe(data => {
            this.allOrganizationType = data;
        });
    }

    loadAllMembershipEnum() {
        this.SupplierAssessmentService.getAllMembershipEnum().subscribe(data => {
            this.allMembershipType = data;
        });
    }

    loadAllSupplierAssociation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationDataSources = data;
        });
    }


    ////Legal dd load
    loadAllDocumentCboList() {
        this.SupplierAssessmentService.getAllDocumentCboList().subscribe(data => {
            this.allDocument = data;
        });
    }

    LoadAllLegalDocument() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllLegalDocument(supplierId).subscribe(data => {
            this.documentDataSources = data;
        });
    }

    //Location dd load
    loadAllLocationTypeCboList() {
        this.SupplierAssessmentService.getAllLocationTypeCboList().subscribe(data => {
            this.allLocationType = data;
        });
    }

    loadAllSupplierLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;
        });
    }



    ////Warehouse dd load
    loadAllSupplierWarehouse() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });
    }

    ////Contact dd load
    loadAllContactTypeCboList() {
        this.SupplierAssessmentService.getAllContactTypeCboList().subscribe(data => {
            this.allContactType = data;
        });
    }

    LoadAllDesignationCboList() {
        this.SupplierAssessmentService.getAllDesignationCboList().subscribe(data => {
            this.allDesignation = data;
        });
    }

    loadGenderdrpdwn() {
        this.SupplierAssessmentService.getGenderCboList().subscribe(data => {
            this.allGenderList = data;
        });
    }

    loadReligiondrpdwn() {
        this.SupplierAssessmentService.getReligionCboList().subscribe(data => {
            this.allReligionList = data;
        });
    }

    loadBloodGroupdrpdwn() {
        this.SupplierAssessmentService.getBloodGroupCboList().subscribe(data => {
            this.allBloodGroupList = data;
        });
    }

    loadNationalitydrpdwn() {
        this.SupplierAssessmentService.getAllCountryCboList().subscribe(data => {
            this.allNationality = data;
        });
    }

    loadMaritalStatusdrpdwn() {
        this.SupplierAssessmentService.getMaritalStatusCboList().subscribe(data => {
            this.allMaritalStatusList = data;
        });
    }

    loadAllSupplierContact() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierContact(supplierId).subscribe(data => {
            this.contactDataSources = data;
            this.allContactPerson = data;
        });
    }

    loadAllSupplierContactLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            this.contactLocationDataSources = data;
        });
    }

    //// Financial dd load


    LoadAllCurrencyCboList() {
        this.SupplierAssessmentService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    LoadAllSecurityTypeCboList() {
        this.SupplierAssessmentService.getAllSecurityTypeCboList().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    LoadAllPaymentFrequencyCboList() {
        this.SupplierAssessmentService.getAllPaymentFrequencyCboList().subscribe(data => {
            this.allPaymentFrequency = data;
        });
    }


    LoadAllMfsCboList() {
        this.SupplierAssessmentService.getAllMfsCboList().subscribe(data => {
            this.allMFS = data;
        });
    }

    LoadAllMfsTypeCboList() {
        this.SupplierAssessmentService.getAllMfsTypeCboList().subscribe(data => {
            this.allMFSType = data;
        });
    }

    LoadAllBankTypeCboList() {
        this.SupplierAssessmentService.getAllBankTypeCboList().subscribe(data => {
            this.allBankType = data;
        });
    }



    loadAllSupplierMFS() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.mobileBankingDataSources = data;
        });
    }

    loadAllSupplierBankAccount() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierAssessmentService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });
    }


    onSelectByBankTypeId(bankTypeId: Number) {
        //let bankTypeObj = this.bankingApplicationForm.get('bank_type_id')?.value;
        //let bankTypeId = bankTypeObj.bank_type_id;
        if (bankTypeId != null) {
            this.SupplierAssessmentService.getAllBankCboListByBankTypeId(bankTypeId).subscribe(data => {
                this.allBank = data;
            });
        }
        else
            this.allBank = null;
    }


    onSelectByBankId(bankId: Number) {

        this.SupplierAssessmentService.getAllBankBranchCboListByBankId(bankId).subscribe(data => {
            this.allBankBranch = data;
        });

        this.SupplierAssessmentService.GetBankById(bankId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.BankSwiftCode);
        });

    }

    onSelectByBankBranchId(bankBranchId: Number) {
        this.SupplierAssessmentService.GetAllBankBranchByBankBranchId(bankBranchId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_branch_routing'].setValue(data.BankBranchRouting);
        });

    }


    //loadSupplierinfoToEdit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    let supplierId = this.rowData.SupplierId;

    //    this.SupplierAssessmentService.getSupplierBasicInfo(supplierId).subscribe(data => {
    //        this.supplierApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.supplierApplicationForm.controls['supplier_code'].setValue(data.SupplierCode);
    //        this.supplierApplicationForm.controls['legal_name'].setValue(data.LegalName);
    //        this.supplierApplicationForm.controls['short_name'].setValue(data.ShortName);
    //        this.supplierApplicationForm.controls['year_established'].setValue(new Date(data.YearEstablished));
    //        this.supplierApplicationForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
    //        this.supplierApplicationForm.controls['registry_authority_id'].setValue(data.RegistryAuthorityId);
    //        this.supplierApplicationForm.controls['regulator_id'].setValue(data.RegulatorId);
    //        this.supplierApplicationForm.controls['ownership_type_id'].setValue(data.OwnershipTypeId);
    //        this.supplierApplicationForm.controls['name_in_local_language'].setValue(data.NameInLocalLanguage);
    //        this.supplierApplicationForm.controls['address_in_local_language'].setValue(data.AddressInLocalLanguage);
    //        this.supplierApplicationForm.controls['country_id'].setValue(data.CountryId);
    //        this.onSelectByCountryId(data.CountryId);
    //        this.supplierApplicationForm.controls['division_id'].setValue(data.DivisionId);
    //        this.onSelectByDivisionId(data.DivisionId);
    //        this.supplierApplicationForm.controls['district_id'].setValue(data.DistrictId);
    //        this.supplierApplicationForm.controls['city'].setValue(data.City);
    //        this.supplierApplicationForm.controls['ps_area'].setValue(data.PsArea);
    //        this.supplierApplicationForm.controls['post_code'].setValue(data.PostCode);
    //        this.supplierApplicationForm.controls['block'].setValue(data.Block);
    //        this.supplierApplicationForm.controls['road_no'].setValue(data.RoadNo);
    //        this.supplierApplicationForm.controls['house_no'].setValue(data.HouseNo);
    //        this.supplierApplicationForm.controls['flat_no'].setValue(data.FlatNo);
    //        this.supplierApplicationForm.controls['email'].setValue(data.Email);
    //        this.supplierApplicationForm.controls['mobile_no'].setValue(data.MobileNo);
    //        this.supplierApplicationForm.controls['phone_no'].setValue(data.PhoneNo);
    //        this.supplierApplicationForm.controls['pabx'].setValue(data.Pabx);
    //    });

    //    this.SupplierAssessmentService.getAllSupplierBusiness(supplierId).subscribe(data => {
    //        this.businessApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //            this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
    //            this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
    //            this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
    //            this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
    //            this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
    //        }
    //    });

    //    this.SupplierAssessmentService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
    //        this.subSectorDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
    //        this.categories = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierAssociation(supplierId).subscribe(data => {
    //        this.associationsApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.associationDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllLegalDocument(supplierId).subscribe(data => {
    //        this.legalDocumentApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.documentDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierLocation(supplierId).subscribe(data => {
    //        this.locationApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.locationDataSources = data;
    //        this.allLocation = data;
    //        this.allContactLocation = data;

    //    });

    //    this.SupplierAssessmentService.getAllSupplierWarehouse(supplierId).subscribe(data => {
    //        this.warehouseDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierContact(supplierId).subscribe(data => {
    //        this.ContactLocationApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.contactDataSources = data;
    //        this.allContactPerson = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
    //        debugger
    //        this.contactLocationDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierMFS(supplierId).subscribe(data => {
    //        this.financialApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //        }
    //        this.mobileBankingDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierBankAccount(supplierId).subscribe(data => {
    //        this.bankingDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
    //        this.SecurityDepositDataSources = data;
    //    });

    //    this.SupplierAssessmentService.getAllSupplierCreditHistory(supplierId).subscribe(data => {
    //        this.financialApplicationForm.reset();
    //        if (data != null) {
    //            this.isSupplierinfoEdit = true;
    //            this.financialApplicationForm.controls['currency_id'].setValue(data.currency_id);
    //            this.financialApplicationForm.controls['credit_days'].setValue(data.credit_days);
    //            this.financialApplicationForm.controls['credit_limit'].setValue(data.credit_limit);
    //            this.financialApplicationForm.controls['payment_frequency_id'].setValue(data.payment_frequency_id);
    //        }
    //    });

    //    this.toggleGridDisplay();
    //}

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



    openBasicNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }


    //Business Submit

    openBusinessNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
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
        this.isSupplierinfoEdit = false;
        this.supplierinfoList = [];
    }

    clear() {
        this.resetForm();
    }

    onFormApprove() {
        let supplierId = this.rowData.supplierId;
        if (supplierId == null) {
            return this.notifyService.ShowNotification(3, 'Please click view on specific supplier');
        }
        const approveFeedbackData = this.AssesmentApplicationForm.value;
        approveFeedbackData.supplier_id = supplierId;
        this.SupplierAssessmentService.approveSupplier(approveFeedbackData).subscribe(data => {
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            this.loadAllConfirmSupplierinfos();
        });
    }

    onFormReject() {
        let supplierId = this.rowData.supplierId;
        if (supplierId == null) {
            return this.notifyService.ShowNotification(3, 'Please click view on specific supplier');
        }
        const rejectFeedbackData = this.AssesmentApplicationForm.value;
        rejectFeedbackData.supplier_id = supplierId;
        this.SupplierAssessmentService.rejectSupplier(rejectFeedbackData).subscribe(data => {
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            this.loadAllConfirmSupplierinfos();
        });
    }

    onRowEditInit(criteria: Criteria) {
        this.clonedProducts[criteria.assessment_criteria_id] = { ...criteria };
    }


    onRowEditSave(criteria: Criteria) {
        debugger

        if (criteria.assessment_criteria_id > 0) {

            //if (this.rowData == null) {
            //    return this.notifyService.ShowNotification(3, 'Please select supplier first');
            //}

            ////for validation message -----------
            //this.submittedAssociation = true;
            //const associationData = this.associationsApplicationForm.value;
            //if (this.associationsApplicationForm.invalid) {
            //    return;
            //}
            ////end validation messate -----------

            //this.dataSaved = false;
       /*     let supplierId = this.rowData.SupplierId;*/
            let assessment_criteria_id = criteria.assessment_criteria_id;
            let criteria_type = 1;
            let manual_weight = criteria.manual_weight;
            let actual_weight = criteria.actual_weight;
            let comments = criteria.comments;
            let supplierId = this.supplierApplicationForm.get('supplier_code')?.value;

            //let association_id = this.associationsApplicationForm.get('association_id')?.value.association_id;

            const scoreobj = { supplier_id: supplierId, assessment_criteria_id: assessment_criteria_id, criteria_type: criteria_type, manual_weight: manual_weight, actual_weight: actual_weight, comments: comments }
       /*     this.assessmentScore.push(scoreobj);*/

            this.SupplierAssessmentService.createSupplierAssessment(scoreobj).subscribe(data => {
                this.dataSaved = true;
               // this.loadAllSupplierAssociation();

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


















