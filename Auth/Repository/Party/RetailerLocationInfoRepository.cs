using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class RetailerLocationInfoRepository:IRetailerLocationInfoRepository
    {
        protected RetailerLocationInfoDataAccess _retailerLocationInfoDataAccess { get; set; }

        //Data access initialize
        public RetailerLocationInfoRepository(RetailerLocationInfoDataAccess retailerInfoDataAccess)
        {
            _retailerLocationInfoDataAccess = retailerInfoDataAccess;
        }
        public async Task<dynamic> GetAllRetailerLocationInfo()
        {
            return await _retailerLocationInfoDataAccess.GetAllRetailerLocationInfo();
        }       
        public async Task<dynamic> GetRetailerLocationInfoById(int retailer_location_info_id)
        {
            return await _retailerLocationInfoDataAccess.GetRetailerLocationInfoById(retailer_location_info_id);
        }
        public async Task<dynamic> GetLocationInfoByRetailerId(int retailer_info_id)
        {
            return await _retailerLocationInfoDataAccess.GetLocationInfoByRetailerId(retailer_info_id);
        }
        public async Task<dynamic> IUD_RetailerLocationInfo(RetailerLocationInfo retailerLocationInfo,int dbOperation)
        {
            return await _retailerLocationInfoDataAccess.IUD_RetailerLocationInfo(retailerLocationInfo, dbOperation);
        }        
        
    }
}
