using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerInfoRepository
    {
        Task<dynamic> GetDealerInfoCboList();
        Task<dynamic> GetAllDealerInfo();
        Task<dynamic> GetDealerInfoById(int dealer_info_id);
        Task<dynamic> IUD_DealerInfo(DealerInfo dealerInfo, int dbOperation);

    }
}
