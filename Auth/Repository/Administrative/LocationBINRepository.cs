using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class LocationBINRepository:ILocationBINRepository
    {
        private readonly IEntityDataAccess<LocationBIN> _entityDataAccess;
        
        public LocationBINRepository(
            IEntityDataAccess<LocationBIN> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(LocationBIN oLocationBIN)
        {
            _entityDataAccess.Add(oLocationBIN);
           
        }
        public void Update(LocationBIN oLocationBIN)
        {
            _entityDataAccess.Update(oLocationBIN);

        }
        public IEnumerable<LocationBIN> GetAllLocationBIN()
        {
            return  _entityDataAccess.GetAll();
        }

        public LocationBIN GetById(int location_bin_id)
        {
            return _entityDataAccess.GetById(location_bin_id);
        }

        public IEnumerable<object> LocationBINCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.location_bin_id)
                       select new { id = r.location_bin_id, name = r.location_bin_id };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public void Delete(string location_bin_id)
        {
            LocationBIN oLocationBIN = new LocationBIN() { location_bin_id = location_bin_id };
            _entityDataAccess.Remove(oLocationBIN);
        }

    }
}
