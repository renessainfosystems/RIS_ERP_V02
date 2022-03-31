using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerDocumentInfoRepository
    {
        Task<dynamic> GetAllDealerDocumentInfo();
        Task<dynamic> GetDealerDocumentInfoById(int dealer_location_info_id);
        Task<dynamic> GetDocumentInfoByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerDocumentInfo(DealerDocumentInfo dealerDocumentInfo, int dbOperation);

    }
}
