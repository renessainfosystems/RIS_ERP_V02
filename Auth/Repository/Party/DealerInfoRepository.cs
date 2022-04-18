using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerInfoRepository:IDealerInfoRepository
    {
        protected DealerInfoDataAccess _dealerInfoDataAccess { get; set; }

        //Data access initialize
        public DealerInfoRepository(DealerInfoDataAccess dealerInfoDataAccess)
        {
            _dealerInfoDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetDealerInfoCboList()
        {
            return await _dealerInfoDataAccess.GetDealerInfoCboList();
        }
        public async Task<dynamic> GetAllDealerInfo()
        {
            return await _dealerInfoDataAccess.GetAllDealerInfo();
        }

        public async Task<dynamic> GetAllDealerInfoForVerification()
        {
            return await _dealerInfoDataAccess.GetAllDealerInfoForVerification();
        }
        public async Task<dynamic> GetDealerInfoById(int dealer_info_id)
        {
            return await _dealerInfoDataAccess.GetDealerInfoById(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerInfo(DealerInfo dealerInfo,int dbOperation)
        {
            return await _dealerInfoDataAccess.IUD_DealerInfo(dealerInfo, dbOperation);
        }        
        
    }
}
