using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerDocumentInfoRepository:IDealerDocumentInfoRepository
    {
        protected DealerDocumentInfoDataAccess _dealerDocumentInfoDataAccess { get; set; }

        //Data access initialize
        public DealerDocumentInfoRepository(DealerDocumentInfoDataAccess dealerInfoDataAccess)
        {
            _dealerDocumentInfoDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetAllDealerDocumentInfo()
        {
            return await _dealerDocumentInfoDataAccess.GetAllDealerDocumentInfo();
        }       
        public async Task<dynamic> GetDealerDocumentInfoById(int dealer_location_info_id)
        {
            return await _dealerDocumentInfoDataAccess.GetDealerDocumentInfoById(dealer_location_info_id);
        }

        public async Task<dynamic> GetDocumentInfoByDealerId(int dealer_info_id)
        {
            return await _dealerDocumentInfoDataAccess.GetDocumentInfoByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerDocumentInfo(DealerDocumentInfo dealerDocumentInfo,int dbOperation)
        {
            return await _dealerDocumentInfoDataAccess.IUD_DealerDocumentInfo(dealerDocumentInfo, dbOperation);
        }        
        
    }
}
