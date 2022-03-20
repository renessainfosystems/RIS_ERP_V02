using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IRetailerContactInfoRepository
    {
        Task<dynamic> GetAllRetailerContactInfo();
        Task<dynamic> GetRetailerContactInfoById(int retailer_contact_info_id);
        Task<dynamic> GetContactInfoByRetailerId(int retailer_info_id);
        Task<dynamic> IUD_RetailerContactInfo(RetailerContactInfo retailerContactInfo, int dbOperation);

    }
}
