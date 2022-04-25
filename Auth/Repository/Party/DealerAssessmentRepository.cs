using Auth.DataAccess.Party;
using Auth.Model.Party.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Party
{
    public class DealerAssessmentRepository:IDealerAssessmentRepository
    {
        protected DealerAssessmentDataAccess _dealerAssessmentDataAccess { get; set; }

        //Data access initialize
        public DealerAssessmentRepository(DealerAssessmentDataAccess dealerAssessmentDataAccess)
        {
            _dealerAssessmentDataAccess = dealerAssessmentDataAccess;
        }
        public async Task<dynamic> GetAllDealerAssessment()
        {
            return await _dealerAssessmentDataAccess.GetAllDealerAssessmentInfo();
        }       
        
        public async Task<dynamic> GetAssessmentByDealerId(int dealer_info_id)
        {
            return await _dealerAssessmentDataAccess.GetAssessmentByDealerId(dealer_info_id);
        }
        public async Task<dynamic> IUD_DealerAssessment(DealerAssessment dealerAssessment,int dbOperation)
        {
            return await _dealerAssessmentDataAccess.IUDDealerAssessment(dealerAssessment, dbOperation);
        }

        public async Task<dynamic> GetAllAssessmentCriteria(int dealer_info_id)
        {
            return await _dealerAssessmentDataAccess.GetAllAssessmentCriteria(dealer_info_id);
        }
    }
}
