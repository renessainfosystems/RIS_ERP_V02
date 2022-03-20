
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyGroupRepository
    {
        void Add(CompanyGroup oCompanyGroup);
        void Update(CompanyGroup oCompanyGroup);
        IEnumerable<CompanyGroup> GetAllCompanyGroup();
        CompanyGroup GetById(int company_group_id);
        IEnumerable<object> CompanyGroupCboList();
        void Delete(int company_group_id);


    }
}
