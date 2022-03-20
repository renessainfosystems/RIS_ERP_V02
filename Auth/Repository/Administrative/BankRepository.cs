using Auth.Model.Administrative.Model;
using DataAccess;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public class BankRepository : IBankRepository
    {
        protected BankDataAccess _bankdataAccess { get; set; }

        //Data access initialize
        public BankRepository(BankDataAccess bankDataAccess)
        {
            _bankdataAccess = bankDataAccess;
        }

        public async Task<dynamic> IUDBank(Bank bank, int dbOperation)
        {
            return await _bankdataAccess.IUDBank(bank, dbOperation);
        }

        public async Task<dynamic> GetBanks()
        {

            return await _bankdataAccess.GetAllAsync();
        }

        public async Task<dynamic> GetBankByBankId(int bank_id)
        {
            return await _bankdataAccess.GetByIdAsync(bank_id);
        }


        public async Task<dynamic> BankCboList()
        {
            return await _bankdataAccess.GetAllBank();
        }

    }
}
