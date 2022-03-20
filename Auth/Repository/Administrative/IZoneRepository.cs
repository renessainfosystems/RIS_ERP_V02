
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IZoneRepository
    {
        void Add(Zone oZone);
        void Update(Zone oZone);
        IEnumerable<Zone> GetAllZone();
        Zone GetById(int division_id);
        IEnumerable<object> ZoneCboList();
        IEnumerable<object> ZoneCboListByCountryId(int country_id);
        void Delete(int division_id);

    }
}
