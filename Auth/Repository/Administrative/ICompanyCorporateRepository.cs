
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyCorporateRepository
    {
        void Add(CompanyCorporate oCompanyCorporate);
        void Update(CompanyCorporate oCompanyCorporate);
        IEnumerable<CompanyCorporate> GetAllCompanyCorporate();
        CompanyCorporate GetById(int company_corporate_id);
        IEnumerable<object> CompanyCorporateCboList();
        void Delete(int company_corporate_id);
    }
}
