import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const httpOptionsForFileUpload = {
    headers: headers
};

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class SupplierAssessmentService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    createSupplierAssessment(supplierAssessment: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierAssessment/Create', supplierAssessment, httpOptions);
    }

    updateSupplierAssessment(supplierAssessment: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierAssessment/Update', supplierAssessment, httpOptions);
    }


    getAllSupplierMasterAssessmentCriteria(supplier_id: Number): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/getAllSupplierMasterAssessmentCriteria?supplier_id=' + supplier_id, httpOptions);
    }


    approveSupplier(approveFeedbackData: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/ApproveSupplier', approveFeedbackData, httpOptions);
    }

    rejectSupplier(rejectFeedbackData: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/RejectSupplier', rejectFeedbackData, httpOptions);
    }

    getAllConfirmSupplierInfo(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'SupplierApplication/GetAllConfirmSupplierInfo', httpOptions);
    }

    getSupplierId(): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'SupplierApplication/GetSupplierId', httpOptions);
    }

    getSupplierBasicInfo(supplier_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'SupplierApplication/GetSupplierBasicInfoBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierInfo(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'SupplierApplication/GetAllSupplierInfo', httpOptions);
    }

    createSupplierApplication(supplierApplication: FormData): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/Create', supplierApplication, httpOptionsForFileUpload);
    }


    updateSupplierApplication(supplierApplication: FormData): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/Update', supplierApplication, httpOptionsForFileUpload);
    }

    DeleteSupplierApplication(supplier_id: any): Observable<any> {
        console.log(supplier_id)
        return this.http.post(this.ipconfig.base_IP + 'SupplierApplication/Delete', { supplier_id }, httpOptions);
    }

    SubmitSupplierInfoData(supplier_id: any): Observable<any> {
        console.log(supplier_id)
        return this.http.post(this.ipconfig.base_IP + 'SupplierApplication/Submit', { supplier_id }, httpOptions);
    }

    getAllDomicileEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumProcurement/DomicileEnum');
    }

    getAllRegistryAuthorityCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'RegistryAuthority/RegistryAuthorityCboList', httpOptions);
    }

    getAllRegulatorCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Regulator/RegulatorCboList', httpOptions);
    }

    getAllOwnershipTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'OwnershipType/OwnershipTypeCboList', httpOptions);
    }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList', httpOptions);
    }

    getAllDivisionCboListByCountryId(country_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
    }

    getAllDistrictCboListByDivisionId(division_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
    }

    getAllThanaCboListByDistrictId(district_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Thana/ThanaCboListByDistrictId?district_id=' + district_id, httpOptions);
    }

    getAllZone(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Zone/ZoneCboList');
    }


    //Business

    getAllBusinessActivitiesEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumProcurement/BusinessActivitiesEnum');
    }

    getAllIndustrySectorCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'IndustrySector/IndustrySectorCboList', httpOptions);
    }

    getAllIndustrySubSectorCboList(sector_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'IndustrySubSector/IndustrySubSectorCboListBySectorId?sector_id=' + sector_id, httpOptions);
    }

    getAllEcommerceList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'EcommercePlatform/EcommercePlatformCboList');
    }

    updateBusinessData(supplierBusiness: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateBusinessData', supplierBusiness, httpOptions);
    }

    getAllSupplierBusiness(supplier_id: Number): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetBusinessDataBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }


    getAllSupplierBusinessSubSector(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetBusinessSubSectorBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierBusinessEcommerce(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetBusinessEcommerceBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }



    //Association

    getAllAssociationCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Association/AssociationCboList', httpOptions);
    }

    getAllDataByAssociationId(association_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'Association/GetById?association_id=' + association_id, httpOptions);
    }

    GetByCountryId(country_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'Country/GetById?country_id=' + country_id, httpOptions);
    }

    getAllMembershipEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumProcurement/MembershipTypeEnum');
    }

    getAllOrganizationTypeEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumProcurement/OrganizationTypeEnum');
    }

    updateAssociationData(supplierAssociation: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateAssociationData', supplierAssociation, httpOptions);
    }

    getAllSupplierAssociation(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetAssociationBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    deleteAssociationInfo(supplier_association_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteAssociationBySupplierAssociationId', { supplier_association_id }, httpOptions);
    }


    //Legal Document
    getAllDocumentCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'DocumentType/DocumentTypeCboList', httpOptions);
    }

    updateDocumentData(supplierDocument: FormData): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateDocumentData', supplierDocument, httpOptionsForFileUpload);
    }

    deleteDocumentInfo(supplier_document_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteDocumentBySupplierDocumentId', { supplier_document_id }, httpOptions);
    }

    getAllLegalDocument(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetLegalDocumentBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    //Location

    getAllLocationTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'LocationType/LocationTypeCboList', httpOptions);
    }

    updateLocationData(supplierLocation: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateLocationData', supplierLocation, httpOptions);
    }

    deleteLocationInfo(supplier_location_id: any): Observable<any> {
        debugger
        console.log(supplier_location_id)
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteLocationBySupplierLocationId', { supplier_location_id }, httpOptions);
    }



    getAllSupplierLocation(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetLocationBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    //Warehouse

    updateWarehouseData(supplierWarehouse: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateWarehouseData', supplierWarehouse, httpOptions);
    }

    deleteWarehouseInfo(supplier_warehouse_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteWarehouseBySupplierWarehouseId', { supplier_warehouse_id }, httpOptions);
    }

    getAllSupplierWarehouse(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetWarehouseBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }


    //Contact
    getAllContactTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'ContactType/ContactTypeCboList', httpOptions);
    }

    getAllDesignationCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Designation/DesignationCboList', httpOptions);
    }

    getGenderCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeGenderEnum', httpOptions);
    }

    getReligionCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeReligionEnum');
    }

    getBloodGroupCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeBloodGroupEnum', httpOptions);
    }

    getMaritalStatusCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/MaritalStatusEnum', httpOptions);
    }

    getAllWarehouseByLocationId(location_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/getAllWarehouseByLocationId?supplier_id=' + location_id, httpOptions);
    }

    updateContactData(supplierContact: FormData): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateContactData', supplierContact, httpOptionsForFileUpload);
    }

    getAllSupplierContact(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetContactBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierLocationWiseContact(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetLocationWiseContactBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }


    updateContactLocationData(supplierContactLocation: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateContactLocationData', supplierContactLocation, httpOptions);
    }

    deleteContactInfo(supplier_contact_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteContactInfoBySupplierContactId', { supplier_contact_id }, httpOptions);
    }

    deleteLocationWiseContactInfo(supplier_contact_location_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteLocationWiseContactBySupplierContactLocationId', { supplier_contact_location_id }, httpOptions);
    }


    //Financial Info

    getAllCurrencyCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Currency/CurrencyCboList', httpOptions);
    }

    getAllSecurityTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'SecurityDeposit/SecurityDepositCboList', httpOptions);
    }

    getAllPaymentFrequencyCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'AdministrativeDBEnum/PaymentFrequencyCboList', httpOptions);
    }


    getAllMfsCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Mfs/MfsCboList', httpOptions);
    }

    getAllMfsTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'AdministrativeDBEnum/MFSTypeCboList', httpOptions);
    }

    getAllBankTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'AdministrativeDBEnum/BankTypeCboList', httpOptions);
    }


    getAllBankCboListByBankTypeId(bank_type_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'SupplierApplication/getAllBankCboListByBankTypeId?bank_type_id=' + bank_type_id, httpOptions);
    }

    getAllBankBranchCboListByBankId(bank_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'BankBranch/GetAllBankBranchByBankId?bank_id=' + bank_id, httpOptions);
    }


    GetBankById(bank_id: Number): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'Bank/GetBankById?bank_id=' + bank_id, httpOptions);
    }


    GetAllBankBranchByBankBranchId(bank_branch_id: Number): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'BankBranch/GetAllBankBranchByBankBranchId?bank_branch_id=' + bank_branch_id, httpOptions);
    }



    updateSupplierCreditDepositApplication(supplierCreditDeposit: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateCreditDepositData', supplierCreditDeposit, httpOptions);
    }

    updateMobileBankingData(supplierMobileBanking: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateMobileBankingData', supplierMobileBanking, httpOptions);
    }

    deleteMFSAccount(supplier_mobile_bank_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteMFSAccountBySupplierMFSAccountId', { supplier_mobile_bank_id }, httpOptions);
    }

    UpdateBankAccountData(supplierBanking: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/UpdateBankAccountData', supplierBanking, httpOptions);
    }

    deleteBankAccount(supplier_bank_account_id: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'SupplierApplication/DeleteBankAccountBySupplierBankAccountId', { supplier_bank_account_id }, httpOptions);
    }

    getAllSupplierMFS(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetAllMFSBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierBankAccount(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/GetAllBankAccountBySupplierId?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierCreditDeposit(supplier_id): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/getAllSupplierCreditDeposit?supplier_id=' + supplier_id, httpOptions);
    }

    getAllSupplierCreditHistory(supplier_id: Number): Observable<any> {
        return this.http.get<any>(this.ipconfig.base_IP + 'SupplierApplication/getAllSupplierCreditHistory?supplier_id=' + supplier_id, httpOptions);
    }

}
