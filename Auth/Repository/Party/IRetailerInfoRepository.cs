using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IRetailerInfoRepository
    {
        Task<dynamic> GetRetailerInfoCboList();
        Task<dynamic> GetAllRetailerInfo();
        Task<dynamic> GetRetailerInfoById(int retailer_info_id);
        Task<dynamic> IUD_RetailerInfo(RetailerInfo retailerInfo, int dbOperation);

    }
}
