using Auth.Model.Party.Model;
using System.Threading.Tasks;


namespace Auth.Repository.Party
{
    public interface IDealerAssessmentRepository
    {
        Task<dynamic> GetAllDealerAssessment();
        Task<dynamic> GetAssessmentByDealerId(int dealer_info_id);
        Task<dynamic> IUD_DealerAssessment(DealerAssessment dealerAssessment, int dbOperation);

    }
}
