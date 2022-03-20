using Auth.Model.Administrative.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Administrative
{
    public interface IBankRepository
    {
        Task<dynamic> GetBanks();
        Task<dynamic> GetBankByBankId(int bank_id);
        Task<dynamic> IUDBank(Bank bank, int dbOperation);
        Task<dynamic> BankCboList();

  
    }
}
