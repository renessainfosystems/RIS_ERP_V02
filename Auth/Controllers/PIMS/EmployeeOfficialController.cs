 
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
        private IEmployeeOfficialRepository _repository;

        public EmployeeOfficialController(IEmployeeOfficialRepository employeeOfficialRepository)
        {
            _repository = employeeOfficialRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromForm] EmployeeOfficial oEmployeeOfficial)
        {
            return await _repository.IUD(oEmployeeOfficial, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update([FromForm] EmployeeOfficial oEmployeeOfficial)
        {
            return await _repository.IUD(oEmployeeOfficial, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpGet]
        public async Task<dynamic> Get(int nEmployeeId)
        {
            return await _repository.Get(nEmployeeId);
        }
   
    }
}
