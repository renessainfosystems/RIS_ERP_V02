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
    public class AttendancePolicyAssignmentController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAttendancePolicyAssignmentRepository _attendancePolicyAssignmentRepository;
        public AttendancePolicyAssignmentController(IAttendancePolicyAssignmentRepository attendancePolicyAssignmentRepository)
        {
            _attendancePolicyAssignmentRepository = attendancePolicyAssignmentRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] AttPolicyAssignment attPolicyAssignment)
        {
            return await _attendancePolicyAssignmentRepository.IUD_Attendance_Policy_Assignment( attPolicyAssignment, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update(AttPolicyAssignment attPolicyAssignment)
        {
            return await _attendancePolicyAssignmentRepository.IUD_Attendance_Policy_Assignment(attPolicyAssignment, (int)GlobalEnumList.DBOperation.Update);
        }
      
        [HttpPost]
        public async Task<dynamic> Approve(AttPolicyAssignment attPolicyAssignment)
        {
            return await _attendancePolicyAssignmentRepository.IUD_Attendance_Policy_Assignment(attPolicyAssignment, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Delete(AttPolicyAssignment attPolicyAssignment)
        {
            return await _attendancePolicyAssignmentRepository.IUD_Attendance_Policy_Assignment(attPolicyAssignment, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpGet]
        public async Task<dynamic> GetAllAttPolicyAssignment()
        {

            return await _attendancePolicyAssignmentRepository.GetAllAttendancePolicyOrganogram();
        }
        
        [HttpGet]
        public async Task<dynamic> GetAttendancePolicyOrganogramById(int attendance_policy_organogram_id)
        {
            return await _attendancePolicyAssignmentRepository.GetAttendancePolicyOrganogramById(attendance_policy_organogram_id);
        }

        [HttpGet]
        public async Task<dynamic> GetGroupNameById()
        {
            return await _attendancePolicyAssignmentRepository.GetGroupNameById();
        }

       
    }
}
