
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ILocationBINRepository
    {
        void Add(LocationBIN oLocationBIN);
        void Update(LocationBIN oLocationBIN);
        IEnumerable<LocationBIN> GetAllLocationBIN();
        LocationBIN GetById(int location_bin_id);
        IEnumerable<object> LocationBINCboList();
        void Delete(string location_bin_id);

    }
}
