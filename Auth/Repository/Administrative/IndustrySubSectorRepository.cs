using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class IndustrySubSectorRepository:IIndustrySubSectorRepository
    {
        private readonly IEntityDataAccess<IndustrySubSector> _entityDataAccess;
        
        public IndustrySubSectorRepository(
            IEntityDataAccess<IndustrySubSector> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(IndustrySubSector oIndustrySubSector)
        {
            try
            {
                oIndustrySubSector.industry_sub_sector_id = _entityDataAccess.GetAutoId("Administrative.Industry_Sub_Sector", "industry_sub_sector_id");
                _entityDataAccess.Add(oIndustrySubSector);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_industry_sub_sector_name"))
                    throw new Exception("This industry sub sector name(" + oIndustrySubSector.industry_sub_sector_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public void Update(IndustrySubSector oIndustrySubSector)
        {
            try
            {
                _entityDataAccess.Update(oIndustrySubSector);
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("UC_industry_sub_sector_name"))
                    throw new Exception("This industry sub sector name(" + oIndustrySubSector.industry_sub_sector_name + ") is already exists.");
                else
                    throw new Exception(ex.Message);
            }

        }
        public IEnumerable<IndustrySubSector> GetAllIndustrySubSector()
        {
            return  _entityDataAccess.GetAll();
        }

        public IndustrySubSector GetById(int industry_sub_sector_id)
        {
            return _entityDataAccess.GetById(industry_sub_sector_id);
        }

        public IEnumerable<object> IndustrySubSectorCboList()
        {
            try
            {
                var result= from r in _entityDataAccess.GetAll().OrderBy(r => r.industry_sub_sector_id)
                       select new { industry_sub_sector_id = r.industry_sub_sector_id, industry_sub_sector_name = r.industry_sub_sector_name };
                return result;
            }
            catch
            {
                return null ;
            }
        }

        public IEnumerable<object> IndustrySubSectorCboListBySectorId(int industry_sector_id)
        {
            try
            {
                var result = from r in _entityDataAccess.GetAll(r => r.industry_sector_id == industry_sector_id).OrderBy(r => r.industry_sub_sector_id)
                             select new { industry_sub_sector_id = r.industry_sub_sector_id, industry_sub_sector_name = r.industry_sub_sector_name };

                return result;
            }
            catch
            {
                return null;
            }
        }

        public void Delete(int industry_sub_sector_id)
        {
            IndustrySubSector oIndustrySubSector = new IndustrySubSector() { industry_sub_sector_id = industry_sub_sector_id };
            _entityDataAccess.Remove(oIndustrySubSector);
        }
    }
}
