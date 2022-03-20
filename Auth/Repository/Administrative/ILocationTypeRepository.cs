using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ILocationTypeRepository
    {
        IEnumerable<LocationType> GetAllLocationType();
        IEnumerable<object> LocationTypeCboList();
    }
}
