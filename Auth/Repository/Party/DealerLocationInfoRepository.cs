using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerLocationInfoRepository:IDealerLocationInfoRepository
    {
        protected DealerLocationInfoDataAccess _dealerLocationInfoDataAccess { get; set; }

        //Data access initialize
        public DealerLocationInfoRepository(DealerLocationInfoDataAccess dealerInfoDataAccess)
        {
            _dealerLocationInfoDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetAllDealerLocationInfo()
        {
            return await _dealerLocationInfoDataAccess.GetAllDealerLocationInfo();
        }       
        public async Task<dynamic> GetDealerLocationInfoById(int dealer_location_info_id)
        {
            return await _dealerLocationInfoDataAccess.GetDealerLocationInfoById(dealer_location_info_id);
        }

        public async Task<dynamic> GetLocationInfoByDealerId(int dealer_info_id)
        {
            return await _dealerLocationInfoDataAccess.GetLocationInfoByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerLocationInfo(DealerLocationInfo dealerLocationInfo,int dbOperation)
        {
            return await _dealerLocationInfoDataAccess.IUD_DealerLocationInfo(dealerLocationInfo, dbOperation);
        }        
        
    }
}
