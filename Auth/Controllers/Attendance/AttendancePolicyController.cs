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

        [HttpGet]
        public async Task<dynamic> GetAttendancePolicyCode()
        {
            return await _attendancePolicyRepository.GetAttendancePolicyCode();

        }

        [HttpPost]
        public async Task<dynamic> Create([FromBody] AttendancePolicy attendancePolicy)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicy(attendancePolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(AttendancePolicy attendancePolicy)
        {

            return await _attendancePolicyRepository.IUD_AttendancePolicy(attendancePolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(AttendancePolicy attendancePolicy)
        {

            return await _attendancePolicyRepository.IUD_AttendancePolicy(attendancePolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Copy(AttendancePolicy attendancePolicy)
        {
            return await _attendancePolicyRepository.IUD_AttendancePolicy(attendancePolicy, (int)GlobalEnumList.DBOperation.Copy);

        }
        [HttpPost]
        public async Task<dynamic> Delete(AttendancePolicy attendancePolicy)
        {
            return await _attendancePolicyRepository.IUD_AttendancePolicy(attendancePolicy, (int)GlobalEnumList.DBOperation.Delete);

        }
        [HttpPost]
        public async Task<dynamic> CreatePolicyBenefit([FromBody] AttendancePolicyBenefit attendancePolicyBenefit)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyBenefit(attendancePolicyBenefit, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> DeletePolicyBenefit([FromBody] AttendancePolicyBenefit attendancePolicyBenefit)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyBenefit(attendancePolicyBenefit, (int)GlobalEnumList.DBOperation.Delete);
        }

        [HttpPost]
        public async Task<dynamic> CreatePolicyDayOff([FromBody] AttendancePolicyDayoff attendancePolicyDayoff)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyDayoff(attendancePolicyDayoff, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> DeletePolicyDayOff([FromBody] AttendancePolicyDayoff attendancePolicyDayoff)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyDayoff(attendancePolicyDayoff, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> CreatePolicyLeave([FromBody] AttendancePolicyLeave attendancePolicyLeave)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyLeave(attendancePolicyLeave, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> DeletePolicyLeave([FromBody] AttendancePolicyLeave attendancePolicyLeave)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyLeave(attendancePolicyLeave, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> CreatePolicyShift([FromBody] AttendancePolicyShift attendancePolicyShift)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyShift(attendancePolicyShift, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> DeletePolicyShift([FromBody] AttendancePolicyShift attendancePolicyShift)

        {
            return await _attendancePolicyRepository.IUD_AttendancePolicyShift(attendancePolicyShift, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpGet]
        public async Task<dynamic> GetAllAttendancePolicy()
        {

            return await _attendancePolicyRepository.GetAllAttendancePolicy();
        }

        [HttpGet]
        public async Task<dynamic> GetAllActiveAttendancePolicy()
        {

            return await _attendancePolicyRepository.GetAllActiveAttendancePolicy();
        }
    }
}
