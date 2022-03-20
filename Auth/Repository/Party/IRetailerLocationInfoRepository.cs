using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IRetailerLocationInfoRepository
    {
        Task<dynamic> GetAllRetailerLocationInfo();
        Task<dynamic> GetRetailerLocationInfoById(int retailer_location_info_id);
        Task<dynamic> GetLocationInfoByRetailerId(int retailer_info_id);
        Task<dynamic> IUD_RetailerLocationInfo(RetailerLocationInfo retailerLocationInfo, int dbOperation);

    }
}
