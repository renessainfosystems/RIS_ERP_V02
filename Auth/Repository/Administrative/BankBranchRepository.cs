using Auth.Model.Administrative.Model;
using DataAccess;
using Repository.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public class BankBranchRepository : IBankBranchRepository
    {
        protected BankBranchDataAccess _bankBranchDataAccess { get; set; }

        //Data access initialize
        public BankBranchRepository(BankBranchDataAccess bankBranchDataAccess)
        {
            _bankBranchDataAccess = bankBranchDataAccess;
        }

        public async Task<dynamic> IUDBankBranch(BankBranch bankBranch, int dbOperation)
        {
            return await _bankBranchDataAccess.IUDBankBranch(bankBranch, dbOperation);
        }

        public async Task<IEnumerable<dynamic>> GetAllBankBranchs()
        {

            return await _bankBranchDataAccess.GetAllBankBranchs();
        }
        public async Task<dynamic> GetAllBankBranchByBankBranchId(int bank_branch_id)
        {
            return await _bankBranchDataAccess.GetAllBankBranchByBankBranchId(bank_branch_id);
        }

        public async Task<dynamic> GetAllBankBranchByBankId(int bank_id)
        {
            return await _bankBranchDataAccess.GetAllBankBranchByBankId(bank_id);
        }
        
    }
}
