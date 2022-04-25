using Auth.Model.Party.Model;
using Auth.Repository.Party;
using Auth.Utility.Party.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Auth.Controllers.Party
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DealerAssessmentController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDealerAssessmentRepository _dealerAssessmentRepository;

        public DealerAssessmentController(
            IDealerAssessmentRepository dealerAssessmentRepository
            )
        {
            _dealerAssessmentRepository = dealerAssessmentRepository;
        }

        #endregion

        [HttpPost]
       
        public async Task<dynamic> Create(DealerAssessment dealerAssessment)
        {           
            
            return await _dealerAssessmentRepository.IUD_DealerAssessment(dealerAssessment, (int)GlobalEnumList.DBOperation.Create);
        }
     

        [HttpPost]
        public async Task<dynamic> Update([FromForm] DealerAssessment dealerAssessment)
        {
          
           return await _dealerAssessmentRepository.IUD_DealerAssessment(dealerAssessment, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<dynamic> GetAllDealerAssessment()
        {
            return await _dealerAssessmentRepository.GetAllDealerAssessment();
        }

        [HttpGet]
        public async Task<dynamic> GetAssessmentByDealerId(int dealer_info_id)
        {
            return await _dealerAssessmentRepository.GetAssessmentByDealerId(dealer_info_id);
        }

        [HttpGet]
        public async Task<dynamic> GetAllAssessmentCriteria()
        {
            return await _dealerAssessmentRepository.GetAllAssessmentCriteria();
        }
    }
}
