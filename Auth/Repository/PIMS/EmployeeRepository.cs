using Auth.DataAccess.PIMS;
using Auth.Model.PIMS.Model;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public class EmployeeRepository:IEmployeeRepository
    {
        protected EmployeeDataAccess _EmployeeDataAccess { get; set; }

        //Data access initialize
        public EmployeeRepository(EmployeeDataAccess EmployeeDataAccess)
        {
            _EmployeeDataAccess = EmployeeDataAccess;
        }
        public async Task<dynamic> GetAllEmployee()
        {
            return await _EmployeeDataAccess.GetAllEmployee();
        }
        public async Task<dynamic> GetAllActiveEmployee()
        {
            return await _EmployeeDataAccess.GetAllActiveEmployee();
        }
        public async Task<dynamic> GetEmployeeById(long Employee_id)
        {
            return await _EmployeeDataAccess.GetEmployeeById(Employee_id);
        }
        public async Task<dynamic> IUD_Employee(Employee Employee,int dbOperation)
        {
            return await _EmployeeDataAccess.IUD_Employee(Employee,dbOperation);
        }        

        public async Task<dynamic> EmployeeActivity(long Employee_id)
        {
            return await _EmployeeDataAccess.EmployeeActivity(Employee_id);
        }
    }
}
