using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class IndustrySectorRepository:IIndustrySectorRepository
    {
        private readonly IEntityDataAccess<IndustrySector> _entityDataAccess;
        
        public IndustrySectorRepository(
            IEntityDataAccess<IndustrySector> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(IndustrySector oIndustrySector)
        {
            try
            {
                oIndustrySector.industry_sector_id = _entityDataAccess.GetAutoId("Administrative.Industry_Sector", "industry_sector_id");
                _entityDataAccess.Add(oIndustrySector);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_industry_sector_name"))
                    throw new Exception("This industry sector name(" + oIndustrySector.industry_sector_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(IndustrySector oIndustrySector)
        {
            try
            {
                _entityDataAccess.Update(oIndustrySector);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_industry_sector_name"))
                    throw new Exception("This industry sector name(" + oIndustrySector.industry_sector_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<IndustrySector> GetAllIndustrySector()
        {
            return  _entityDataAccess.GetAll();
        }

        public IndustrySector GetById(int industry_sector_id)
        {
            return _entityDataAccess.GetById(industry_sector_id);
        }

        public IEnumerable<object> IndustrySectorCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.industry_sector_id)
                       select new { industry_sector_id = r.industry_sector_id, industry_sector_name = r.industry_sector_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }


        public void Delete(int industry_sector_id)
        {
            IndustrySector oIndustrySector = new IndustrySector() { industry_sector_id = industry_sector_id };
            _entityDataAccess.Remove(oIndustrySector);
        }

    }
}
