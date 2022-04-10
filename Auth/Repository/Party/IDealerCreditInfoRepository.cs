using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerCreditInfoRepository
    {
        Task<dynamic> GetAllDealerCreditInfo();
        Task<dynamic> GetDealerCreditInfoById(int dealer_credit_info_id);
        Task<dynamic> GetCreditInfoByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerCreditInfo(DealerCreditInfo dealerCreditInfo, int dbOperation);

    }
}
