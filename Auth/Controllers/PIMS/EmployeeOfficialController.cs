 
using Auth.Model.PIMS.Model;
using Auth.Repository.PIMS;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Auth.Controllers.PIMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeOfficialController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IEmployeeOfficialRepository _EmployeeOfficialRepository;

        public EmployeeOfficialController(IEmployeeOfficialRepository EmployeeOfficialRepository)
        {
            _EmployeeOfficialRepository = EmployeeOfficialRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromForm] EmployeeOfficial oEmployeeOfficial)
        {
            return await _EmployeeOfficialRepository.IUD_EmployeeOfficial(oEmployeeOfficial, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update([FromForm] EmployeeOfficial oEmployeeOfficial)
        {
            return await _EmployeeOfficialRepository.IUD_EmployeeOfficial(oEmployeeOfficial, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<dynamic> GetEmployeeOfficialById(int nEmployeeId)
        {
            return await _EmployeeOfficialRepository.GetEmployeeOfficialById(nEmployeeId);
        }
   
    }
}
