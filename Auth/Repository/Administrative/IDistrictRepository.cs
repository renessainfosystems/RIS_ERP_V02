
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IDistrictRepository
    {
        void Add(District oDistrict);
        void Update(District oDistrict);
        IEnumerable<District> GetAllDistrict();
        District GetById(int district_id);
        IEnumerable<object> DistrictCboList();
        IEnumerable<object> DistrictCboListByDivisionId(int division_id);
        void Delete(int district_id);
    }
}
