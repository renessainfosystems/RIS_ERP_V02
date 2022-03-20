using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class DivisionRepository:IDivisionRepository
    {
        private readonly IEntityDataAccess<Division> _entityDataAccess;
        
        public DivisionRepository(
            IEntityDataAccess<Division> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(Division oDivision)
        {
            try
            {
                oDivision.division_id = _entityDataAccess.GetAutoId("Administrative.Division", "division_id");
                _entityDataAccess.Add(oDivision);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_division_code"))
                    throw new Exception("This division code(" + oDivision.division_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_division_name"))
                    throw new Exception("This division name(" + oDivision.division_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_division_short_name"))
                    throw new Exception("This division short name(" + oDivision.division_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(Division oDivision)
        {
            try
            {
                _entityDataAccess.Update(oDivision);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_division_code"))
                    throw new Exception("This division code(" + oDivision.division_code + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_division_name"))
                    throw new Exception("This division name(" + oDivision.division_name + ") is already exists.");
                else if (ex.InnerException.Message.Contains("UC_division_short_name"))
                    throw new Exception("This division short name(" + oDivision.division_short_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<Division> GetAllDivision()
        {
            return  _entityDataAccess.GetAll();
        }

        public Division GetById(int division_id)
        {
            return _entityDataAccess.GetById(division_id);
        }

        public IEnumerable<object> DivisionCboList()
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll().OrderBy(r => r.division_id)
                             select new { division_id = r.division_id, division_name = r.division_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> DivisionCboListByCountryId(int country_id)
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll(r=>r.country_id==country_id).OrderBy(r => r.division_id)
                             select new { division_id = r.division_id, division_name = r.division_name };
                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int division_id)
        {
            Division oDivision = new Division() { division_id = division_id };
            _entityDataAccess.Remove(oDivision);
        }

    }
}
