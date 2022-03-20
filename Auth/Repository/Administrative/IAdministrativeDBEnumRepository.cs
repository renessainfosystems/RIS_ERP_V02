using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IAdministrativeDBEnumRepository
    {
        IEnumerable<object> MFSTypeCboList();

        IEnumerable<object> BankTypeCboList();
        IEnumerable<object> DepartmentTypeCboList();
        IEnumerable<object> DepartmentTypeCboListByFunctionality(string type);
    }
}
