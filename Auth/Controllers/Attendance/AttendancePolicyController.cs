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
    public class AttendancePolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAttendancePolicyRepository _attendancePolicyRepository;
        public AttendancePolicyController(IAttendancePolicyRepository attendancePolicyRepository)
        {
            _attendancePolicyRepository = attendancePolicyRepository;
        }
        #endregion


        [HttpGet]
        public async Task<dynamic> GetAttendancePolicyById(int attendance_policy_id)
        {

            return await _attendancePolicyRepository.GetAttendancePolicyById(attendance_policy_id);

        }
    }
}
