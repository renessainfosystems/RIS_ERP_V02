using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerVerificationRepository
    {
        Task<dynamic> GetAllDealerVerification();
        Task<dynamic> GetDealerVerificationById(int dealer_verification_id);
        Task<dynamic> GetCreditInfoByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerVerification(DealerVerification dealerVarification, int dbOperation);

    }
}
