using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeBenefitPolicyRepository : IEmployeeBenefitPolicyRepository
    {
        protected EmployeeBenefitPolicyDataAccess _DataAccess { get; set; }

        //Data access initialize
        public EmployeeBenefitPolicyRepository(EmployeeBenefitPolicyDataAccess oEmployeeBenefitPolicyDataAccess)
        {
            _DataAccess = oEmployeeBenefitPolicyDataAccess;
        }

        public async Task<dynamic> Gets(long nEmployee_id)
        {
            return await _DataAccess.Gets(nEmployee_id);
        }
    }
}
