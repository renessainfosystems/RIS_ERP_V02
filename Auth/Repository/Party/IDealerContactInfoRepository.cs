using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerContactInfoRepository
    {
        Task<dynamic> GetAllDealerContactInfo();
        Task<dynamic> GetDealerContactInfoById(int dealer_contact_info_id);
        Task<dynamic> GetContactInfoByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerContactInfo(DealerContactInfo dealerContactInfo, int dbOperation);

    }
}
