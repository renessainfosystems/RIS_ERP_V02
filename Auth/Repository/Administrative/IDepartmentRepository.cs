
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDepartmentRepository
    {
        void Add(Department oDepartment);
        void Update(Department oDepartment);
        IEnumerable<Department> GetAllDepartment();
        Department GetById(int department_id);
        IEnumerable<object> DepartmentCboList();
        void Delete(int department_id);
        IEnumerable<dynamic> GetByIdRawSql(string sqlquery);

    }
}
