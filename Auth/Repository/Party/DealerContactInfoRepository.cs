using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerContactInfoRepository:IDealerContactInfoRepository
    {
        protected DealerContactInfoDataAccess _dealerContactInfoDataAccess { get; set; }

        //Data access initialize
        public DealerContactInfoRepository(DealerContactInfoDataAccess dealerInfoDataAccess)
        {
            _dealerContactInfoDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetAllDealerContactInfo()
        {
            return await _dealerContactInfoDataAccess.GetAllDealerContactInfo();
        }       
        public async Task<dynamic> GetDealerContactInfoById(int dealer_contact_info_id)
        {
            return await _dealerContactInfoDataAccess.GetDealerContactInfoById(dealer_contact_info_id);
        }

        public async Task<dynamic> GetContactInfoByDealerId(int dealer_info_id)
        {
            return await _dealerContactInfoDataAccess.GetContactInfoByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerContactInfo(DealerContactInfo dealerContactInfo,int dbOperation)
        {
            return await _dealerContactInfoDataAccess.IUD_DealerContactInfo(dealerContactInfo, dbOperation);
        }        
        
    }
}
