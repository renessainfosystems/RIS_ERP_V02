using Auth.Model.Administrative.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public interface IBankBranchRepository
    {
        Task<IEnumerable<dynamic>> GetAllBankBranchs();
        Task<dynamic> GetAllBankBranchByBankBranchId(int bank_branch_id);
        Task<dynamic> GetAllBankBranchByBankId(int bank_id);  
        Task<dynamic> IUDBankBranch(BankBranch bankBranch, int dbOperation);
    }
}
