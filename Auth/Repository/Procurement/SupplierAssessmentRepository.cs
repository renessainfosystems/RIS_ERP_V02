using Auth.DataAccess.Procurement;
using Auth.Model.Procurement.Model;
using System.Threading.Tasks;



namespace Auth.Repository.Procurement
{
    public class SupplierAssessmentRepository : ISupplierAssessmentRepository
    {
        protected SupplierAssessmentDataAccess _supplierAssessmentdataAccess { get; set; }

        
        //Data access initialize
        public SupplierAssessmentRepository(SupplierAssessmentDataAccess supplierAssessmentDataAccess)
        {
            _supplierAssessmentdataAccess = supplierAssessmentDataAccess;
        }

        //Assessment
        public async Task<dynamic> IUDSupplierAssessment(SupplierAssessment supplierAssessment, int dbOperation)
        {
            return await _supplierAssessmentdataAccess.IUDSupplierAssessment(supplierAssessment, dbOperation);
        }

    }
}
