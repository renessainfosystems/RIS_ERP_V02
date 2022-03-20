using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class RetailerContactInfoRepository:IRetailerContactInfoRepository
    {
        protected RetailerContactInfoDataAccess _retailerContactInfoDataAccess { get; set; }

        //Data access initialize
        public RetailerContactInfoRepository(RetailerContactInfoDataAccess retailerInfoDataAccess)
        {
            _retailerContactInfoDataAccess = retailerInfoDataAccess;
        }
        public async Task<dynamic> GetAllRetailerContactInfo()
        {
            return await _retailerContactInfoDataAccess.GetAllRetailerContactInfo();
        }       
        public async Task<dynamic> GetRetailerContactInfoById(int retailer_contact_info_id)
        {
            return await _retailerContactInfoDataAccess.GetRetailerContactInfoById(retailer_contact_info_id);
        }

        public async Task<dynamic> GetContactInfoByRetailerId(int retailer_info_id)
        {
            return await _retailerContactInfoDataAccess.GetContactInfoByRetailerId(retailer_info_id);
        }
        public async Task<dynamic> IUD_RetailerContactInfo(RetailerContactInfo retailerContactInfo,int dbOperation)
        {
            return await _retailerContactInfoDataAccess.IUD_RetailerContactInfo(retailerContactInfo, dbOperation);
        }        
        
    }
}
