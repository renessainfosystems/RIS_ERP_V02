using Auth.Model.PIMS.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.PIMS
{
    public interface IEmployeeCategoryTypeRepository
    {
        Task<dynamic> IUD_EmployeeCategoryType(EmployeeCategoryType oEmployeeCategoryType, int dbOperation);
        IEnumerable<EmployeeCategoryType> GetAllEmployeeCategoryType();

        EmployeeCategoryType GetById(int employee_category_type_id);
        IEnumerable<object> EmployeeCategoryTypeCboList();
        void Delete(int association_id);
    }
}
