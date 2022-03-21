using Auth.Model.Administrative.Model;
using Auth.Model.Administrative.ViewModel;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface IRegistryAuthorityRepository
    {
        void Add(RegistryAuthority oRegistryAuthority);
        void Update(RegistryAuthority oRegistryAuthority);
        IEnumerable<RegistryAuthority> GetAllRegistryAuthority();
        IEnumerable<RegistryAuthorityViewModel> GetAllByRawSql();
        IEnumerable<RegistryAuthorityViewModel> GetByIdRawSql(int registry_authority_id);
        RegistryAuthority GetById(int registry_authority_id);
        IEnumerable<object> RegistryAuthorityCboList();
        void Delete(int registry_authority_id);
    }
}
