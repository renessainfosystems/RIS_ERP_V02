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
    public class LeavePolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ILeavePolicyRepository _leavePolicyRepository;
        public LeavePolicyController(ILeavePolicyRepository leavePolicyRepository)
        {
            _leavePolicyRepository = leavePolicyRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] LeavePolicy leavePolicy)

        {
            return await _leavePolicyRepository.IUD_Leave_Policy(leavePolicy, (int)GlobalEnumList.DBOperation.Create);
        }

        [HttpPost]
        public async Task<dynamic> Update(LeavePolicy leavePolicy)
        {

            return await _leavePolicyRepository.IUD_Leave_Policy(leavePolicy, (int)GlobalEnumList.DBOperation.Update);
        }
        [HttpPost]
        public async Task<dynamic> Copy(LeavePolicy leavePolicy)
        {
            return await _leavePolicyRepository.IUD_Leave_Policy(leavePolicy, (int)GlobalEnumList.DBOperation.Copy);

        }
        [HttpPost]
        public async Task<dynamic> Approve(LeavePolicy leavePolicy)
        {

            return await _leavePolicyRepository.IUD_Leave_Policy(leavePolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Delete(LeavePolicy leavePolicy)
        {
            return await _leavePolicyRepository.IUD_Leave_Policy(leavePolicy, (int)GlobalEnumList.DBOperation.Delete);

        }
        [HttpGet]
        public async Task<dynamic> GetAllLeavePolicy()
        {

            return await _leavePolicyRepository.GetAllLeavePolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetLeavePolicyByName(string policy_or_leave_name)
        {

            return await _leavePolicyRepository.GetLeavePolicyByName(policy_or_leave_name);
        }
        [HttpGet]
        public async Task<dynamic> GetLeavePolicyById(int leave_policy_id)
        {

            return await _leavePolicyRepository.GetLeavePolicyById(leave_policy_id);

        }

        [HttpGet]
        public async Task<dynamic> GetLeavePolicyCode()
        {
            return await _leavePolicyRepository.GetLeavePolicyCode();

        }
    }
}
