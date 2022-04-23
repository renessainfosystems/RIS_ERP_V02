using Auth.DataAccess.Procurement;
using Auth.Model.Procurement.Model;
using System.Threading.Tasks;





namespace Auth.Repository.Procurement
{
    public class SupplierApplicationRepository : ISupplierApplicationRepository
    {
        protected SupplierApplicationDataAccess _supplierApplicationdataAccess { get; set; }

        
        //Data access initialize
        public SupplierApplicationRepository(SupplierApplicationDataAccess supplierApplicationDataAccess)
        {
            _supplierApplicationdataAccess = supplierApplicationDataAccess;
        }
        public async Task<dynamic> GetSupplierById()
        {
            return await _supplierApplicationdataAccess.GetSupplierByIdAsync();
        }
        public async Task<dynamic> GetSupplierBasicInfoBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetSupplierBasicInfoBySupplierIdAsync(supplier_id);
        }

        public async Task<dynamic> GetAllSupplierInfo()
        {
            return await _supplierApplicationdataAccess.GetAllSupplierInfo();
        }

        public async Task<dynamic> GetAllConfirmSupplierInfo()
        {
            return await _supplierApplicationdataAccess.GetAllConfirmSupplierInfo();
        }

        public async Task<dynamic> IUDSupplierApplication(SupplierApplication supplierApplication, int dbOperation)
        {
            
            return await _supplierApplicationdataAccess.IUDSupplierApplication(supplierApplication, dbOperation);
        }

        //Business
        public async Task<dynamic> IUDSupplierBusinessData(SupplierBusiness supplierBusiness, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDSupplierBusinessData(supplierBusiness, dbOperation);
        }

        public async Task<dynamic> GetBusinessDataBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetBusinessDataBySupplierId(supplier_id);
        }

        public async Task<dynamic> GetBusinessSubSectorBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetBusinessSubSectorBySupplierId(supplier_id);
        }

        public async Task<dynamic> GetBusinessEcommerceBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetBusinessEcommerceBySupplierId(supplier_id);
        }

       

        //Association
        public async Task<dynamic> IUDSupplierAssociationData(SupplierAssociation supplierAssociation, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDSupplierAssociationData(supplierAssociation, dbOperation);
        }


        public async Task<dynamic> GetAssociationBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetAssociationBySupplierId(supplier_id);
        }

        //Document
        public async Task<dynamic> IUDSupplierDocumentData(SupplierDocument supplierDocument, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDSupplierDocumentData(supplierDocument, dbOperation);
        }

        public async Task<dynamic> GetLegalDocumentBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetLegalDocumentBySupplierId(supplier_id);
        }

        //Location

        public async Task<dynamic> IUDSupplierLocationData(SupplierLocation supplierLocation, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDSupplierLocationData(supplierLocation, dbOperation);
        }

        public async Task<dynamic> GetLocationBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetLocationBySupplierId(supplier_id);
        }

        public async Task<dynamic> IUDSupplierWarehouseData(SupplierWarehouse supplierWarehouse, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDSupplierWarehouseData(supplierWarehouse, dbOperation);
        }

        public async Task<dynamic> GetWarehouseBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetWarehouseBySupplierId(supplier_id);
        }

        public async Task<dynamic> getAllWarehouseByLocationId(int location_id)
        {
            return await _supplierApplicationdataAccess.getAllWarehouseByLocationId(location_id);
        }

        //Contact

        public async Task<dynamic> UpdateContactData(SupplierContact supplierContact, int dbOperation)
        {
            return await _supplierApplicationdataAccess.UpdateContactData(supplierContact, dbOperation);
        }

        public async Task<dynamic> UpdateContactLocationData(SupplierLocationContact supplierLocationContact, int dbOperation)
        {
            return await _supplierApplicationdataAccess.UpdateContactLocationData(supplierLocationContact, dbOperation);
        }


        public async Task<dynamic> GetContactBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetContactBySupplierId(supplier_id);
        }

        public async Task<dynamic> GetLocationWiseContactBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetLocationWiseContactBySupplierId(supplier_id);
        }

        //Financial Info

        public async Task<dynamic> IUDMobileBankingData(SupplierMobileFinancialService supplierMobileFinancialService, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDMobileBankingData(supplierMobileFinancialService, dbOperation);
        }

        public async Task<dynamic> IUDBankAccountData(SupplierBankAccount supplierBankAccount, int dbOperation)
        {
            return await _supplierApplicationdataAccess.IUDBankAccountData(supplierBankAccount, dbOperation);
        }

        public async Task<dynamic> UpdateCreditDepositData(SupplierCreditDeposit supplierCreditDeposit, int dbOperation)
        {
            return await _supplierApplicationdataAccess.UpdateCreditDepositData(supplierCreditDeposit, dbOperation);
        }

        public async Task<dynamic> GetAllMFSBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetAllMFSBySupplierId(supplier_id);
        }

        public async Task<dynamic> GetAllBankAccountBySupplierId(int supplier_id)
        {
            return await _supplierApplicationdataAccess.GetAllBankAccountBySupplierId(supplier_id);
        }

        public async Task<dynamic> getAllSupplierCreditDeposit(int supplier_id)
        {
            return await _supplierApplicationdataAccess.getAllSupplierCreditDeposit(supplier_id);
        }

        public async Task<dynamic> getAllSupplierCreditHistory(int supplier_id)
        {
            return await _supplierApplicationdataAccess.getAllSupplierCreditHistory(supplier_id);
        }

        public async Task<dynamic> getAllBankCboListByBankTypeId(int bank_type_id)
        {
            return await _supplierApplicationdataAccess.getAllBankCboListByBankTypeId(bank_type_id);
        }

        // Assessment
        public async Task<dynamic> getAllSupplierMasterAssessmentCriteria(int supplier_id)
        {
            return await _supplierApplicationdataAccess.getAllSupplierMasterAssessmentCriteria(supplier_id);
        }


        // Approver & Reject

        public async Task<dynamic> ApproveSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation)
        {
            return await _supplierApplicationdataAccess.ApproveSupplier(supplierInfoFeedbackDetail, dbOperation);
        }

        public async Task<dynamic> RejectSupplier(SupplierInfoFeedbackDetail supplierInfoFeedbackDetail, int dbOperation)
        {
            return await _supplierApplicationdataAccess.RejectSupplier(supplierInfoFeedbackDetail, dbOperation);
        }

    }
}
