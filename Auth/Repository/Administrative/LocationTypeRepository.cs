using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class LocationTypeRepository : ILocationTypeRepository
    {
        private readonly IEntityDataAccess<LocationType> _entityDataAccess;

        public LocationTypeRepository(
            IEntityDataAccess<LocationType> entityDataAccess

            )
        {
            _entityDataAccess = entityDataAccess;
        }

        public IEnumerable<LocationType> GetAllLocationType()
        {
            return _entityDataAccess.GetAll();
        }
        public IEnumerable<object> LocationTypeCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.location_type_id)
                             select new { location_type_id = r.location_type_id, location_type_name = r.location_type_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
    }

}
