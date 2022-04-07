using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance.Enum;
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
    public class AttendanceBenefitPolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAttendanceBenefitPolicyRepository _attendanceBenefitPolicyRepository;
        public AttendanceBenefitPolicyController(IAttendanceBenefitPolicyRepository attendanceBenefitPolicyRepository)
        {
            _attendanceBenefitPolicyRepository = attendanceBenefitPolicyRepository;
        }
        #endregion
     

        [HttpPost]
        public async Task<dynamic> Create([FromBody] AttendanceBenefitPolicy attendanceBenefitPolicy)

        {
            return await _attendanceBenefitPolicyRepository.IUD_Attendance_Benefit_Policy(attendanceBenefitPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(AttendanceBenefitPolicy attendanceBenefitPolicy)
        {

            return await _attendanceBenefitPolicyRepository.IUD_Attendance_Benefit_Policy(attendanceBenefitPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(AttendanceBenefitPolicy attendanceBenefitPolicy)
        {

            return await _attendanceBenefitPolicyRepository.IUD_Attendance_Benefit_Policy(attendanceBenefitPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Delete(AttendanceBenefitPolicy attendanceBenefitPolicy)
        {
            return await _attendanceBenefitPolicyRepository.IUD_Attendance_Benefit_Policy(attendanceBenefitPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllAttendanceBenefitPolicy()
        {

            return await _attendanceBenefitPolicyRepository.GetAllAttendanceBenefitPolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetAttendanceBenefitPolicyById(int abp_id)
        {

            return await _attendanceBenefitPolicyRepository.GetAttendanceBenefitPolicyById(abp_id);

        }

        [HttpGet]
        public async Task<dynamic> GetBenefitPolicyCode()
        {

            return await _attendanceBenefitPolicyRepository.GetBenefitPolicyCode();

        }
        [HttpGet]
        public async Task<dynamic> GetAllAttBenefitPolicyForDP()
        {

            return await _attendanceBenefitPolicyRepository.GetAllAttBenefitPolicyForDP();
        }
    }

}