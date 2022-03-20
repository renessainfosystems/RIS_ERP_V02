
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDivisionRepository
    {
        void Add(Division oDivision);
        void Update(Division oDivision);
        IEnumerable<Division> GetAllDivision();
        Division GetById(int division_id);
        IEnumerable<object> DivisionCboList();
        IEnumerable<object> DivisionCboListByCountryId(int country_id);
        void Delete(int division_id);

    }
}
