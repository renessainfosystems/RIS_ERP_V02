using Auth.Repository.Attendance;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DBEnumController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IDBEnumRepository _dBEnumRepository;
        public DBEnumController(IDBEnumRepository dBEnumRepository)
        {
            _dBEnumRepository = dBEnumRepository;
        }
        #endregion

        [HttpGet]
        public async Task<dynamic> GetDayOffTypeForDP()
        {

            return await _dBEnumRepository.GetDayOffTypeForDP();

        }
        [HttpGet]
        public async Task<dynamic> GetDayOffAlternativeForDP()
        {

            return await _dBEnumRepository.GetDayOffAlternativeForDP();

        }

        
    }
}
