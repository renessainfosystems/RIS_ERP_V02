using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Administrative.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Auth.Repository.Administrative
{
    public class CompanyIndustrySubSectorRepository:ICompanyIndustrySubSectorRepository
    {
        private readonly IEntityDataAccess<CompanyIndustrySubSector> _entityDataAccess;
        
        public CompanyIndustrySubSectorRepository(
            IEntityDataAccess<CompanyIndustrySubSector> entityDataAccess
           
            )
        {
            _entityDataAccess = entityDataAccess;         

        }
       
        public void Add(CompanyIndustrySubSector oCompanyIndustrySubSector)
        {
            oCompanyIndustrySubSector.company_industry_sub_sector_id = GetAutoId();
            _entityDataAccess.Add(oCompanyIndustrySubSector);
           
        }
        public void Update(CompanyIndustrySubSector oCompanyIndustrySubSector)
        {
            _entityDataAccess.Update(oCompanyIndustrySubSector);

        }
        public IEnumerable<CompanyIndustrySubSector> GetAllCompanyIndustrySubSector()
        {
            return  _entityDataAccess.GetAll();
        }

        public CompanyIndustrySubSector GetById(int company_industry_sub_sector_id)
        {
            return _entityDataAccess.GetById(company_industry_sub_sector_id);
        }               
        public void Delete(int company_industry_sub_sector_id)
        {
            CompanyIndustrySubSector oCompanyIndustrySubSector = new CompanyIndustrySubSector() { company_industry_sub_sector_id = company_industry_sub_sector_id };
            _entityDataAccess.Remove(oCompanyIndustrySubSector);
        }

        private int GetAutoId()
        {
            try
            {
                int id = 0;
                var idList = _entityDataAccess.GetAll().Select(x => x.company_industry_sub_sector_id).ToList();
                if (idList.Count() != 0)
                {
                    id = idList.Max(x => x + 1);
                }
                else
                {
                    id = 1;
                }
                return id;
            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}
