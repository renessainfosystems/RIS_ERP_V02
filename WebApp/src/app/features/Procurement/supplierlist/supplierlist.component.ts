import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { SupplierListService } from './supplierlist.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.css']
})

export class SupplierlistComponent implements OnInit {

  @ViewChild('supplierImage', {
    static: true
  }) supplierImage;

  fileToUploadLegalForm: File | null = null;
  fileToUploadNID: File | null = null;
  fileToUploadSecurity: File | null = null;
  FileUpload: null;


  // for photo and signature upload
  fileurllink: null;
  photourllink: string = "assets/images/user-photo1.png";



  /*  supplier_id: any = 1;*/
  selectedSubSectorTable: any;
  selectedLocationTable: any;
  selectedContactTable: any;
  selectedSecurityDepositTable: any;
  selectedMobileBankingTable: any;
  selectedBankingTable: any;
  selectedProductTable: any;
  selectedContactLocationTable: any;

  subSectorDataSources: any[] = [];
  associationDataSources: any[] = [];
  documentDataSources: any[] = [];
  locationDataSources: any[] = [];
  warehouseDataSources: any[] = [];
  contactDataSources: any[] = [];
  SecurityDepositDataSources: any[] = [];
  mobileBankingDataSources: any[] = [];
  bankingDataSources: any[] = [];
  productDataSources: any[] = [];
  contactLocationDataSources: any[] = [];

  supplierinfoList: any[];//List Supplierinfo
  selectedsupplierinfo: any;// Selected Dealerinfo
  isSupplierinfoEdit: boolean = false;
  selectedDocumentInfo: any;// Selected DocumentInfoinfo

  bank_swift_code: any;
  supplierData: any;
  businessData: any;
  phone: string;

  rowData: any;
  supplierId: any;
  dataSaved = false;

  supplierApplicationForm: any;//FormName
  businessApplicationForm: any;//FormName
  associationsApplicationForm: any;//FormName
  legalDocumentApplicationForm: any;//FormName
  locationApplicationForm: any;//FormName
  warehouseApplicationForm: any;//FormName
  contactApplicationForm: any;//FormName
  financialApplicationForm: any;//FormName
  mobileBankingApplicationForm: any;//FormName
  feedbackApplicationForm: any;//FormName
  ContactLocationApplicationForm: any;//FormName
  /*  ProductApplicationForm: any;//FormName*/

  nodeSelected: boolean = false;
  allSupplierApplication: Observable<any[]>;
  selection = new SelectionModel<any>(true, []);
  supplierApplicationIdUpdate = null;
  massage = null;


  //Business Info

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

  //Contact Location
  selectedContactLocation: any;
  allContactLocation: any[];

  selectedContactPerson: any;
  allContactPerson: any[];


  //Financial Info
  selectedCurrency: any;
  allCurrency: any[];

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

  // Products

  //selectedItemCategory: any;
  //allItemCategory: any[];

  //selectedSubItemCategory: any;
  //allItemSubCategory: any[];

  //selectedItemClass: any;
  //allItemClass: any[];

  //selectedItemType: any;
  //allItemType: any[];

  //selectedItem: any;
  //allItem: any[];


  first = 0;
  rows = 10;

  collapsed = true;

  collapsedBasicInfo = true;
  collapsedBasicDetails = false;

  collapsedLocationInfo = true;
  collapsedWarehouseInfo = false;

  collapsedContactInfo = true;
  collapsedLocationWiseContactInfo = false;


  collapsedSecurityDepositInfo = true;
  collapsedMobileBankingInfo = true;
  collapsedBankingInfo = false;

