using Auth.Model.Administrative.Model;
using System.Collections.Generic;

namespace Auth.Repository.Administrative
{
    public interface ISecurityDepositRepository
    {
        void Add(SecurityDeposit oSecurityDeposit);
        void Update(SecurityDeposit oSecurityDeposit);
        IEnumerable<SecurityDeposit> GetAllSecurityDeposit();
        SecurityDeposit GetById(int security_deposit_id);
        IEnumerable<object> SecurityDepositCboList();
        void Delete(int security_deposit_id);
    }
}
