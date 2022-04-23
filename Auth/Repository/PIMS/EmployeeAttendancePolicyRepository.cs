using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeAttendancePolicyRepository : IEmployeeAttendancePolicyRepository
    {
        protected EmployeeAttendancePolicyDataAccess _DataAccess { get; set; }

        //Data access initialize
        public EmployeeAttendancePolicyRepository(EmployeeAttendancePolicyDataAccess oEmployeeAttendancePolicyDataAccess)
        {
            _DataAccess = oEmployeeAttendancePolicyDataAccess;
        }

        public async Task<dynamic> IUD(EmployeeAttendancePolicy oEmployeeAttendancePolicy)
        {
            return await _DataAccess.IUD(oEmployeeAttendancePolicy);
        }

        public async Task<dynamic> Get(long nEmployee_id)
        {
            return await _DataAccess.Get(nEmployee_id);
        }
    }
}
