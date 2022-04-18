using Auth.Model.DomainModel;
using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Repository.PIMS
{
    public interface IEmployeeOfficialRepository
    {
        Task<dynamic> IUD_EmployeeOfficial(EmployeeOfficial oEmployeeOfficial, int dbOperation);
        Task<dynamic> GetEmployeeOfficialById(long Employee_id);
    }
}
