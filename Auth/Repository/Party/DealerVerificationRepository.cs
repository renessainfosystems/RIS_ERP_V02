using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerVerificationRepository:IDealerVerificationRepository
    {
        protected DealerVerificationDataAccess _dealerVarificationDataAccess { get; set; }

        //Data access initialize
        public DealerVerificationRepository(DealerVerificationDataAccess dealerInfoDataAccess)
        {
            _dealerVarificationDataAccess = dealerInfoDataAccess;
        }
        public async Task<dynamic> GetAllDealerVerification()
        {
            return await _dealerVarificationDataAccess.GetAllDealerVerification();
        }       
        public async Task<dynamic> GetDealerVerificationById(int dealer_verification_id)
        {
            return await _dealerVarificationDataAccess.GetDealerVerificationById(dealer_verification_id);
        }

        public async Task<dynamic> GetCreditInfoByDealerId(int dealer_info_id)
        {
            return await _dealerVarificationDataAccess.GetCreditInfoByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerVerification(DealerVerification dealerVarification,int dbOperation)
        {
            return await _dealerVarificationDataAccess.IUD_DealerVerification(dealerVarification, dbOperation);
        }        
        
    }
}
