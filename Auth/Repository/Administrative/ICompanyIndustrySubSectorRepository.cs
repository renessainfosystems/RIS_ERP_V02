
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyIndustrySubSectorRepository
    {
        void Add(CompanyIndustrySubSector oCompanyIndustrySubSector);
        void Update(CompanyIndustrySubSector oCompanyIndustrySubSector);
        IEnumerable<CompanyIndustrySubSector> GetAllCompanyIndustrySubSector();
        CompanyIndustrySubSector GetById(int company_industry_sub_sector_id);
        void Delete(int company_industry_sub_sector_id);


    }
}
