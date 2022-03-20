
using Auth.Model.Administrative.Model;
using Auth.Model.DomainModel;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyBusinessNatureRepository
    {
        
        void Add(CompanyBusinessNature oCompanyBusinessNature);
        void Update(CompanyBusinessNature oCompanyBusinessNature);
        IEnumerable<CompanyBusinessNature> GetAllCompanyBusinessNature();
        CompanyBusinessNature GetById(int company_business_nature_id);
        void Delete(int company_business_nature_id);
        IEnumerable<CompanyBusinessNature> GetAllByRawSql();

    }
}
