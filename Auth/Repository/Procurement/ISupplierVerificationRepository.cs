using Auth.Model.Procurement.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Procurement
{
    public interface ISupplierVerificationRepository
    {
        Task<dynamic> GetAllSupplierVerification();
        Task<dynamic> GetSupplierVerificationById(int supplier_verification_id);
        Task<dynamic> GetSupplierVerificationBySupplierId(int supplier_id);
        Task<dynamic> IUD_SupplierVerification(SupplierVerification supplierVarification, int dbOperation);

    }
}
