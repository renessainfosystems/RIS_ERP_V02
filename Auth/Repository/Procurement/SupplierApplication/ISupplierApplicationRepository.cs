using Auth.Model.Procurement.Model;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Auth.Service
{
    public interface ISupplierApplicationRepository
    {
        Task<dynamic> GetSupplierById();
        //Task<dynamic> GetSupplierBySupplierId(int supplier_id);
        Task<dynamic> GetSupplierBasicInfoBySupplierId(int supplier_id);
        Task<dynamic> GetAllSupplierInfo();
        Task<dynamic> GetAllConfirmSupplierInfo();

        Task<dynamic> IUDSupplierApplication(SupplierApplication supplierApplication, int dbOperation);

        //Business
        Task<dynamic> IUDSupplierBusinessData(SupplierBusiness supplierBusiness, int dbOperation);
        Task<dynamic> GetBusinessDataBySupplierId(int supplier_id);
        Task<dynamic> GetBusinessSubSectorBySupplierId(int supplier_id);
        Task<dynamic> GetBusinessEcommerceBySupplierId(int supplier_id);


        //Association
        Task<dynamic> IUDSupplierAssociationData(SupplierAssociation supplierAssociation, int dbOperation);
        Task<dynamic> GetAssociationBySupplierId(int supplier_id);

        //Document
        Task<dynamic> IUDSupplierDocumentData(SupplierDocument supplierDocument, int dbOperation);
        Task<dynamic> GetLegalDocumentBySupplierId(int supplier_id);

        //Location
        Task<dynamic> IUDSupplierLocationData(SupplierLocation supplierLocation, int dbOperation);
        Task<dynamic> GetLocationBySupplierId(int supplier_id);
        Task<dynamic> IUDSupplierWarehouseData(SupplierWarehouse supplierWarehouse, int dbOperation);
        Task<dynamic> GetWarehouseBySupplierId(int supplier_id);
        Task<dynamic> getAllWarehouseByLocationId(int location_id);

        //Contact
        Task<dynamic> UpdateContactData(SupplierContact supplierContact, int dbOperation);

        Task<dynamic> UpdateContactLocationData(SupplierLocationContact supplierLocationContact, int dbOperation);
        Task<dynamic> GetContactBySupplierId(int supplier_id);

        Task<dynamic> GetLocationWiseContactBySupplierId(int supplier_id);


        //Financial onfo

        Task<dynamic> IUDMobileBankingData(SupplierMobileFinancialService supplierFinancialInfo, int dbOperation);

        Task<dynamic> IUDBankAccountData(SupplierBankAccount supplierBankAccount, int dbOperation);

        Task<dynamic> UpdateCreditDepositData(SupplierCreditDeposit supplierCreditDeposit, int dbOperation);

        Task<dynamic> GetAllMFSBySupplierId(int supplier_id);
        Task<dynamic> GetAllBankAccountBySupplierId(int supplier_id);

        Task<dynamic> getAllSupplierCreditDeposit(int supplier_id);

        Task<dynamic> getAllSupplierCreditHistory(int supplier_id);

        // Get Bank By Bank Type ID
        Task<dynamic> getAllBankCboListByBankTypeId(int supplier_id);


        // Assessment
        Task<dynamic> getAllSupplierMasterAssessmentCriteria(int supplier_id);

        // Approver & Reject

        Task<dynamic> ApproveSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation);

        Task<dynamic> RejectSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation);


    }
}
