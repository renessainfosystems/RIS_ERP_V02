using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IContactTypeRepository
    {
        IEnumerable<ContactType> GetAllContactType();
        IEnumerable<object> ContactTypeCboList();
    }
}
