using Auth.Model.Party.Model;
using Auth.Repository.Party;
using Auth.Utility.Party.Enum;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Auth.Controllers.Party
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DealerVerificationController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerVerificationRepository _dealerVerificationRepository;

        public DealerVerificationController(
            IDealerVerificationRepository dealerVerificationRepository
            )
        {
            _dealerVerificationRepository = dealerVerificationRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create([FromForm] DealerVerification dealerVerification)
        {           
            
            return await _dealerVerificationRepository.IUD_DealerVerification(dealerVerification, (int)GlobalEnumList.DBOperation.Create);
        }     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerVerification dealerVerification)
        {
            
           return await _dealerVerificationRepository.IUD_DealerVerification(dealerVerification, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(int dealer_verification_id)
        {
            DealerVerification oDealerVerification = new DealerVerification();
            oDealerVerification.dealer_verification_id = dealer_verification_id;            
            return await _dealerVerificationRepository.IUD_DealerVerification(oDealerVerification, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> Approve(DealerVerification dealerVerification)
        {

            return await _dealerVerificationRepository.IUD_DealerVerification(dealerVerification, (int)GlobalEnumList.DBOperation.Approve);
        }

        [HttpGet]
        public async Task<dynamic> GetAllDealerVerification()
        {
            return await _dealerVerificationRepository.GetAllDealerVerification();
        }

        [HttpGet]
        public async Task<dynamic> GetDealerVerificationById(int dealer_verification_id)
        {
            return await _dealerVerificationRepository.GetDealerVerificationById(dealer_verification_id);
        }

        [HttpGet]
        public async Task<dynamic> GetDealerVerificationByDealerId(int dealer_info_id)
        {
            return await _dealerVerificationRepository.GetDealerVerificationByDealerId(dealer_info_id);
        }        
    }
}
