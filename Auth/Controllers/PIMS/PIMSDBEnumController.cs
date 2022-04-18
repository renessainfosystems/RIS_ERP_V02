using Auth.Repository.PIMS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.PIMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PIMSDBEnumController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IPIMSDBEnumRepository _dBEnumRepository;
        public PIMSDBEnumController(IPIMSDBEnumRepository dBEnumRepository)
        {
            _dBEnumRepository = dBEnumRepository;
        }
        #endregion

        [HttpGet]
        public async Task<dynamic> GetEnumJobDomicile()
        {
            return await _dBEnumRepository.GetObject("DBEnum.Job_Domicile");
        }
        [HttpGet]
        public async Task<dynamic> GetEnumServiceType()
        {
            return await _dBEnumRepository.GetObject("DBEnum.Service_Type");
        }

        [HttpGet]
        public async Task<dynamic> GetEnumConfirmationStatus()
        {
            return await _dBEnumRepository.GetObject("DBEnum.Confirmation_Status");
        }

        [HttpGet]
        public async Task<dynamic> GetEnumWorkAction()
        {
            return await _dBEnumRepository.GetObject("DBEnum.Working_Action");
        }

        [HttpGet]
        public async Task<dynamic> GetEnumJobLocation()
        {
            return await _dBEnumRepository.GetObject("DBEnum.Job_Location");
        }
    }
}
