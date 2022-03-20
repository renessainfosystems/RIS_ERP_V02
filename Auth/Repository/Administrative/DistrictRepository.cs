using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class DistrictRepository:IDistrictRepository
    {
        private readonly IEntityDataAccess<District> _entityDataAccess;
        
        public DistrictRepository(
            IEntityDataAccess<District> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(District oDistrict)
        {
            try
            {
                oDistrict.district_id = _entityDataAccess.GetAutoId("Administrative.District", "district_id");
                _entityDataAccess.Add(oDistrict);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_district_code"))
                    throw new Exception("This district code(" + oDistrict.district_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_district_name"))
                    throw new Exception("This district name(" + oDistrict.district_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_district_short_name"))
                    throw new Exception("This district short name(" + oDistrict.district_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(District oDistrict)
        {
            try
            {
                _entityDataAccess.Update(oDistrict);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_district_code"))
                    throw new Exception("This district code(" + oDistrict.district_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_district_name"))
                    throw new Exception("This district name(" + oDistrict.district_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_district_short_name"))
                    throw new Exception("This district short name(" + oDistrict.district_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<District> GetAllDistrict()
        {
            return  _entityDataAccess.GetAll();
        }

        public District GetById(int district_id)
        {
            return _entityDataAccess.GetById(district_id);
        }

        public IEnumerable<object> DistrictCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.district_id)
                             select new { district_id = r.district_id, district_name = r.district_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
        public IEnumerable<object> DistrictCboListByDivisionId(int division_id)
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll(r=>r.division_id==division_id).OrderBy(r => r.district_id)
                             select new { district_id = r.district_id, district_name = r.district_name };
                return result;
            }
            catch
            {
                return null;
            }
        }
        public void Delete(int district_id)
        {
            District oDistrict = new District() { district_id = district_id };
            _entityDataAccess.Remove(oDistrict);
        }

    }
}
