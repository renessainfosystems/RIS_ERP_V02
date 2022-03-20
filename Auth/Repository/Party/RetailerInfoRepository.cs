using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class RetailerInfoRepository:IRetailerInfoRepository
    {
        protected RetailerInfoDataAccess _retailerInfoDataAccess { get; set; }

        //Data access initialize
        public RetailerInfoRepository(RetailerInfoDataAccess retailerInfoDataAccess)
        {
            _retailerInfoDataAccess = retailerInfoDataAccess;
        }
        public async Task<dynamic> GetRetailerInfoCboList()
        {
            return await _retailerInfoDataAccess.GetRetailerInfoCboList();
        }
        public async Task<dynamic> GetAllRetailerInfo()
        {
            return await _retailerInfoDataAccess.GetAllRetailerInfo();
        }       
        public async Task<dynamic> GetRetailerInfoById(int retailer_info_id)
        {
            return await _retailerInfoDataAccess.GetRetailerInfoById(retailer_info_id);
        }
        public async Task<dynamic> IUD_RetailerInfo(RetailerInfo retailerInfo,int dbOperation)
        {
            return await _retailerInfoDataAccess.IUD_RetailerInfo(retailerInfo, dbOperation);
        }        
        
    }
}
