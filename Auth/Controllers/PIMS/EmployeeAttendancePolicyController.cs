 
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
    public class EmployeeAttendancePolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IEmployeeAttendancePolicyRepository _repository;

        public EmployeeAttendancePolicyController(IEmployeeAttendancePolicyRepository employeeAttendancePolicyRepository)
        {
            _repository = employeeAttendancePolicyRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> CreateUpdate([FromForm] EmployeeAttendancePolicy oEmployeeAttendancePolicy)
        {
            return await _repository.IUD(oEmployeeAttendancePolicy);
        }

        [HttpGet]
        public async Task<dynamic> Get(int nEmployeeId)
        {
            return await _repository.Get(nEmployeeId);
        }
   
    }
}
