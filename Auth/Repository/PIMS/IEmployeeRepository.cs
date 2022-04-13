using Auth.Model.DomainModel;
using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Auth.Repository.PIMS
{
    public interface IEmployeeRepository
    {
        Task<dynamic> GetAllEmployee();
        Task<dynamic> GetAllActiveEmployee();
        Task<dynamic> GetEmployeeById(long Employee_id);
        Task<dynamic> GetEmployeeCboList();
        Task<dynamic> EmployeeActivity(long Employee_id);
        Task<dynamic> IUD_Employee(Employee Employee, int dbOperation);

    }
}
