
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IThanaRepository
    {
        void Add(Thana oThana);
        void Update(Thana oThana);
        IEnumerable<Thana> GetAllThana();
        Thana GetById(int thana_id);
        IEnumerable<object> ThanaCboList();
        IEnumerable<object> ThanaCboListByDistrictId(int district_id);
        void Delete(int thana_id);

    }
}
