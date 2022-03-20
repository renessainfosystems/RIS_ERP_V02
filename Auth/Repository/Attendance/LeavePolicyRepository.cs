using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class LeavePolicyRepository: ILeavePolicyRepository
    {
        protected LeavePolicyDataAccess _leavePolicyDataAccess { get; set; }

        //Data access initialize
        public LeavePolicyRepository(LeavePolicyDataAccess leavePolicyDataAccess)
        {
            _leavePolicyDataAccess = leavePolicyDataAccess;
        }

        public async Task<dynamic> GetAllLeavePolicy()
        {
            return await _leavePolicyDataAccess.GetAllLeavePolicy();
        }

        public async Task<dynamic> GetLeavePolicyById(int leave_policy_id)
        {
            return await _leavePolicyDataAccess.GetLeavePolicyById(leave_policy_id);
        }

        public async Task<dynamic> GetLeavePolicyCode()
        {
            return await _leavePolicyDataAccess.GetLeavePolicyCode();
        }

        public async Task<dynamic> IUD_Leave_Policy(LeavePolicy leavePolicy, int dbOperation)
        {
            return await _leavePolicyDataAccess.IUD_Leave_Policy(leavePolicy, dbOperation);
        }

        public async Task<dynamic> GetLeavePolicyByName(string policy_or_leave_name)
        {
            return await _leavePolicyDataAccess.GetLeavePolicyByName(policy_or_leave_name);
        }
    }
}
