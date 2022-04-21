using Auth.Model.DomainModel;
using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Repository.PIMS
{
    public interface IEmployeeOfficialRepository
    {
        Task<dynamic> IUD(EmployeeOfficial oEmployeeOfficial, int dbOperation);
        Task<dynamic> Get(long Employee_id);
    }
}
