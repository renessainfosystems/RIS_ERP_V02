using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerCreditInfoRepository:IDealerCreditInfoRepository
    {
        protected DealerCreditInfoDataAccess _dealerCreditInfoDataAccess { get; set; }

        //Data access initialize
        public DealerCreditInfoRepository(DealerCreditInfoDataAccess dealerInfoDataAccess)
        {
            _dealerCreditInfoDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetAllDealerCreditInfo()
        {
            return await _dealerCreditInfoDataAccess.GetAllDealerCreditInfo();
        }       
        public async Task<dynamic> GetDealerCreditInfoById(int dealer_credit_info_id)
        {
            return await _dealerCreditInfoDataAccess.GetDealerCreditInfoById(dealer_credit_info_id);
        }

        public async Task<dynamic> GetCreditInfoByDealerId(int dealer_info_id)
        {
            return await _dealerCreditInfoDataAccess.GetCreditInfoByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerCreditInfo(DealerCreditInfo dealerCreditInfo,int dbOperation)
        {
            return await _dealerCreditInfoDataAccess.IUD_DealerCreditInfo(dealerCreditInfo, dbOperation);
        }        
        
    }
}
