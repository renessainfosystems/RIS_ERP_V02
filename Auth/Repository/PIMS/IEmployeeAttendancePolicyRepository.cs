using Auth.Model.DomainModel;
using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Repository.PIMS
{
    public interface IEmployeeAttendancePolicyRepository
    {
        Task<dynamic> Get(long nEmployee_id);
        Task<dynamic> IUD(EmployeeAttendancePolicy oEmployeeAttendancePolicy);
    }
}
