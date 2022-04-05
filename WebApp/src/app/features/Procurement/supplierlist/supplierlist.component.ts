import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { SupplierListService } from './supplierlist.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Category } from './category';


//import { ReactiveFormsModule } from "@angular/forms";
//import { DialogService, MessageService } from "primeng/api";
//import { CalendarModule } from "primeng/calendar";
//import { TableModule } from "primeng/table";
//import { ToastModule } from "primeng/toast";



@Component({
    selector: 'app-supplierlist',
    templateUrl: './supplierlist.component.html',
    styleUrls: ['./supplierlist.component.css']
})


export class SupplierListComponent implements OnInit {

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

    categories: Category[];

    statuses: SelectItem[];

    clonedProducts: { [s: string]: Category; } = {};


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
        this.ngOnInit();
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



    constructor(private formbulider: FormBuilder, private SupplierListService: SupplierListService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer, private messageService: MessageService) {

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
        this.businessApplicationForm.controls['industry_sector_id'].disable();
        this.businessApplicationForm.controls['industry_sub_sector_id'].disable();
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
        this.associationsApplicationForm.controls['association_id'].disable();
        this.associationsApplicationForm.controls['abbreviation'].disable();
        this.associationsApplicationForm.controls['country_id_association'].disable();
        this.associationsApplicationForm.controls['organization_type_id_enum'].disable();
        this.associationsApplicationForm.controls['membership_type_enum_id'].disable();
        this.associationsApplicationForm.controls['association_number'].disable();
        this.associationsApplicationForm.controls['start_date'].disable();


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

        this.legalDocumentApplicationForm.controls['document_type_id'].disable();
        this.legalDocumentApplicationForm.controls['document_number'].disable();
        this.legalDocumentApplicationForm.controls['issue_date'].disable();
        this.legalDocumentApplicationForm.controls['expiry_date'].disable();




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

        this.AssesmentApplicationForm = this.formbulider.group({
            comment: ['', [Validators.required]],
            suggestion: ['', [Validators.required]],
            category_id: [''],
            category_name: [''],

            
        });
        this.LoadAllBankTypeCboList();
        this.AssesmentApplicationForm.controls['comment'].disable();
        this.AssesmentApplicationForm.controls['suggestion'].disable();


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
        this.SupplierListService.getSupplierBasicInfo(supplierId).subscribe(data => {
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
        });

        this.SupplierListService.getAllSupplierBusiness(supplierId).subscribe(data => {
            debugger
            this.businessApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
                this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
                this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
                this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
                this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
            }
        });

