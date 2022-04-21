using Auth.Model.Procurement.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Procurement
{
    public interface ISupplierAssessmentRepository
    {
        Task<dynamic> IUDSupplierAssessment(SupplierAssessment supplierAssessment, int dbOperation);

    }
}
