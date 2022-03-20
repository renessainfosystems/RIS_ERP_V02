
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyRepository
    {
        void Add(Company oCompany);
        void Update(Company oCompany);
        IEnumerable<Company> GetAllCompany();
        Company GetById(int company_id);
        IEnumerable<object> CompanyCboList();
        void Delete(int company_id);
       


    }
}
