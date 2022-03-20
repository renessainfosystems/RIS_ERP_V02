
using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ICompanyOwnershipTypeRepository
    {
        
        void Add(CompanyOwnershipType oCompanyOwnershipType);
        void Update(CompanyOwnershipType oCompanyOwnershipType);
        IEnumerable<CompanyOwnershipType> GetAllCompanyOwnershipType();
        CompanyOwnershipType GetById(int company_ownership_type_id);
        void Delete(int company_ownership_type_id);

    }
}
