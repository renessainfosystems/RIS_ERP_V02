
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDepartmentTypeConfigRepository
    {
        void Add(DepartmentTypeConfig oDepartmentTypeConfig);
        void Update(DepartmentTypeConfig oDepartmentTypeConfig);
        IEnumerable<DepartmentTypeConfig> GetAllDepartmentTypeConfig();
        DepartmentTypeConfig GetById(int department_type_config_id);
        IEnumerable<object> DepartmentTypeConfigCboList();
        void Delete(int department_type_config_id);

    }
}
