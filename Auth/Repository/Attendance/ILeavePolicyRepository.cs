using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface ILeavePolicyRepository
    {
        Task<dynamic> GetAllLeavePolicy();
        Task<dynamic> GetLeavePolicyByName(string policy_or_leave_name);
        Task<dynamic> GetLeavePolicyById(int leave_policy_id);
        Task<dynamic> GetLeavePolicyCode();
        Task<dynamic> IUD_Leave_Policy(LeavePolicy leavePolicy, int dbOperation);
    }
}