        this.SupplierListService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
            this.subSectorDataSources = data;
        });

        this.SupplierListService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
        });

        this.SupplierListService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationsApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.associationDataSources = data;
        });

        this.SupplierListService.getAllLegalDocument(supplierId).subscribe(data => {
            this.legalDocumentApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.documentDataSources = data;
        });

        this.SupplierListService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;

        });

        this.SupplierListService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });

        this.SupplierListService.getAllSupplierContact(supplierId).subscribe(data => {
            this.ContactLocationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.contactDataSources = data;
            this.allContactPerson = data;
        });

        this.SupplierListService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.mobileBankingDataSources = data;
        });

        this.SupplierListService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });

        this.SupplierListService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
            this.SecurityDepositDataSources = data;
        });

        this.SupplierListService.getAllSupplierCreditHistory(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.financialApplicationForm.controls['currency_id'].setValue(data.currency_id);
                this.financialApplicationForm.controls['credit_days'].setValue(data.credit_days);
                this.financialApplicationForm.controls['credit_limit'].setValue(data.credit_limit);
                this.financialApplicationForm.controls['payment_frequency_id'].setValue(data.payment_frequency_id);
            }
        });

        //this.AssesmentApplicationForm.controls['comment'].enable();
        //this.AssesmentApplicationForm.controls['suggestion'].enable();
        this.toggleGridDisplay();
    }

    loadAllConfirmSupplierinfos() {
        this.SupplierListService.getAllConfirmSupplierInfo().subscribe(data => {
            debugger
            this.supplierinfoList = data;
        });
    }



    // All Supplier List 
    //loadAllSupplierinfos() {
    //    this.SupplierListService.getAllSupplierInfo().subscribe(data => {
    //        this.supplierinfoList = data;
    //    });
    //}

    loadAllDomicileEnum() {
        this.SupplierListService.getAllDomicileEnum().subscribe(data => {
            this.allDomicile = data;
        });
    }

    loadAllRegistryAuthorityCboList() {
        this.SupplierListService.getAllRegistryAuthorityCboList().subscribe(data => {
            this.allRegistryAuthority = data;
        });
    }

    loadAllRegulatorCboList() {
        this.SupplierListService.getAllRegulatorCboList().subscribe(data => {
            this.allRegulator = data;
        });
    }

    loadAllOwnershipTypeCboList() {
        this.SupplierListService.getAllOwnershipTypeCboList().subscribe(data => {
            this.allOwnershipType = data;
        });
    }

    loadAllCountryCboList() {
        this.SupplierListService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
            this.allCountryAssociation = data;
            this.allCountryLocation = data;
        });
    }

    onSelectByCountryId(countryId: Number) {
        if (countryId != null) {
            this.SupplierListService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivision = data;
            });
        }
        else
            this.allDivision = null;
    }

    onSelectByCountryIdLocation(countryId: Number) {
        if (countryId != null) {
            this.SupplierListService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
                this.allDivisionLocation = data;
            });
        }
        else
            this.allDivisionLocation = null;
    }

    onSelectByDivisionId(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierListService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrict = data;
            });
        }
        else
            this.allDistrict = null;
    }


    onSelectByDivisionIdLocation(divisionId: Number) {
        if (divisionId != null) {
            this.SupplierListService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
                this.allDistrictLocation = data;
            });
        }
        else
            this.allDistrictLocation = null;

    }

    //Business dd load

    loadAllBusinessActivitiesEnum() {
        this.SupplierListService.getAllBusinessActivitiesEnum().subscribe(data => {
            this.allBusinessActivities = data;
        });
    }

    loadAllSectorCboList() {
        this.SupplierListService.getAllIndustrySectorCboList().subscribe(data => {
            this.allSector = data;
        });
    }

    onSelectBySectorId() {
        let IndustrysectorObj = this.businessApplicationForm.get('industry_sector_id')?.value;
        let IndustrySectorId = IndustrysectorObj.industry_sector_id;
        if (IndustrySectorId != null) {
            this.SupplierListService.getAllIndustrySubSectorCboList(IndustrySectorId).subscribe(data => {
                this.allSubSector = data;
            });
        }
        else
            this.allSubSector = null;
    }

    loadAllEcommerceList() {
        this.SupplierListService.getAllEcommerceList().subscribe(data => {
            this.categories = data;
        });
    }

    //Association dd load

    loadAllAssociationCboList() {
        this.SupplierListService.getAllAssociationCboList().subscribe(data => {
            this.allAssociation = data;
        });
    }


    onSelectByAssociationId() {
        let associationObj = this.associationsApplicationForm.get('association_id')?.value;
        let associationId = associationObj.association_id;
        //if (associationId != null) {
        this.SupplierListService.getAllDataByAssociationId(associationId).subscribe(data => {
            this.associationsApplicationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
            this.associationsApplicationForm.controls['abbreviation'].setValue(data.abbreviation);
            let countryAssociationId = data.country_id;
            if (countryAssociationId != null) {
                this.SupplierListService.GetByCountryId(countryAssociationId).subscribe(data => {
                    this.associationsApplicationForm.controls['country_id_association'].setValue(data.country_id);
                });
            }
        });
    }


    loadAllOrganizationTypeEnum() {
        this.SupplierListService.getAllOrganizationTypeEnum().subscribe(data => {
            this.allOrganizationType = data;
        });
    }

    loadAllMembershipEnum() {
        this.SupplierListService.getAllMembershipEnum().subscribe(data => {
            this.allMembershipType = data;
        });
    }

    loadAllSupplierAssociation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationDataSources = data;
        });
    }


    ////Legal dd load
    loadAllDocumentCboList() {
        this.SupplierListService.getAllDocumentCboList().subscribe(data => {
            this.allDocument = data;
        });
    }

    LoadAllLegalDocument() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllLegalDocument(supplierId).subscribe(data => {
            this.documentDataSources = data;
        });
    }

    //Location dd load
    loadAllLocationTypeCboList() {
        this.SupplierListService.getAllLocationTypeCboList().subscribe(data => {
            this.allLocationType = data;
        });
    }

    loadAllSupplierLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;
        });
    }



    ////Warehouse dd load
    loadAllSupplierWarehouse() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });
    }

    ////Contact dd load
    loadAllContactTypeCboList() {
        this.SupplierListService.getAllContactTypeCboList().subscribe(data => {
            this.allContactType = data;
        });
    }

    LoadAllDesignationCboList() {
        this.SupplierListService.getAllDesignationCboList().subscribe(data => {
            this.allDesignation = data;
        });
    }

    loadGenderdrpdwn() {
        this.SupplierListService.getGenderCboList().subscribe(data => {
            this.allGenderList = data;
        });
    }

    loadReligiondrpdwn() {
        this.SupplierListService.getReligionCboList().subscribe(data => {
            this.allReligionList = data;
        });
    }

    loadBloodGroupdrpdwn() {
        this.SupplierListService.getBloodGroupCboList().subscribe(data => {
            this.allBloodGroupList = data;
        });
    }

    loadNationalitydrpdwn() {
        this.SupplierListService.getAllCountryCboList().subscribe(data => {
            this.allNationality = data;
        });
    }

    loadMaritalStatusdrpdwn() {
        this.SupplierListService.getMaritalStatusCboList().subscribe(data => {
            this.allMaritalStatusList = data;
        });
    }

    loadAllSupplierContact() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierContact(supplierId).subscribe(data => {
            this.contactDataSources = data;
            this.allContactPerson = data;
        });
    }

    loadAllSupplierContactLocation() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            this.contactLocationDataSources = data;
        });
    }

    //// Financial dd load


    LoadAllCurrencyCboList() {
        this.SupplierListService.getAllCurrencyCboList().subscribe(data => {
            this.allCurrency = data;
        });
    }

    LoadAllSecurityTypeCboList() {
        this.SupplierListService.getAllSecurityTypeCboList().subscribe(data => {
            this.allSecurityType = data;
        });
    }

    LoadAllPaymentFrequencyCboList() {
        this.SupplierListService.getAllPaymentFrequencyCboList().subscribe(data => {
            this.allPaymentFrequency = data;
        });
    }


    LoadAllMfsCboList() {
        this.SupplierListService.getAllMfsCboList().subscribe(data => {
            this.allMFS = data;
        });
    }

    LoadAllMfsTypeCboList() {
        this.SupplierListService.getAllMfsTypeCboList().subscribe(data => {
            this.allMFSType = data;
        });
    }

    LoadAllBankTypeCboList() {
        this.SupplierListService.getAllBankTypeCboList().subscribe(data => {
            this.allBankType = data;
        });
    }



    loadAllSupplierMFS() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.mobileBankingDataSources = data;
        });
    }

    loadAllSupplierBankAccount() {
        let supplierId = this.rowData.SupplierId;
        this.SupplierListService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });
    }


    onSelectByBankTypeId(bankTypeId: Number) {
        //let bankTypeObj = this.bankingApplicationForm.get('bank_type_id')?.value;
        //let bankTypeId = bankTypeObj.bank_type_id;
        if (bankTypeId != null) {
            this.SupplierListService.getAllBankCboListByBankTypeId(bankTypeId).subscribe(data => {
                this.allBank = data;
            });
        }
        else
            this.allBank = null;
    }


    onSelectByBankId(bankId: Number) {

        this.SupplierListService.getAllBankBranchCboListByBankId(bankId).subscribe(data => {
            this.allBankBranch = data;
        });

        this.SupplierListService.GetBankById(bankId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.BankSwiftCode);
        });

    }

    onSelectByBankBranchId(bankBranchId: Number) {
        this.SupplierListService.GetAllBankBranchByBankBranchId(bankBranchId).subscribe(data => {
            this.bankingApplicationForm.controls['bank_branch_routing'].setValue(data.BankBranchRouting);
        });

    }

    //resetForm() {
    //    this.supplierApplicationForm.reset();
    //    this.isSupplierinfoEdit = false;
    //    this.loadAllSupplierinfos();
    //    //  this.dealerinfodataSource = [];
    //}


    loadSupplierinfoToEdit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let supplierId = this.rowData.SupplierId;

        this.SupplierListService.getSupplierBasicInfo(supplierId).subscribe(data => {
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
        });

        this.SupplierListService.getAllSupplierBusiness(supplierId).subscribe(data => {
            this.businessApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
                this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
                this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
                this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
                this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
                this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);
            }
        });

        this.SupplierListService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
            this.subSectorDataSources = data;
        });

        this.SupplierListService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
        });

        this.SupplierListService.getAllSupplierAssociation(supplierId).subscribe(data => {
            this.associationsApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.associationDataSources = data;
        });

        this.SupplierListService.getAllLegalDocument(supplierId).subscribe(data => {
            this.legalDocumentApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.documentDataSources = data;
        });

        this.SupplierListService.getAllSupplierLocation(supplierId).subscribe(data => {
            this.locationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.locationDataSources = data;
            this.allLocation = data;
            this.allContactLocation = data;

        });

        this.SupplierListService.getAllSupplierWarehouse(supplierId).subscribe(data => {
            this.warehouseDataSources = data;
        });

        this.SupplierListService.getAllSupplierContact(supplierId).subscribe(data => {
            this.ContactLocationApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.contactDataSources = data;
            this.allContactPerson = data;
        });

        this.SupplierListService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
            this.contactLocationDataSources = data;
        });

        this.SupplierListService.getAllSupplierMFS(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
            if (data != null) {
                this.isSupplierinfoEdit = true;
            }
            this.mobileBankingDataSources = data;
        });

        this.SupplierListService.getAllSupplierBankAccount(supplierId).subscribe(data => {
            this.bankingDataSources = data;
        });

        this.SupplierListService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
            this.SecurityDepositDataSources = data;
        });

        this.SupplierListService.getAllSupplierCreditHistory(supplierId).subscribe(data => {
            this.financialApplicationForm.reset();
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



    openBasicNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }


    //Business Submit

    openBusinessNext() {
        this.index = (this.index === 6) ? 0 : this.index + 1;
    }

    // Association submit


    //// Location submit

    //onLegalDocumentFormSubmit() {
    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    //for validation message -----------
    //    this.submittedLegalDocument = true;
    //    if (this.legalDocumentApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;

    //    let supplierId = this.rowData.SupplierId;

    //    let document_type_id = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_id;
    //    let document_type_name = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_name;
    //    if (this.dataExistDocument(document_type_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected Document already added")
    //    }

    //    else {
    //        let formData = new FormData();

    //        for (const key of Object.keys(this.legalDocumentApplicationForm.value)) {
    //            const value = this.legalDocumentApplicationForm.value[key];
    //            if (key == "issue_date") {
    //                let date = new Date(value).toISOString();
    //                formData.append("issue_date", date);
    //            }
    //            else if (key == "expiry_date") {
    //                let date = new Date(value).toISOString();
    //                formData.append("expiry_date", date);
    //            }
    //            else if (key == "document_type_id") {

    //                formData.append("document_type_id", document_type_id);
    //            }
    //            else {
    //                formData.append(key, value);
    //                formData.append("supplier_id", supplierId);
    //                formData.append("FileUpload", this.fileToUploadLegalForm);
    //            }
    //        }


    //        this.SupplierListService.updateDocumentData((formData)).subscribe(data => {
    //            this.dataSaved = true;
    //            this.LoadAllLegalDocument();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //            this.resetForm();
    //        });
    //    }

    //}

    //dataExistDocument(document_type_name) {
    //    return this.documentDataSources.some(function (el) {
    //        return el.document_type_name === document_type_name;
    //    });
    //}

    //deleteDocumentinfo(a, row) {
    //    let supplier_document_id = row.supplier_document_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteDocumentInfo(supplier_document_id).subscribe(data => {
    //            this.SupplierListService.getAllLegalDocument(supplierId).subscribe(data => {
    //                this.documentDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.documentDataSources = this.documentDataSources.slice(0, a).concat(this.documentDataSources.slice(a + 1));
    //    }
    //}


    //// Location submit

    //onLocationFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    //for validation message -----------
    //    this.submittedLocation = true;
    //    const locationData = this.locationApplicationForm.value;
    //    if (this.locationApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;


    //    let location_type_id = this.locationApplicationForm.get('location_type_id')?.value.location_type_id;
    //    let location_type_name = this.locationApplicationForm.get('location_type_id')?.value.location_type_name;
    //    if (this.dataExistLocation(location_type_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected location name already added")
    //    }


    //    else {


    //        locationData.supplier_id = this.rowData.SupplierId;
    //        locationData.country_id = locationData.country_id_location;
    //        locationData.division_id = locationData.division_id_location;
    //        locationData.district_id = locationData.district_id_location;
    //        locationData.location_type_id = location_type_id;

    //        this.SupplierListService.updateLocationData(locationData).subscribe(data => {
    //            this.dataSaved = true
    //            this.loadAllSupplierLocation();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //            this.resetForm();
    //        });

    //    }

    //}

    //dataExistLocation(location_type_name) {
    //    return this.locationDataSources.some(function (el) {
    //        return el.location_type_name === location_type_name;
    //    });
    //}

    //deleteLocation(a, row) {
    //    let supplier_location_id = row.supplier_location_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteLocationInfo(supplier_location_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierLocation(supplierId).subscribe(data => {
    //                this.locationDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.locationDataSources = this.locationDataSources.slice(0, a).concat(this.locationDataSources.slice(a + 1));
    //    }
    //}

    ////Warehouse


    //onWarehouseFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    //for validation message -----------
    //    this.submittedWarehouse = true;
    //    const warehouseData = this.warehouseApplicationForm.value;
    //    if (this.warehouseApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;

    //    let supplier_warehouse_name = warehouseData.supplier_warehouse_name;
    //    if (this.dataExistWarehouse(supplier_warehouse_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected Warehouse already added")
    //    }
    //    else {

    //        let supplierId = this.rowData.SupplierId;
    //        let locationObj = this.warehouseApplicationForm.get('supplier_location_id')?.value;
    //        let supplier_location_id = locationObj.supplier_location_id;
    //        let supplier_location_type_name = locationObj.supplier_location_type_name;
    //        let supplier_warehouse_name = this.warehouseApplicationForm.get('supplier_warehouse_name')?.value;
    //        let add_note = this.warehouseApplicationForm.get('add_note')?.value;


    //        const warehouseSessionobj = {
    //            supplier_id: supplierId,
    //            supplier_location_id: supplier_location_id,
    //            supplier_location_type_name: supplier_location_type_name,
    //            supplier_warehouse_name: supplier_warehouse_name,
    //            add_note: add_note
    //        }
    //        this.warehouseDataSources.push(warehouseSessionobj);
    //        warehouseData.supplier_id = supplierId;
    //        warehouseData.warehouseSession = this.warehouseDataSources;

    //        this.SupplierListService.updateWarehouseData(warehouseData).subscribe(data => {
    //            this.dataSaved = true;
    //            this.loadAllSupplierWarehouse();
    //            this.resetForm();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //        });
    //    }
    //}

    //dataExistWarehouse(supplier_warehouse_name) {
    //    return this.warehouseDataSources.some(function (el) {
    //        return el.supplier_warehouse_name === supplier_warehouse_name;
    //    });
    //}

    //deleteWarehouseInfo(a, row) {
    //    let supplier_warehouse_id = row.supplier_warehouse_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteWarehouseInfo(supplier_warehouse_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierWarehouse(supplierId).subscribe(data => {
    //                this.warehouseDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.warehouseDataSources = this.warehouseDataSources.slice(0, a).concat(this.warehouseDataSources.slice(a + 1));
    //    }
    //}



    ////Contacts

    //onContactFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    //for validation message -----------
    //    this.submittedContact = true;
    //    if (this.contactApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;

    //    let supplierId = this.rowData.SupplierId;

    //    let contact_type_id = this.contactApplicationForm.get('contact_type_id')?.value.contact_type_id;
    //    let contact_type_name = this.contactApplicationForm.get('contact_type_id')?.value.contact_type_name;
    //    if (this.dataExistContact(contact_type_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected Contact Type already added")
    //    }

    //    else {
    //        let formData = new FormData();
    //        for (const key of Object.keys(this.contactApplicationForm.value)) {
    //            const value = this.contactApplicationForm.value[key];
    //            if (key == "date_of_birth") {
    //                let date = new Date(value).toISOString();
    //                formData.append("date_of_birth", date);
    //            }
    //            else if (key == "date_of_marriage") {
    //                let date = new Date(value).toISOString();
    //                formData.append("date_of_marriage", date);
    //            }
    //            else if (key == "contact_type_id") {

    //                formData.append("contact_type_id", contact_type_id);
    //            }
    //            else {
    //                formData.append(key, value);
    //                formData.append("supplier_id", supplierId);
    //                formData.append("FileUpload", this.fileToUploadNID);
    //            }
    //        } formData.append("designation_id", this.contactApplicationForm.value.designation_id);
    //        formData.append("nationality_id", this.contactApplicationForm.value.nationality_id);
    //        formData.append("religion_enum_id", this.contactApplicationForm.value.religion_enum_id);
    //        formData.append("gender_enum_id", this.contactApplicationForm.value.gender_enum_id);
    //        formData.append("marital_status_enum_id", this.contactApplicationForm.value.marital_status_enum_id);
    //        formData.append("blood_group_enum_id", this.contactApplicationForm.value.blood_group_enum_id);


    //        var arr = [];
    //        var object = {};
    //        formData.forEach(function (value, key) {
    //            arr[key] = value;
    //            //fd.append(key, value);
    //        });

    //        var json = JSON.stringify(arr);
    //        console.log(object)

    //        if (this.contactDataSources.length = 0) {
    //            return this.notifyService.ShowNotification(2, "Please add at least one Contact")
    //        }
    //        else {
    //            this.SupplierListService.updateContactData((formData)).subscribe(data => {
    //                this.loadAllSupplierContact();
    //                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //            });
    //        }
    //    }

    //}

    //dataExistContact(contact_type_name) {
    //    return this.contactDataSources.some(function (el) {
    //        return el.contact_type_name === contact_type_name;
    //    });
    //}

    //DeleteContactInfo(a, row) {
    //    let supplier_contact_id = row.supplier_contact_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteContactInfo(supplier_contact_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierContact(supplierId).subscribe(data => {
    //                this.contactDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.contactDataSources = this.contactDataSources.slice(0, a).concat(this.contactDataSources.slice(a + 1));
    //    }
    //}


    //onContactLocationFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }
    //    let supplierId = this.rowData.SupplierId;

    //    const contactLocationData = this.ContactLocationApplicationForm.value;

    //    //for validation message -----------
    //    this.submittedContactLocation = true;
    //    if (this.ContactLocationApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;

    //    let supplier_contact_id = contactLocationData.supplier_contact_id;
    //    if (this.dataExistContactLocation(supplier_contact_id)) {
    //        return this.notifyService.ShowNotification(2, "Selected Contact Type already added")
    //    }

    //    else {


    //        let supplier_location_id = contactLocationData.supplier_location_id;
    //        let supplier_contact_id = contactLocationData.supplier_contact_id;
    //        let add_note = this.ContactLocationApplicationForm.get('add_note')?.value;


    //        const contactLocationSessionobj = {
    //            supplier_id: supplierId,
    //            supplier_location_id: supplier_location_id,
    //            supplier_contact_id: supplier_contact_id,
    //            add_note: add_note

    //        }
    //        this.SupplierListService.updateContactLocationData(contactLocationSessionobj).subscribe(data => {
    //            this.dataSaved = true;
    //            this.loadAllSupplierContactLocation();
    //            this.resetForm();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //        });
    //    }
    //}

    //dataExistContactLocation(supplier_contact_id) {
    //    return this.contactLocationDataSources.some(function (el) {
    //        return el.supplier_contact_id === supplier_contact_id;
    //    });
    //}

    //deleteContactLocationInfo(a, row) {
    //    let supplier_contact_location_id = row.supplier_contact_location_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteLocationWiseContactInfo(supplier_contact_location_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierLocationWiseContact(supplierId).subscribe(data => {
    //                this.contactLocationDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.contactLocationDataSources = this.contactLocationDataSources.slice(0, a).concat(this.contactLocationDataSources.slice(a + 1));
    //    }
    //}

    ////Financial Info

    //addSecurityDepositToTable(a) {

    //    this.submittedFinancialSecurity = true;
    //    const securityDepositData = this.financialApplicationForm.value;


    //    if ((securityDepositData.security_deposit_id == "") || (securityDepositData.security_deposit_id == null) || (securityDepositData.security_deposit_id == undefined)) {
    //        return;
    //    }
    //    if ((securityDepositData.security_amount == "") || (securityDepositData.security_amount == null) || (securityDepositData.security_amount == undefined)) {
    //        return;
    //    }
    //    if ((securityDepositData.expiry_date == "") || (securityDepositData.expiry_date == null) || (securityDepositData.expiry_date == undefined)) {
    //        return;
    //    }


    //    this.dataSaved = false;
    //    let security_deposit_id = this.financialApplicationForm.get('security_deposit_id')?.value.security_deposit_id;
    //    let security_deposit_name = this.financialApplicationForm.get('security_deposit_id')?.value.security_deposit_name;
    //    if (this.dataExistSecurityDeposit(security_deposit_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected Security Deposit already added")
    //    }

    //    else {

    //        let supplierId = this.rowData.SupplierId;
    //        let securityDepositObj = this.financialApplicationForm.get('security_deposit_id')?.value;
    //        let security_deposit_id = securityDepositObj.security_deposit_id;
    //        let security_deposit_name = securityDepositObj.security_deposit_name;
    //        let security_amount = this.financialApplicationForm.get('security_amount')?.value;
    //        let expiry_date = this.financialApplicationForm.get('expiry_date')?.value;

    //        const securityDepositSessionobj = {
    //            supplier_id: supplierId,
    //            security_deposit_id: security_deposit_id,
    //            security_deposit_name: security_deposit_name,
    //            security_amount: security_amount,
    //            expiry_date_str: this.formatDate(expiry_date),
    //            expiry_date: (expiry_date),

    //        }
    //        this.SecurityDepositDataSources.push(securityDepositSessionobj);


    //    }
    //}

    //onSecurityDepositFormSubmit() {


    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }

    //    const financialInfoData = this.financialApplicationForm.value;

    //    //for validation message -----------
    //    this.submittedFinancial = true;
    //    if ((financialInfoData.currency_id == "") || (financialInfoData.currency_id == null) || (financialInfoData.currency_id == undefined)) {
    //        return;
    //    }
    //    if ((financialInfoData.credit_days == "") || (financialInfoData.credit_days == null) || (financialInfoData.credit_days == undefined)) {
    //        return;
    //    }
    //    if ((financialInfoData.credit_limit == "") || (financialInfoData.credit_limit == null) || (financialInfoData.credit_limit == undefined)) {
    //        return;
    //    }
    //    if ((financialInfoData.payment_frequency_id == "") || (financialInfoData.payment_frequency_id == null) || (financialInfoData.payment_frequency_id == undefined)) {
    //        return;
    //    }
    //    else if (this.SecurityDepositDataSources.length == 0) {
    //        return this.notifyService.ShowNotification(2, "Please add at least security first")
    //    }
    //    //end validation messate -----------

    //    else {
    //        let supplierId = this.rowData.SupplierId;
    //        financialInfoData.securityDepositSession = this.SecurityDepositDataSources;
    //        financialInfoData.supplier_id = supplierId;
    //        this.SupplierListService.updateSupplierCreditDepositApplication(financialInfoData).subscribe(data => {
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //        });
    //    }

    //}

    //dataExistSecurityDeposit(security_deposit_name) {
    //    return this.SecurityDepositDataSources.some(function (el) {
    //        return el.security_deposit_name === security_deposit_name;
    //    });
    //}

    //removeSecurityDeposit(a, row) {
    //    this.SecurityDepositDataSources = this.SecurityDepositDataSources.slice(0, a).concat(this.SecurityDepositDataSources.slice(a + 1));
    //}



    ///// Mobile


    //onMobileBankingFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }
    //    let supplierId = this.rowData.SupplierId;

    //    //for validation message -----------
    //    this.submittedMobileBanking = true;
    //    const mobileBankingData = this.mobileBankingApplicationForm.value;
    //    if (this.mobileBankingApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;


    //    let mfs_id = this.mobileBankingApplicationForm.get('mfs_id')?.value.mfs_id;
    //    let mfs_name = this.mobileBankingApplicationForm.get('mfs_id')?.value.mfs_name;
    //    if (this.dataExistMFS(mfs_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected MFS name already added")
    //    }

    //    else {
    //        mobileBankingData.supplier_id = supplierId;
    //        this.SupplierListService.updateMobileBankingData(mobileBankingData).subscribe(data => {
    //            this.dataSaved = true;
    //            this.loadAllSupplierMFS();
    //            this.resetForm();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //        });
    //    }

    //}

    //dataExistMFS(mfs_name) {
    //    return this.mobileBankingDataSources.some(function (el) {
    //        return el.mfs_name === mfs_name;
    //    });
    //}

    //deleteMFS(a, row) {
    //    let supplier_mobile_bank_id = row.supplier_mobile_bank_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteMFSAccount(supplier_mobile_bank_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierMFS(supplierId).subscribe(data => {
    //                this.mobileBankingDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.mobileBankingDataSources = this.mobileBankingDataSources.slice(0, a).concat(this.mobileBankingDataSources.slice(a + 1));
    //    }
    //}


    //// Banking

    //onBankingFormSubmit() {

    //    if (this.rowData == null) {
    //        return this.notifyService.ShowNotification(3, 'Please select row');
    //    }
    //    let supplierId = this.rowData.SupplierId;

    //    //for validation message -----------
    //    this.submittedBanking = true;
    //    const bankingData = this.bankingApplicationForm.value;
    //    if (this.bankingApplicationForm.invalid) {
    //        return;
    //    }
    //    //end validation messate -----------

    //    this.dataSaved = false;


    //    let bank_id = this.mobileBankingApplicationForm.get('bank_id')?.value.bank_id;
    //    let bank_name = this.mobileBankingApplicationForm.get('bank_id')?.value.bank_name;
    //    if (this.dataExistBankAccount(bank_name)) {
    //        return this.notifyService.ShowNotification(2, "Selected Bank name already added")
    //    }

    //    else {
    //        bankingData.supplier_id = supplierId;
    //        this.SupplierListService.UpdateBankAccountData(bankingData).subscribe(data => {
    //            this.dataSaved = true;
    //            this.loadAllSupplierBankAccount();
    //            this.resetForm();
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //        });
    //    }
    //}

    //dataExistBankAccount(bank_name) {
    //    return this.bankingDataSources.some(function (el) {
    //        return el.bank_name === bank_name;
    //    });
    //}

    //deleteBankAccount(a, row) {
    //    let supplier_bank_account_id = row.supplier_bank_account_id;
    //    if (this.loadSupplierinfoToEdit) {
    //        let supplierId = this.rowData.SupplierId;
    //        this.SupplierListService.deleteBankAccount(supplier_bank_account_id).subscribe(data => {
    //            this.SupplierListService.getAllSupplierBankAccount(supplierId).subscribe(data => {
    //                this.bankingDataSources = data;
    //            });
    //            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //        });
    //    }
    //    else {
    //        this.bankingDataSources = this.bankingDataSources.slice(0, a).concat(this.bankingDataSources.slice(a + 1));
    //    }
    //}


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
        this.SupplierListService.approveSupplier(approveFeedbackData).subscribe(data => {
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
        this.SupplierListService.rejectSupplier(rejectFeedbackData).subscribe(data => {
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
            this.loadAllConfirmSupplierinfos();
        });
    }

    onRowEditInit(category: Category) {
        debugger
        this.clonedProducts[category.id] = { ...category };
    }

    onRowEditSave(category: Category) {
        if (category.id > 0) {
            delete this.clonedProducts[category.id];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
        }
    }

    onRowEditCancel(category: Category, index: number) {
        this.categories[index] = this.clonedProducts[category.id];
        delete this.categories[category.id];
    }

}

