  // for delete data modal
  display: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }



  // for search
  disabled: boolean = true;
  value1: string;


  // for modal

  displayModal: boolean;

  displayBasic: boolean;
  showBasicDialog() {
    this.displayBasic = true;
  }


  constructor(private formbulider: FormBuilder, private SupplierListService: SupplierListService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer) {

  }

  checked: boolean = false;

  selectedPaymentFrequency: boolean = false;

  ngOnInit(): void {


    //Basic
    this.supplierApplicationForm = this.formbulider.group({
      supplier_code: [null, [Validators.required]],
      /*  supplier_id: [null],*/
      legal_name: [null, [Validators.required]],
      short_name: [null, [Validators.required]],
      year_established: [null],

      domicile_enum_id: [null],
      registry_authority_id: [null],
      regulator_id: [null],
      ownership_type_id: [null],

      name_in_local_language: [null],
      address_in_local_language: [null],
      //  supplier_logo: [null],
      ImageUpload: new FormControl('', [Validators.required]),
      country_id: [null, [Validators.required]],
      division_id: [null, [Validators.required]],
      district_id: [null, [Validators.required]],
      city: [null],
      ps_area: [null],
      post_code: [null],
      block: [null],
      road_no: [null],
      house_no: [null],
      flat_no: [null],
      email: [null],
      mobile_no: [null],
      phone_no: [null],
      pabx: [null],

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

    //this.supplierId();
    //this.loadSupplierBasicInfo();
    //this.loadAllSupplierLocation();
    //this.loadAllSupplierBusiness();
    //this.loadAllSupplierBusinessSubSector();
    //this.loadAllSupplierBusinessEcommerce();
    //this.loadAllSupplierAssociation();
    //this.LoadAllLegalDocument();
    //this.loadAllSupplierWarehouse();
    //this.loadAllSupplierContact();
    //this.loadAllSupplierCreditDeposit();
    //this.loadAllSupplierCreditHistory();
    //this.loadAllSupplierMFS();
    //this.loadAllSupplierBankAccount();

    this.loadAllDomicileEnum();
    this.loadAllRegistryAuthorityCboList();
    this.loadAllRegulatorCboList();
    this.loadAllOwnershipTypeCboList();
    this.loadAllCountryCboList();
    /*  this.supplierApplicationForm.controls['supplier_code'].disable();*/


    //Business
    this.businessApplicationForm = this.formbulider.group({
      business_activities_enum_id: [null],
      industry_sector_id: [null],
      industry_sub_sector_id: [null],
      management_staff_no: [null],
      nonmanagement_staff_no: [null],
      permanent_worker_no: [null],
      casual_worker_no: [null],
      ecommerce_platforms_id: [null],
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
      association_id: [null],
      abbreviation: [null],
      country_id_association: [null],
      organization_type_id_enum: [null],
      membership_type_enum_id: [null],
      association_number: [null],
      start_date: [null],
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
      document_type_id: [null],
      document_number: [null],
      issue_date: [null],
      expiry_date: [null],
      expired_notified_days: [null],
      file_path: [null],
      FileUpload: new FormControl('', [Validators.required]),
    });
    this.loadAllDocumentCboList();

    this.legalDocumentApplicationForm.controls['document_type_id'].disable();
    this.legalDocumentApplicationForm.controls['document_number'].disable();
    this.legalDocumentApplicationForm.controls['issue_date'].disable();
    this.legalDocumentApplicationForm.controls['expiry_date'].disable();


    //Location
    this.locationApplicationForm = this.formbulider.group({
      location_type_id: [null],
      supplier_location_name: [null],
      country_id_location: [null],
      division_id_location: [null, [Validators.required]],
      district_id_location: [null, [Validators.required]],
      city: [null],
      ps_area: [null],
      post_code: [null],
      block: [null],
      road_no: [null],
      house_no: [null],
      flat_no: [null],
      email: [null],
      mobile_no: [null],
      phone_no: [null],
      pabx: [null],
    });
    this.loadAllLocationTypeCboList();

    //Warehouse
    this.warehouseApplicationForm = this.formbulider.group({
      supplier_location_id: [null],
      supplier_warehouse_name: [null],
      add_note: [null],
    });


    //Contact
    this.contactApplicationForm = this.formbulider.group({
      contact_type_id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      middle_name: '',
      sur_name: ['', [Validators.required]],
      designation_id: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      phone: '',
      whatsapp: '',
      facebook: '',
      linkedin: '',
      date_of_birth: '',
      date_of_marriage: '',
      nid_number: ['', [Validators.required]],
      passport_no: '',
      birth_id: '',
      driving_license_no: '',
      //drownlist field
      gender_enum_id: ['', [Validators.required]],
      religion_enum_id: ['', [Validators.required]],
      blood_group_enum_id: '',
      marital_status_enum_id: ['', [Validators.required]],
      nationality_id: ['', [Validators.required]],
      FileUpload: new FormControl('', [Validators.required]),
    });
    this.loadAllContactTypeCboList();
    this.LoadAllDesignationCboList();
    this.loadGenderdrpdwn();
    this.loadReligiondrpdwn();
    this.loadBloodGroupdrpdwn();
    this.loadNationalitydrpdwn();
    this.loadMaritalStatusdrpdwn();


    this.ContactLocationApplicationForm = this.formbulider.group({
      supplier_location_id: [null],
      supplier_contact_id: [null],
      add_note: [null],
    });


    //Financial Info

    this.financialApplicationForm = this.formbulider.group({
      currency_id: [null, [Validators.required]],
      credit_days: ['', [Validators.required]],
      credit_limit: ['', [Validators.required]],
      is_payment_monthly: false,
      security_deposit_id: [null, [Validators.required]],
      security_amount: null,
      expiry_date: null,
      security_document_path: [null],
      FileUpload: new FormControl('', [Validators.required]),
    });
    this.LoadAllCurrencyCboList();
    this.LoadAllSecurityTypeCboList();

    this.mobileBankingApplicationForm = this.formbulider.group({

      mfs_id: [null, [Validators.required]],
      account_number: ['', [Validators.required]],
      mfs_type_id: [null, [Validators.required]],

    });
    this.LoadAllMfsCboList();
    this.LoadAllMfsTypeCboList();

    this.feedbackApplicationForm = this.formbulider.group({
      comment: ['', [Validators.required]],
      suggestion: ['', [Validators.required]],

    });
    this.LoadAllBankTypeCboList();
    this.feedbackApplicationForm.controls['comment'].disable();
    this.feedbackApplicationForm.controls['suggestion'].disable();
    /*this.LoadAllBankCboList();*/


    //Product Info

    //this.ProductApplicationForm = this.formbulider.group({
    //  item_category_id: [null],
    //  item_sub_category_id: [null],
    //  item_class_id: [null],
    //  item_type_id: [null],
    //  item_code: [null],
    //  item_uom: [null],
    //  reorder_qty: [null],
    //  reorder_value: [null],
    //  monthly_capacity: [null],
    //});
    //  this.loadAllSupplierWarehouse();

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
    return this.supplierApplications ? this.first === (this.supplierApplications.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.supplierApplications ? this.first === 0 : true;
  }

  onRowSelect(event) {

    this.nodeSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {

    this.nodeSelected = false;
    this.rowData = null;

  }

  toggleBasicInfo() {
    if (this.collapsedBasicInfo) {
      this.collapsedBasicDetails = true;
      this.collapsedBasicInfo = false;
    }
    else {
      this.collapsedBasicInfo = true;
      this.collapsedBasicDetails = false;
    }
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


  btnNew() {

    this.toggleBasicInfo();
  }

  viewDocumentinfo(a, row) {
    let supplierId = row.SupplierId;
    this.supplierId = row.SupplierId;
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
        this.financialApplicationForm.controls['is_payment_monthly'].setValue(data.is_payment_monthly);
      }
    });

    this.feedbackApplicationForm.controls['comment'].enable();
    this.feedbackApplicationForm.controls['suggestion'].enable();
    this.toggleBasicInfo();
  }

  // Basic dd Load

  // All Supplier List

  loadAllConfirmSupplierinfos() {
    this.SupplierListService.getAllConfirmSupplierInfo().subscribe(data => {
      debugger
      this.supplierinfoList = data;
    });
  }

  //supplierId() {
  //  this.SupplierListService.getSupplierId().subscribe(data => {
  //    this.massage = null;
  //    this.dataSaved = false;
  //    this.supplierApplicationForm.controls['supplier_code'].setValue(data.SupplierCode);
  //    this.supplier_id = data.SupplierId;
  //  });
  //}

  //loadSupplierBasicInfo() {
  //  this.SupplierListService.getSupplierBasicInfo(this.supplier_id).subscribe(data => {
  //    this.massage = null;
  //    this.dataSaved = false;
  //    this.supplierApplicationForm.controls['legal_name'].setValue(data.LegalName);
  //    this.supplierApplicationForm.controls['short_name'].setValue(data.ShortName);
  //    this.supplierApplicationForm.controls['year_established'].setValue(new Date(data.YearEstablished));
  //    this.supplierApplicationForm.controls['domicile_enum_id'].setValue(data.DomicileEnumId);
  //    this.supplierApplicationForm.controls['registry_authority_id'].setValue(data.RegistryAuthorityId);
  //    this.supplierApplicationForm.controls['regulator_id'].setValue(data.RegulatorId);
  //    this.supplierApplicationForm.controls['ownership_type_id'].setValue(data.OwnershipTypeId);
  //    this.supplierApplicationForm.controls['name_in_local_language'].setValue(data.NameInLocalLanguage);
  //    this.supplierApplicationForm.controls['address_in_local_language'].setValue(data.AddressInLocalLanguage);
  //    this.supplierApplicationForm.controls['country_id'].setValue(data.CountryId);
  //    this.onSelectByCountryId(data.CountryId);
  //    this.supplierApplicationForm.controls['division_id'].setValue(data.DivisionId);
  //    this.onSelectByDivisionId(data.DivisionId);
  //    this.supplierApplicationForm.controls['district_id'].setValue(data.DistrictId);
  //    this.supplierApplicationForm.controls['city'].setValue(data.City);
  //    this.supplierApplicationForm.controls['ps_area'].setValue(data.PsArea);
  //    this.supplierApplicationForm.controls['post_code'].setValue(data.PostCode);
  //    this.supplierApplicationForm.controls['block'].setValue(data.Block);
  //    this.supplierApplicationForm.controls['road_no'].setValue(data.RoadNo);
  //    this.supplierApplicationForm.controls['house_no'].setValue(data.HouseNo);
  //    this.supplierApplicationForm.controls['flat_no'].setValue(data.FlatNo);
  //    this.supplierApplicationForm.controls['email'].setValue(data.Email);
  //    this.supplierApplicationForm.controls['mobile_no'].setValue(data.MobileNo);
  //    this.supplierApplicationForm.controls['phone_no'].setValue(data.PhoneNo);
  //    this.supplierApplicationForm.controls['pabx'].setValue(data.Pabx);

  //    //this.supplier_id = data.SupplierId;
  //    //this.supplierApplicationForm.controls['supplier_id'].setValue(data.SupplierId);
  //  });
  //}


  //loadAllSupplierLocation() {
  // // let supplierId = this.supplier_id;
  //  debugger
  //  let supplierId = this.rowData.SupplierId;
  //  this.SupplierListService.getAllSupplierLocation(supplierId).subscribe(data => {
  //    debugger
  //    this.locationDataSources = data;
  //    this.allLocation = data;
  //    this.allContactLocation = data;
  //  });
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

  onSelectByCountryIdLocation() {
    let countryLocationObj = this.locationApplicationForm.get('country_id_location')?.value;
    let countryId = countryLocationObj.country_id;
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

  onSelectByDivisionIdLocation() {
    let divisionLocationObj = this.locationApplicationForm.get('division_id_location')?.value;
    let divisionId = divisionLocationObj.division_id;
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

  //loadAllSupplierBusiness() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierBusiness(supplierId).subscribe(data => {
  //    this.massage = null;
  //    this.dataSaved = false;
  //    this.businessApplicationForm.controls['business_activities_enum_id'].setValue(data.BusinessActivityEnumId);
  //    this.businessApplicationForm.controls['management_staff_no'].setValue(data.ManagementStaffNo);
  //    this.businessApplicationForm.controls['nonmanagement_staff_no'].setValue(data.NonmanagementStaffNo);
  //    this.businessApplicationForm.controls['permanent_worker_no'].setValue(data.PermanentWorkerNo);
  //    this.businessApplicationForm.controls['casual_worker_no'].setValue(data.CasualWorkerNo);

  //  });
  //}

  //loadAllSupplierBusinessSubSector() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierBusinessSubSector(supplierId).subscribe(data => {
  //    this.massage = null;
  //    this.dataSaved = false;
  //    this.subSectorDataSources = data;
  //  });
  //}

  //loadAllSupplierBusinessEcommerce() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierBusinessEcommerce(supplierId).subscribe(data => {
  //    this.massage = null;
  //    this.dataSaved = false;
  //  });
  //}

  //Association dd load

  loadAllAssociationCboList() {
    this.SupplierListService.getAllAssociationCboList().subscribe(data => {
      this.allAssociation = data;
    });
  }

  onSelectByAssociationId() {
    let associationObj = this.associationsApplicationForm.get('association_id')?.value;
    let associationId = associationObj.association_id;
    if (associationId != null) {
      this.SupplierListService.getAllDataByAssociationId(associationId).subscribe(data => {
        this.associationsApplicationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
        this.associationsApplicationForm.controls['abbreviation'].setValue(data.abbreviation);
        let countryAssociationId = data.country_id;
        /*  alert(countryAssociationId)*/
        if (countryAssociationId != null) {
          this.SupplierListService.GetByCountryId(countryAssociationId).subscribe(data => {
            this.associationsApplicationForm.controls['country_id_association'].setValue(data.country_id);
          });
        }
        /*     console.log(data);*/
      });
    }
    else
      this.allDivision = null;
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

  //loadAllSupplierAssociation() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierAssociation(supplierId).subscribe(data => {
  //    this.associationDataSources = data;
  //  });
  //}


  //Legal dd load
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

  //Warehouse dd load
  //loadAllSupplierWarehouse() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierWarehouse(supplierId).subscribe(data => {
  //    this.warehouseDataSources = data;
  //  });
  //}

  //Contact dd load
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

  // Financial dd load


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

  //LoadAllBankCboList() {
  //  this.SupplierListService.getAllBankCboList().subscribe(data => {
  //    this.allBank = data;
  //  });
  //}

  //loadAllSupplierMFS() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierMFS(supplierId).subscribe(data => {
  //    this.mobileBankingDataSources = data;
  //  });
  //}

  //loadAllSupplierBankAccount() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierBankAccount(supplierId).subscribe(data => {
  //    this.bankingDataSources = data;
  //  });
  //}

  //loadAllSupplierCreditDeposit() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierCreditDeposit(supplierId).subscribe(data => {
  //    this.SecurityDepositDataSources = data;
  //  });
  //}

  //loadAllSupplierCreditHistory() {
  //  let supplierId = this.supplier_id;
  //  this.SupplierListService.getAllSupplierCreditHistory(supplierId).subscribe(data => {
  //    this.financialApplicationForm.controls['currency_id'].setValue(data.currency_id);
  //    this.financialApplicationForm.controls['credit_days'].setValue(data.credit_days);
  //    this.financialApplicationForm.controls['credit_limit'].setValue(data.credit_limit);
  //    this.financialApplicationForm.controls['is_payment_monthly'].setValue(data.is_payment_monthly);

  //  });
  //}

  //onSelectByBankTypeId() {
  //  let bankTypeObj = this.bankingApplicationForm.get('bank_type_id')?.value;
  //  let bankTypeId = bankTypeObj.bank_type_id;
  //  if (bankTypeId != null) {
  //    this.SupplierListService.getAllBankCboListByBankTypeId(bankTypeId).subscribe(data => {
  //      this.allBank = data;
  //    });
  //  }
  //  else
  //    this.allBank = null;
  //}

  //onSelectByBankId() {
  //  let bankObj = this.bankingApplicationForm.get('bank_id')?.value;
  //  let bankId = bankObj.bank_id;

  //  this.SupplierListService.getAllBankBranchCboListByBankId(bankId).subscribe(data => {
  //    this.allBankBranch = data;
  //  });

  //  this.SupplierListService.GetBankById(bankId).subscribe(data => {
  //    debugger
  //    /*      this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.bank_swift_code);*/
  //    this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.BankSwiftCode);
  //  });

  //}

  //onSelectByBankBranchId() {
  //  let bankBranchObj = this.bankingApplicationForm.get('bank_branch_id')?.value;
  //  let bankBranchId = bankBranchObj.bank_branch_id;
  //  this.SupplierListService.GetAllBankBranchByBankBranchId(bankBranchId).subscribe(data => {
  //    debugger
  //    /*      this.bankingApplicationForm.controls['bank_swift_code'].setValue(data.bank_swift_code);*/
  //    this.bankingApplicationForm.controls['bank_branch_routing'].setValue(data.BankBranchRouting);
  //  });
  //}



  resetForm() {
    this.supplierApplicationForm.reset();
    this.isSupplierinfoEdit = false;
    this.loadAllConfirmSupplierinfos();
    //  this.dealerinfodataSource = [];
  }


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
        this.financialApplicationForm.controls['is_payment_monthly'].setValue(data.is_payment_monthly);
      }
    });

    this.toggleBasicInfo();
  }

  onFormSubmit() {

    //const data = this.supplierApplicationForm.value;
    //if (!(data.legal_name)) {
    //  return this.notifyService.ShowNotification(2, "Please input Legal Name")
    //}
    //if (!(data.short_name)) {
    //  return this.notifyService.ShowNotification(2, "Please input Short Name")
    //}
    //if (!(data.ownership_type_id)) {
    //  return this.notifyService.ShowNotification(2, "Please select Ownership")
    //}
    //if (!(data.country_id)) {
    //  return this.notifyService.ShowNotification(2, "Please select Country")
    //}
    //if (!(data.division_id)) {
    //  return this.notifyService.ShowNotification(2, "Please select Divisiion")
    //}

    //if (!(data.district_id)) {
    //  return this.notifyService.ShowNotification(2, "Please select District")
    //}
    //if (!(data.email)) {
    //  return this.notifyService.ShowNotification(2, "Please input Email")
    //}
    //if (!(data.mobile_no)) {
    //  return this.notifyService.ShowNotification(2, "Please input Mobile Number")
    //}

    //let formData = new FormData();


    //for (const key of Object.keys(this.supplierApplicationForm.value)) {
    //  const value = this.supplierApplicationForm.value[key];
    //  if (key == "year_established") {
    //    let date = new Date(value).toISOString();
    //    formData.append("year_established", date);
    //  }
    //  else {

    //    formData.append(key, value);
    //  }
    //} formData.append("domicile_enum_id", this.supplierApplicationForm.value.domicile_enum);
    //formData.append("registry_authority_id", this.supplierApplicationForm.value.registry_authority_id);
    //formData.append("regulator_id", this.supplierApplicationForm.value.regulator_id);
    //formData.append("ownership_type_id", this.supplierApplicationForm.value.ownership_type_id);
    //formData.append("country_id", this.supplierApplicationForm.value.country_id);
    //formData.append("division_id", this.supplierApplicationForm.value.divisionObj);
    //formData.append("district_id", this.supplierApplicationForm.value.districtObj);



    //if (this.isSupplierinfoEdit) {

    //  data.supplierId = this.rowData.SupplierId;
    //  formData.append("supplier_id", this.rowData.SupplierId);
    //  this.SupplierListService.updateSupplierApplication(formData).subscribe(result => {
    //    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
    //    this.loadAllSupplierinfos();
    //    this.resetForm();
    //    this.isSupplierinfoEdit = false;
    //    this.collapsedBasicInfo = true;
    //    this.collapsedBasicDetails = false;
    //    this.onRowUnselect(event);
    //  });
    //}
    //else {
    //  this.SupplierListService.createSupplierApplication(formData).subscribe(
    //    result => {
    //      this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
    //      this.loadAllSupplierinfos();
    //      this.resetForm();
    //      this.collapsedBasicInfo = true;
    //      this.collapsedBasicDetails = false;
    //    }
    //  );
    //}

  }

  //Business Submit
  //addSubSectorToTable(a) {

  //}

  dataSubSectorExist(industrySubSectorId) {
    return this.subSectorDataSources.some(function (el) {
      return el.industry_sub_sector_id === industrySubSectorId;
    });
  }

  removeSubSector(a, row) {
    /*    this.subSectorDataSources = this.subSectorDataSources.slice(0, a).concat(this.subSectorDataSources.slice(a + 1));*/

  }

  onCheckboxChange(category, id, name) {

    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}


    //if (category.checked) {
    //  let supplierId = this.rowData.SupplierId;
    //  const ecommerceobj = { supplier_id: supplierId, ecommerce_platforms_id: id, ecommerce_paltforms_name: name }
    //  this.checkedIDs.push(ecommerceobj);
    //}
    //else {
    //  this.checkedIDs = this.checkedIDs.filter(item => item.ecommerce_platforms_id !== id);
    //}
  }

  onBusinessFormSubmit() {

    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}

    //let supplierId = this.rowData.SupplierId;

    //const businessData = this.businessApplicationForm.value;
    //if (!(businessData.business_activities_enum_id)) {
    //  return this.notifyService.ShowNotification(2, "Please select Business Activities")
    //}
    //if ((this.subSectorDataSources.length == 0)) {
    //  return this.notifyService.ShowNotification(2, "Please add at least one  subsector")
    //}

    //else {
    //  businessData.subSectorSession = this.subSectorDataSources;
    //  businessData.ecommerceSession = this.checkedIDs;
    //  businessData.supplier_id = supplierId;

    //  this.SupplierListService.updateBusinessData(businessData).subscribe(data => {
    //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //  });
    //}


  }

  // Association submit

  //addAssociationToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }

  //  let supplierId = this.rowData.SupplierId;

  //  let associationObj = this.associationsApplicationForm.get('association_id')?.value;
  //  let association_id = associationObj.association_id;
  //  let association_name = associationObj.association_name;

  //  let membershipObj = this.associationsApplicationForm.get('membership_type_enum_id')?.value;
  //  let membership_type_enum_id = membershipObj.membership_type_enum_id;
  //  let membership_type_enum_name = membershipObj.membership_type_enum_name;

  //  let association_number = this.associationsApplicationForm.get('association_number')?.value;

  //  let start_date = this.associationsApplicationForm.get('start_date')?.value;

  //  if (this.dataExistAssociation(association_id)) {
  //    return this.notifyService.ShowNotification(2, "Selected Association already added")
  //  }

  //  else {
  //    if (this.associationDataSources.includes(this.associationsApplicationForm.get('associationObj')?.value)) {
  //      return this.toastr.warning("Please select Association")
  //    }

  //    const associationSessionobj = {
  //      supplier_id: supplierId,
  //      association_id: association_id,
  //      association_name: association_name,
  //      membership_type_enum_id: membership_type_enum_id,
  //      membership_type_enum_name: membership_type_enum_name,
  //      association_number: association_number,
  //      start_date_str: this.formatDate(start_date),
  //      start_date: (start_date)

  //    }
  //    this.associationDataSources.push(associationSessionobj);
  //  }

  //}

  formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
  }

  dataExistAssociation(association_id) {
    return this.associationDataSources.some(function (el) {
      return el.association_id === association_id;
    });
  }

  removeAssociation(a, row) {
    this.associationDataSources = this.associationDataSources.slice(0, a).concat(this.associationDataSources.slice(a + 1));
  }

  onAssociationFormSubmit() {

    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}

    //let supplierId = this.rowData.SupplierId;


    //const associationData = this.associationsApplicationForm.value;
    //associationData.membership_type_enum_id = associationData.membership_type_enum

    //associationData.associationSession = this.associationDataSources;
    //if (this.associationDataSources.length == 0) {
    //  return this.notifyService.ShowNotification(2, "Please select at least one Association")
    //}
    //else {
    //  associationData.supplier_id = supplierId;
    //  this.SupplierListService.updateAssociationData(associationData).subscribe(data => {
    //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //  });
    //}
  }


  //onLegalDocumentFormSubmit() {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }

  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.legalDocumentApplicationForm.value;

  //  if (!(data.document_type_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Document Type")
  //  }
  //  if (!(data.document_number)) {
  //    return this.notifyService.ShowNotification(2, "Please input Document Name")
  //  }
  //  if (!(data.issue_date)) {
  //    return this.notifyService.ShowNotification(2, "Please select Issue Date")
  //  }
  //  if (!(data.expiry_date)) {
  //    return this.notifyService.ShowNotification(2, "Please select Expiry Date")
  //  }
  //  if (this.fileToUploadLegalForm == null) {
  //    return this.notifyService.ShowNotification(2, "Please Choose Upload File")
  //  }

  //  let document_type_id = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_id;

  //  let document_type_name = this.legalDocumentApplicationForm.get('document_type_id')?.value.document_type_name;
  //  if (this.dataExistDocument(document_type_name)) {
  //    return this.notifyService.ShowNotification(2, "Selected Document already added")
  //  }


  //  else {
  //    let formData = new FormData();

  //    for (const key of Object.keys(this.legalDocumentApplicationForm.value)) {
  //      const value = this.legalDocumentApplicationForm.value[key];
  //      if (key == "issue_date") {
  //        let date = new Date(value).toISOString();
  //        formData.append("issue_date", date);
  //      }
  //      else if (key == "expiry_date") {
  //        let date = new Date(value).toISOString();
  //        formData.append("expiry_date", date);
  //      }
  //      else if (key == "document_type_id") {

  //        formData.append("document_type_id", document_type_id);
  //      }
  //      else {
  //        formData.append(key, value);
  //        formData.append("supplier_id", supplierId);
  //        formData.append("FileUpload", this.fileToUploadLegalForm);
  //      }
  //    }


  //    this.SupplierListService.updateDocumentData((formData)).subscribe(data => {
  //      this.dataSaved = true;
  //      this.LoadAllLegalDocument();
  //      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
  //    });
  //  }


  //}

  dataExistDocument(document_type_name) {
    return this.documentDataSources.some(function (el) {
      return el.document_type_name === document_type_name;
    });
  }

  viewDocument(a, row) {

    //let supplier_document_id = row.supplier_document_id;
    //let supplierId = this.rowData.SupplierId;

    //this.SupplierListService.deleteDocumentInfo(supplier_document_id).subscribe(data => {
    //  if (data.MessageType == 1) {
    //    this.SupplierListService.getAllLegalDocument(supplierId).subscribe(data => {
    //      this.documentDataSources = data;
    //    });
    //  }
    //  this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    //});

  }

  removeDocument(a, row) {
    this.documentDataSources = this.documentDataSources.slice(0, a).concat(this.documentDataSources.slice(a + 1));
  }

  // Location submit

  //addLocationToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }
  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.locationApplicationForm.value;

  //  if (!(data.location_type_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Location Type")
  //  }
  //  if (!(data.supplier_location_name)) {
  //    return this.notifyService.ShowNotification(2, "Please input Location Name")
  //  }
  //  if (!(data.country_id_location)) {
  //    return this.notifyService.ShowNotification(2, "Please select Country")
  //  }
  //  if (!(data.division_id_location)) {
  //    return this.notifyService.ShowNotification(2, "Please select Division")
  //  }
  //  if (!(data.district_id_location)) {
  //    return this.notifyService.ShowNotification(2, "Please select District")
  //  }
  //  if (!(data.city)) {
  //    return this.notifyService.ShowNotification(2, "Please input City")
  //  }
  //  if (!(data.ps_area)) {
  //    return this.notifyService.ShowNotification(2, "Please input PS Area")
  //  }
  //  if (!(data.block)) {
  //    return this.notifyService.ShowNotification(2, "Please input Block")
  //  }
  //  if (!(data.road_no)) {
  //    return this.notifyService.ShowNotification(2, "Please input Road No")
  //  }
  //  if (!(data.house_no)) {
  //    return this.notifyService.ShowNotification(2, "Please input House No")
  //  }
  //  if (!(data.flat_no)) {
  //    return this.notifyService.ShowNotification(2, "Please input Flat No")
  //  }
  //  if (!(data.email)) {
  //    return this.notifyService.ShowNotification(2, "Please input Email")
  //  }
  //  if (!(data.mobile_no)) {
  //    return this.notifyService.ShowNotification(2, "Please input Mobile No")
  //  }

  //  else {


  //    let locationTypeObj = this.locationApplicationForm.get('location_type_id')?.value;
  //    let location_type_id = locationTypeObj.location_type_id;
  //    let location_type_name = locationTypeObj.location_type_name;


  //    let supplier_location_name = this.locationApplicationForm.get('supplier_location_name')?.value;

  //    let countryObj = this.locationApplicationForm.get('country_id_location')?.value;
  //    let country_id = countryObj.country_id;
  //    let country_name = countryObj.country_name;


  //    let divisionObj = this.locationApplicationForm.get('division_id_location')?.value;
  //    let division_id = divisionObj.division_id;
  //    let division_name = divisionObj.division_name;

  //    let districtObj = this.locationApplicationForm.get('district_id_location')?.value;
  //    let district_id = districtObj.district_id;
  //    let district_name = districtObj.district_name;

  //    let city = this.locationApplicationForm.get('city')?.value;
  //    let ps_area = this.locationApplicationForm.get('ps_area')?.value;
  //    let post_code = this.locationApplicationForm.get('post_code')?.value;
  //    let block = this.locationApplicationForm.get('block')?.value;
  //    let road_no = this.locationApplicationForm.get('road_no')?.value;
  //    let house_no = this.locationApplicationForm.get('house_no')?.value;
  //    let flat_no = this.locationApplicationForm.get('flat_no')?.value;
  //    let email = this.locationApplicationForm.get('email')?.value;
  //    let mobile_no = this.locationApplicationForm.get('mobile_no')?.value;
  //    let phone_no = this.locationApplicationForm.get('phone_no')?.value;
  //    let pabx = this.locationApplicationForm.get('pabx')?.value;


  //    if (this.dataExistLocation(supplier_location_name)) {
  //      return this.notifyService.ShowNotification(2, "Selected location name already added")
  //    }

  //    else {
  //      const locationSessionobj = {
  //        supplier_id: supplierId,
  //        location_type_id: location_type_id,
  //        location_type_name: location_type_name,
  //        supplier_location_name: supplier_location_name,
  //        country_id: country_id,
  //        country_name: country_name,
  //        division_id: division_id,
  //        division_name: division_name,
  //        district_id: district_id,
  //        district_name: district_name,
  //        city: city,
  //        ps_area: ps_area,
  //        post_code: post_code,
  //        block: block,
  //        road_no: road_no,
  //        house_no: house_no,
  //        flat_no: flat_no,
  //        email: email,
  //        mobile_no: mobile_no,
  //        phone_no: phone_no,
  //        pabx: pabx,
  //        Address: "city:" + city + " Area:" + ps_area + " Post Code:" + post_code + " Block:" + block + " Road No:" + road_no + "House No:" + house_no + " Flat_no:" + flat_no

  //      }
  //      this.locationDataSources.push(locationSessionobj);
  //    }
  //  }
  //}


  onLocationFormSubmit() {
    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}
    //const data = this.locationApplicationForm.value;
    //const locationData = this.locationApplicationForm.value;
    //locationData.locationSession = this.locationDataSources;
    //if (this.locationDataSources.length == 0) {
    //  return this.notifyService.ShowNotification(2, "Please select at least one Location")
    //}
    //else {
    //  locationData.supplier_id = this.rowData.SupplierId;
    //  this.SupplierListService.updateLocationData(locationData).subscribe(data => {
    //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //  });
    //}
  }

  dataExistLocation(location_type_name) {
    return this.locationDataSources.some(function (el) {
      return el.location_type_name === location_type_name;
    });
  }

  removeLocation(a, row) {
    this.locationDataSources = this.locationDataSources.slice(0, a).concat(this.locationDataSources.slice(a + 1));
  }

  //Warehouse

  //addWarehouseToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }
  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.warehouseApplicationForm.value;
  //  if (!(data.supplier_location_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Location")
  //  }
  //  if (!(data.supplier_warehouse_name)) {
  //    return this.notifyService.ShowNotification(2, "Please input Warehouse Name")
  //  }
  //  else {

  //    let locationObj = this.warehouseApplicationForm.get('supplier_location_id')?.value;
  //    let supplier_location_id = locationObj.supplier_location_id;
  //    let supplier_location_type_name = locationObj.supplier_location_type_name;
  //    let supplier_warehouse_name = this.warehouseApplicationForm.get('supplier_warehouse_name')?.value;
  //    let add_note = this.warehouseApplicationForm.get('add_note')?.value;

  //    if (this.dataExistWarehouse(supplier_location_id)) {
  //      return this.notifyService.ShowNotification(2, "Selected location already added")
  //    }
  //    else {
  //      const warehouseSessionobj = {
  //        supplier_id: supplierId,
  //        supplier_location_id: supplier_location_id,
  //        supplier_location_type_name: supplier_location_type_name,
  //        supplier_warehouse_name: supplier_warehouse_name,
  //        add_note: add_note
  //      }
  //      this.warehouseDataSources.push(warehouseSessionobj);
  //    }
  //  }
  //}

  dataExistWarehouse(supplier_location_id) {
    return this.warehouseDataSources.some(function (el) {
      return el.supplier_location_id === supplier_location_id;
    });
  }

  onWarehouseFormSubmit() {

    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}
    //let supplierId = this.rowData.SupplierId;

    //const warehouseData = this.warehouseApplicationForm.value;
    //warehouseData.warehouseSession = this.warehouseDataSources;
    //if (this.warehouseDataSources.length == 0) {
    //  return this.notifyService.ShowNotification(2, "Please select at least one Warehouse")
    //}
    //else {
    //  warehouseData.supplier_id = supplierId;
    //  this.SupplierListService.updateWarehouseData(warehouseData).subscribe(data => {
    //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //  });
    //}
  }

  viewWarehouse(a, row) {
    /* this.warehouseDataSources = this.warehouseDataSources.slice(0, a).concat(this.warehouseDataSources.slice(a + 1));*/
  }

  deleteLocation() {
    this.showDialog();
  }


  dataExistContact(contact_type_id) {
    return this.contactDataSources.some(function (el) {
      return el.contact_type_id === contact_type_id;
    });
  }

  onContactFormSubmit() {

    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let supplierId = this.rowData.SupplierId;

    const data = this.contactApplicationForm.value;

    if (!(data.contact_type_id)) {
      return this.notifyService.ShowNotification(2, "Please select Contact Type")
    }
    if (!(data.first_name)) {
      return this.notifyService.ShowNotification(2, "Please input First Name")
    }
    if (!(data.sur_name)) {
      return this.notifyService.ShowNotification(2, "Please input Sur Name")
    }
    if (!(data.designation_id)) {
      return this.notifyService.ShowNotification(2, "Please select Designation")
    }
    if (!(data.email)) {
      return this.notifyService.ShowNotification(2, "Please input Email Address")
    }
    if (!(data.mobile)) {
      return this.notifyService.ShowNotification(2, "Please input Mobile No")
    }

    if (!(data.nationality_id)) {
      return this.notifyService.ShowNotification(2, "Please select Nationality")
    }

    if (!(data.religion_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Religion")
    }

    if (!(data.gender_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Gender")
    }

    if (!(data.marital_status_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Marital Status")
    }
    if (!(data.nid_number)) {
      return this.notifyService.ShowNotification(2, "Please enter National Id")
    }

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
      else {
        formData.append(key, value);
        formData.append("supplier_id", supplierId);
        formData.append("FileUpload", this.fileToUploadNID);
      }
    } formData.append("contact_type_id", this.contactApplicationForm.value.contact_type_id);
    formData.append("designation_id", this.contactApplicationForm.value.designation_id);
    formData.append("nationality_id", this.contactApplicationForm.value.nationality_id);
    formData.append("religion_enum_id", this.contactApplicationForm.value.religion_enum_id);
    formData.append("gender_enum_id", this.contactApplicationForm.value.gender_enum_id);
    formData.append("marital_status_enum_id", this.contactApplicationForm.value.marital_status_enum_id);
    formData.append("blood_group_enum_id", this.contactApplicationForm.value.blood_group_enum_id);



    //var arr = [];
    //var object = {};
    //formData.forEach(function (value, key) {
    //  arr[key] = value;
    //  //fd.append(key, value);
    //});

    //var json = JSON.stringify(arr);
    //console.log(object)

    if (this.contactDataSources.length = 0) {
      return this.notifyService.ShowNotification(2, "Please add at least one Contact")
    }
    else {
      //formData.append("supplier_id", this.supplierApplicationIdUpdate);
      this.SupplierListService.updateContactData((formData)).subscribe(data => {
        this.loadAllSupplierContact();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
      });
    }
  }

  viewContact(a, row) {
    /*    this.warehouseDataSources = this.warehouseDataSources.slice(0, a).concat(this.warehouseDataSources.slice(a + 1));*/
  }

  //addContactLocationToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }
  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.ContactLocationApplicationForm.value;

  //  if (!(data.supplier_location_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Location")
  //  }
  //  if (!(data.supplier_contact_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Contact Person")
  //  }
  //  else {

  //    let supplierlocationObj = this.ContactLocationApplicationForm.get('supplier_location_id')?.value;
  //    let supplier_location_id = supplierlocationObj.supplier_location_id;
  //    let supplier_location_name = supplierlocationObj.supplier_location_name;

  //    let contactObj = this.ContactLocationApplicationForm.get('supplier_contact_id')?.value;
  //    let supplier_contact_id = contactObj.supplier_contact_id;
  //    let contact_person_name = contactObj.contact_person_name;

  //    let add_note = this.ContactLocationApplicationForm.get('add_note')?.value;

  //    if (this.dataExistContactLocation(supplier_contact_id)) {
  //      return this.notifyService.ShowNotification(2, "Selected location already added")
  //    }

  //    else {
  //      const contactLocationSessionobj = {
  //        supplier_id: supplierId,
  //        supplier_location_id: supplier_location_id,
  //        supplier_location_name: supplier_location_name,
  //        supplier_contact_id: supplier_contact_id,
  //        contact_person_name: contact_person_name,
  //        add_note: add_note

  //      }
  //      this.contactLocationDataSources.push(contactLocationSessionobj);
  //    }
  //  }
  //}

  dataExistContactLocation(supplier_contact_id) {
    return this.contactLocationDataSources.some(function (el) {
      return el.supplier_contact_id === supplier_contact_id;
    });
  }

  onContactLocationFormSubmit() {

    //if (this.rowData == null) {
    //  return this.notifyService.ShowNotification(3, 'Please select row');
    //}
    //let supplierId = this.rowData.SupplierId;


    //const contactLocationData = this.ContactLocationApplicationForm;
    //contactLocationData.contactLocationSession = this.contactLocationDataSources;
    //if (this.contactLocationDataSources.length == 0) {
    //  return this.notifyService.ShowNotification(2, "Please select at least one Location wise Contact")
    //}
    //else {
    //  contactLocationData.supplier_id = supplierId;

    //  console.log(contactLocationData)
    //  this.SupplierListService.updateContactLocationData(contactLocationData).subscribe(data => {
    //    this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
    //  });
    //}
  }

  removeContactLocation(a, row) {
    this.contactLocationDataSources = this.contactLocationDataSources.slice(0, a).concat(this.contactLocationDataSources.slice(a + 1));
  }

  //Financial Info

  //addSecurityDepositToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }

  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.financialApplicationForm.value;

  //  if (!(data.security_deposit_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Security Deposit")
  //  }
  //  if (!(data.security_amount)) {
  //    return this.notifyService.ShowNotification(2, "Please input Security Amount")
  //  }
  //  if (!(data.expiry_date)) {
  //    return this.notifyService.ShowNotification(2, "Please select expiry Date")
  //  }

  //  else {

  //    let securityDepositObj = this.financialApplicationForm.get('security_deposit_id')?.value;
  //    let security_deposit_id = securityDepositObj.security_deposit_id;
  //    let security_deposit_name = securityDepositObj.security_deposit_name;

  //    let security_amount = this.financialApplicationForm.get('security_amount')?.value;
  //    let expiry_date = this.financialApplicationForm.get('expiry_date')?.value;

  //    /*   let security_document_path = this.financialApplicationForm.get('SecurityFileUpload')?.value;*/


  //    if (this.dataExistSecurityDeposit(security_deposit_id)) {
  //      return this.notifyService.ShowNotification(2, "Selected Security Deposit already added")
  //    }

  //    else {
  //      const securityDepositSessionobj = {
  //        supplier_id: supplierId,
  //        security_deposit_id: security_deposit_id,
  //        security_deposit_name: security_deposit_name,
  //        security_amount: security_amount,
  //        expiry_date_str: this.formatDate(expiry_date),
  //        expiry_date: (expiry_date),
  //        /*   security_document_path: security_document_path,*/

  //      }
  //      this.SecurityDepositDataSources.push(securityDepositSessionobj);
  //    }

  //  }
  //}


  //onSecurityDepositFormSubmit() {


  //  let supplierId = this.rowData.SupplierId;
  //  const financialInfoData = this.financialApplicationForm.value;

  //  if (!(financialInfoData.currency_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Currency")
  //  }
  //  if (!(financialInfoData.credit_days)) {
  //    return this.notifyService.ShowNotification(2, "Please input Credit Days")
  //  }
  //  if (!(financialInfoData.credit_limit)) {
  //    return this.notifyService.ShowNotification(2, "Please select Credit Limit")
  //  }

  //  if ((this.SecurityDepositDataSources.length == 0)) {
  //    return this.notifyService.ShowNotification(2, "Please add at least one  Security Type")
  //  }

  //  else {
  //    financialInfoData.securityDepositSession = this.SecurityDepositDataSources;
  //    financialInfoData.supplier_id = supplierId;
  //    this.SupplierListService.updateSupplierCreditDepositApplication(financialInfoData).subscribe(data => {
  //      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
  //    });
  //  }
  //}

  dataExistSecurityDeposit(security_deposit_id) {
    return this.SecurityDepositDataSources.some(function (el) {
      return el.security_deposit_id === security_deposit_id;
    });
  }

  viewSecurityDeposit(a, row) {
    /*    this.SecurityDepositDataSources = this.SecurityDepositDataSources.slice(0, a).concat(this.SecurityDepositDataSources.slice(a + 1));*/
  }


  /// Mobile

  //addMobileBankingToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }

  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.mobileBankingApplicationForm.value;

  //  if (!(data.mfs_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select MFS Name")
  //  }
  //  if (!(data.account_number)) {
  //    return this.notifyService.ShowNotification(2, "Please input Account Number")
  //  }
  //  if (!(data.mfs_type_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select MFS Type")
  //  }


  //  else {

  //    let mfsObj = this.mobileBankingApplicationForm.get('mfs_id')?.value;
  //    let mfs_id = mfsObj.mfs_id;
  //    let mfs_name = mfsObj.mfs_name;

  //    let mfstypeObj = this.mobileBankingApplicationForm.get('mfs_type_id')?.value;
  //    let mfs_type_id = mfstypeObj.mfs_type_id;
  //    let mfs_type_name = mfstypeObj.mfs_type_name;

  //    let account_number = this.mobileBankingApplicationForm.get('account_number')?.value;

  //    if (this.dataExistMFS(mfs_id)) {
  //      return this.notifyService.ShowNotification(2, "Selected MFS already added")
  //    }

  //    else {
  //      const mfsSessionobj = {
  //        supplier_id: supplierId,
  //        mfs_id: mfs_id,
  //        mfs_name: mfs_name,
  //        mfs_type_id: mfs_type_id,
  //        mfs_type_name: mfs_type_name,
  //        account_number: account_number,

  //      }
  //      this.mobileBankingDataSources.push(mfsSessionobj);
  //    }

  //  }
  //}

  //onMobileBankingFormSubmit() {
  //  let supplierId = this.rowData.SupplierId;
  //  const mobileBankingData = this.mobileBankingApplicationForm.value;
  //  mobileBankingData.mobileBankingSession = this.mobileBankingDataSources;

  //  if (this.mobileBankingDataSources.length == 0) {
  //    return this.notifyService.ShowNotification(2, "Please add at least one Mobile Financial Service")
  //  }
  //  else {
  //    mobileBankingData.supplier_id = supplierId;
  //    this.SupplierListService.updateMobileBankingData(mobileBankingData).subscribe(data => {
  //      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
  //    });
  //  }
  //}

  dataExistMFS(mfs_id) {
    return this.mobileBankingDataSources.some(function (el) {
      return el.mfs_id === mfs_id;
    });
  }

  viewMFS(a, row) {
    /*    this.mobileBankingDataSources = this.mobileBankingDataSources.slice(0, a).concat(this.mobileBankingDataSources.slice(a + 1));*/
  }

  // Banking

  //addBankingToTable(a) {

  //  if (this.rowData == null) {
  //    return this.notifyService.ShowNotification(3, 'Please select row');
  //  }

  //  let supplierId = this.rowData.SupplierId;

  //  const data = this.bankingApplicationForm.value;

  //  if (!(data.bank_type_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Type")
  //  }
  //  if (!(data.bank_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Name")
  //  }
  //  if (!(data.bank_branch_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Branch")
  //  }
  //  if (!(data.account_name)) {
  //    return this.notifyService.ShowNotification(2, "Please input Account Name")
  //  }
  //  if (!(data.account_number)) {
  //    return this.notifyService.ShowNotification(2, "Please input Account Number")
  //  }


  //  else {

  //    let bankTypeObj = this.bankingApplicationForm.get('bank_type_id')?.value;
  //    let bank_type_id = bankTypeObj.bank_type_id;
  //    let bank_type_name = bankTypeObj.bank_type_name;

  //    let bankObj = this.bankingApplicationForm.get('bank_id')?.value;
  //    let bank_id = bankObj.bank_id;
  //    let bank_name = bankObj.bank_name;

  //    let bankBranchObj = this.bankingApplicationForm.get('bank_branch_id')?.value;
  //    let bank_branch_id = bankBranchObj.bank_branch_id;
  //    let bank_branch_name = bankBranchObj.bank_branch_name;

  //    let account_name = this.bankingApplicationForm.get('account_name')?.value;
  //    let account_number = this.bankingApplicationForm.get('account_number')?.value;
  //    let bank_branch_routing = this.bankingApplicationForm.get('bank_branch_routing')?.value;
  //    let bank_swift_code = this.bankingApplicationForm.get('bank_swift_code')?.value;
  //    let iban = this.bankingApplicationForm.get('iban')?.value;

  //    if (this.dataExistBankAccount(account_number)) {
  //      return this.notifyService.ShowNotification(2, "Selected Bank Account already added")
  //    }

  //    else {
  //      const bankAccountSessionobj = {
  //        supplier_id: supplierId,
  //        bank_type_id: bank_type_id,
  //        bank_type_name: bank_type_name,
  //        bank_id: bank_id,
  //        bank_name: bank_name,
  //        bank_branch_id: bank_branch_id,
  //        bank_branch_name: bank_branch_name,
  //        account_name: account_name,
  //        account_number: account_number,
  //        bank_branch_routing: bank_branch_routing,
  //        bank_swift_code: bank_swift_code,
  //        iban: iban
  //      }
  //      this.bankingDataSources.push(bankAccountSessionobj);
  //    }

  //  }
  //}

  //onBankingFormSubmit() {
  //  const bankingData = this.bankingApplicationForm.value;
  //  bankingData.bankAccountSession = this.bankingDataSources;

  //  let supplierId = this.rowData.SupplierId;

  //  if (this.bankingDataSources.length == 0) {
  //    return this.notifyService.ShowNotification(2, "Please add at least one Bank Account Information")
  //  }
  //  else {
  //    bankingData.supplier_id = supplierId;
  //    this.SupplierListService.UpdateBankAccountData(bankingData).subscribe(data => {
  //      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
  //    });
  //  }
  //}

  viewBankAccount(a, row) {
    /*   this.bankingDataSources = this.bankingDataSources.slice(0, a).concat(this.bankingDataSources.slice(a + 1));*/
  }

  dataExistBankAccount(account_number) {
    return this.bankingDataSources.some(function (el) {
      return el.account_number === account_number;
    });
  }



  // Products
  //addProductToTable(a) {
  //  const data = this.ProductApplicationForm.value;

  //  if (!(data.bank_type_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Type")
  //  }
  //  if (!(data.bank_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Name")
  //  }
  //  if (!(data.bank_branch_id)) {
  //    return this.notifyService.ShowNotification(2, "Please select Bank Branch")
  //  }
  //  if (!(data.account_name)) {
  //    return this.notifyService.ShowNotification(2, "Please input Account Name")
  //  }
  //  if (!(data.account_number)) {
  //    return this.notifyService.ShowNotification(2, "Please input Account Number")
  //  }


  //  else {

  //    let bankTypeObj = this.bankingApplicationForm.get('bank_type_id')?.value;
  //    let bank_type_id = bankTypeObj.bank_type_id;
  //    let bank_type_name = bankTypeObj.bank_type_name;

  //    let bankObj = this.bankingApplicationForm.get('bank_id')?.value;
  //    let bank_id = bankObj.bank_id;
  //    let bank_name = bankObj.bank_name;

  //    let bankBranchObj = this.bankingApplicationForm.get('bank_branch_id')?.value;
  //    let bank_branch_id = bankBranchObj.bank_branch_id;
  //    let bank_branch_name = bankBranchObj.bank_branch_name;

  //    let account_name = this.bankingApplicationForm.get('account_name')?.value;
  //    let account_number = this.bankingApplicationForm.get('account_number')?.value;
  //    let routing = this.bankingApplicationForm.get('routing')?.value;
  //    let swift_code = this.bankingApplicationForm.get('swift_code')?.value;
  //    let iban = this.bankingApplicationForm.get('iban')?.value;

  //    let supplierId = this.supplier_id;

  //    if (this.dataExistProducts(account_number)) {
  //      return this.notifyService.ShowNotification(2, "Selected Bank Account already added")
  //    }

  //    else {
  //      const bankAccountSessionobj = {
  //        supplier_id: supplierId,
  //        bank_type_id: bank_type_id,
  //        bank_type_name: bank_type_name,
  //        bank_id: bank_id,
  //        bank_name: bank_name,
  //        bank_branch_id: bank_branch_id,
  //        bank_branch_name: bank_branch_name,
  //        account_name: account_name,
  //        account_number: account_number,
  //        routing: routing,
  //        swift_code: swift_code,
  //        iban: iban
  //      }
  //      this.bankingDataSources.push(bankAccountSessionobj);
  //    }

  //  }
  //}

  //onProductFormSubmit() {
  //  const bankingData = this.bankingApplicationForm.value;
  //  bankingData.bankAccountSession = this.bankingDataSources;


  //  if (this.bankingDataSources.length == 0) {
  //    return this.notifyService.ShowNotification(2, "Please add at least one Bank Account Information")
  //  }
  //  else {
  //    bankingData.supplier_id = this.supplier_id;
  //    this.SupplierListService.UpdateBankAccountData(bankingData).subscribe(data => {
  //      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
  //    });
  //  }
  //}

  //dataExistProducts(item_code) {
  //  return this.productDataSources.some(function (el) {
  //    return el.item_code === item_code;
  //  });
  //}

  //removeproduct(a, row) {
  //  this.productDataSources = this.productDataSources.slice(0, a).concat(this.productDataSources.slice(a + 1));
  //}




  deleteContact() {
    this.showDialog();
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
        this.supplierImage.nativeElement.innerText = file.name;
        this.supplierApplicationForm.patchValue({
          ImageUpload: file,
        });
      }
    }
  }

  //handleLegalFormFileInput(files: FileList) {
  //  this.fileToUploadLegalForm = files.item(0);
  //}

  handleNIDFileInput(files: FileList) {
    this.fileToUploadNID = files.item(0);
  }

  handleSecurityFileInput(files: FileList) {
    this.fileToUploadSecurity = files.item(0);
  }

  onFormApprove() {


    let supplierId = this.supplierId;
    if (this.supplierId == null) {
      return this.notifyService.ShowNotification(3, 'Please click view on specific supplier');
    }
    const approveFeedbackData = this.feedbackApplicationForm.value;
    approveFeedbackData.supplier_id = supplierId;
    this.SupplierListService.approveSupplier(approveFeedbackData).subscribe(data => {
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
      this.loadAllConfirmSupplierinfos();
    });
  }

  onFormReject() {
    let supplierId = this.supplierId;
    if (this.supplierId == null) {
      return this.notifyService.ShowNotification(3, 'Please click view on specific supplier');
    }
    const rejectFeedbackData = this.feedbackApplicationForm.value;
    rejectFeedbackData.supplier_id = supplierId;
    this.SupplierListService.rejectSupplier(rejectFeedbackData).subscribe(data => {
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
      this.loadAllConfirmSupplierinfos();
    });
  }



  //onSelectFile(event) {
  //  if (event.target.files) {
  //    var reader = new FileReader()
  //    reader.readAsDataURL(event.target.files[0])
  //    reader.onload = (event: any) => {
  //      this.fileurllink = event.target.result
  //    }
  //    alert(this.fileurllink)
  //    if (event.target.files.length > 0) {
  //      const file = event.target.files[0].name;
  //      this.supplierImage.nativeElement.innerText = file.name;
  //      this.contactApplicationForm.patchValue({
  //        FileUpload: file,
  //      });
  //    }
  //  }
  //}

  //onSelectSecurityFile(event) {
  //  if (event.target.files) {
  //    var reader = new FileReader()
  //    reader.readAsDataURL(event.target.files[0])
  //    reader.onload = (event: any) => {
  //      this.securityfileurllink = event.target.result
  //    }
  //    alert(this.securityfileurllink)
  //    if (event.target.files.length > 0) {
  //      const file = event.target.files[0].name;
  //      this.supplierImage.nativeElement.innerText = file.name;
  //      this.financialApplicationForm.patchValue({
  //        SecurityFileUpload: file,
  //      });
  //    }
  //  }
  //}


}






