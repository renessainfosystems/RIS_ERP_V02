using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerLocationInfoRepository
    {
        Task<dynamic> GetAllDealerLocationInfo();
        Task<dynamic> GetDealerLocationInfoById(int dealer_location_info_id);
        Task<dynamic> GetLocationInfoByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerLocationInfo(DealerLocationInfo dealerLocationInfo, int dbOperation);

    }
}
