
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ILocationRepository
    {
        void Add(Location oLocation);
        void Update(Location oLocation);
        IEnumerable<Location> GetAllLocation();
        Location GetById(int location_id);
        IEnumerable<object> LocationCboList();
        void Delete(int location_id);


    }
}
