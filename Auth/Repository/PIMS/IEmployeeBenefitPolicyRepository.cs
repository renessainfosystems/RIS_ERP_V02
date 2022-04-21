using Auth.Model.DomainModel;
using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Repository.PIMS
{
    public interface IEmployeeBenefitPolicyRepository
    {
        Task<dynamic> Gets(long nEmployee_id);
    }
}
