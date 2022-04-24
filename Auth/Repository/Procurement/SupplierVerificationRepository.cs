using Auth.DataAccess.Procurement;
using Auth.Model.Procurement.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Procurement
{
    public class SupplierVerificationRepository:ISupplierVerificationRepository
    {
        protected SupplierVerificationDataAccess _supplierVarificationDataAccess { get; set; }

        //Data access initialize
        public SupplierVerificationRepository(SupplierVerificationDataAccess supplierInfoDataAccess)
        {
            _supplierVarificationDataAccess = supplierInfoDataAccess;
        }

        public async Task<dynamic> GetAllSupplierVerification()
        {
            return await _supplierVarificationDataAccess.GetAllSupplierVerification();
        }
        public async Task<dynamic> GetSupplierVerificationById(int supplier_verification_id)
        {
            return await _supplierVarificationDataAccess.GetSupplierVerificationById(supplier_verification_id);
        }

        public async Task<dynamic> GetSupplierVerificationBySupplierId(int supplier_id)
        {
            return await _supplierVarificationDataAccess.GetSupplierVerificationBySupplierId(supplier_id);
        }
        public async Task<dynamic> IUD_SupplierVerification(SupplierVerification supplierVarification, int dbOperation)
        {
            return await _supplierVarificationDataAccess.IUD_SupplierVerification(supplierVarification, dbOperation);
        }
    }
}
