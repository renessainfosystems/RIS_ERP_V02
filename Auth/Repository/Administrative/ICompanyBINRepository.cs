
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyBINRepository
    {
        void Add(CompanyBIN oCompanyBIN);
        void Update(CompanyBIN oCompanyBIN);
        IEnumerable<CompanyBIN> GetAllCompanyBIN();
        CompanyBIN GetById(int company_bin_id);
        IEnumerable<object> CompanyBINCboList();
        void Delete(string company_bin_id);

    }
}
