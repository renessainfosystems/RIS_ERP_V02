using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class ThanaRepository:IThanaRepository
    {
        private readonly IEntityDataAccess<Thana> _entityDataAccess;
        
        public ThanaRepository(
            IEntityDataAccess<Thana> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Thana oThana)
        {
            try
            {
                oThana.thana_id = _entityDataAccess.GetAutoId("Administrative.Thana", "thana_id");
                _entityDataAccess.Add(oThana);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_thana_code"))
                    throw new Exception("This thana code(" + oThana.thana_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_thana_name"))
                    throw new Exception("This thana name(" + oThana.thana_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_thana_short_name"))
                    throw new Exception("This thana short name(" + oThana.thana_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(Thana oThana)
        {
            try
            {
                _entityDataAccess.Update(oThana);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_thana_code"))
                    throw new Exception("This thana code(" + oThana.thana_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_thana_name"))
                    throw new Exception("This thana name(" + oThana.thana_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_thana_short_name"))
                    throw new Exception("This thana short name(" + oThana.thana_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Thana> GetAllThana()
        {
            return  _entityDataAccess.GetAll();
        }

        public Thana GetById(int thana_id)
        {
            return _entityDataAccess.GetById(thana_id);
        }

        public IEnumerable<object> ThanaCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.thana_id)
                             select new { thana_id = r.thana_id, thana_name = r.thana_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> ThanaCboListByDistrictId(int district_id)
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll(r=>r.district_id == district_id).OrderBy(r => r.thana_id)
                             select new { thana_id = r.thana_id, thana_name = r.thana_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int thana_id)
        {
            Thana oThana = new Thana() { thana_id = thana_id };
            _entityDataAccess.Remove(oThana);
        }
    }
}
