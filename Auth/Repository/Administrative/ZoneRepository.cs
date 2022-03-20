using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class ZoneRepository:IZoneRepository
    {
        private readonly IEntityDataAccess<Zone> _entityDataAccess;
        
        public ZoneRepository(
            IEntityDataAccess<Zone> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Zone oZone)
        {
            try
            {
                oZone.zone_id = _entityDataAccess.GetAutoId("Administrative.Zone", "zone_id");
                _entityDataAccess.Add(oZone);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_zone_code"))
                    throw new Exception("This zone code(" + oZone.zone_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_zone_name"))
                    throw new Exception("This zone name(" + oZone.zone_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_zone_short_name"))
                    throw new Exception("This zone short name(" + oZone.zone_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(Zone oZone)
        {
            try
            {
                _entityDataAccess.Update(oZone);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_zone_code"))
                    throw new Exception("This zone code(" + oZone.zone_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_zone_name"))
                    throw new Exception("This zone name(" + oZone.zone_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_zone_short_name"))
                    throw new Exception("This zone short name(" + oZone.zone_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Zone> GetAllZone()
        {
            return  _entityDataAccess.GetAll();
        }

        public Zone GetById(int zone_id)
        {
            return _entityDataAccess.GetById(zone_id);
        }

        public IEnumerable<object> ZoneCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.zone_id)
                             select new { zone_id = r.zone_id, zone_name = r.zone_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> ZoneCboListByCountryId(int country_id)
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll(r=>r.country_id==country_id).OrderBy(r => r.zone_id)
                             select new { zone_id = r.zone_id, zone_name = r.zone_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int zone_id)
        {
            Zone oZone = new Zone() { zone_id = zone_id };
            _entityDataAccess.Remove(oZone);
        }

    }
}
