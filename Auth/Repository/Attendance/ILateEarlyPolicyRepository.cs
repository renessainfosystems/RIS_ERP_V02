using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface ILateEarlyPolicyRepository
    {
        Task<dynamic> GetAllLateEarlyPolicy();
        Task<dynamic> GetAllLateEarlyPolicyForDP();
        Task<dynamic> GetLateEarlyPolicyById(int late_early_policy_id);
        Task<dynamic> GetLateEarlyPolicyDetailsById(int late_early_policy_id);
        Task<dynamic> GetLateEarlyPolicyCode();
        Task<dynamic> IUD_LateEarlyPolicy(LateEarlyPolicy lateEarlyPolicy, int dbOperation);
        Task<dynamic> IUD_LateEarlyPolicyDetail(LateEarlyPolicyDetail lateEarlyPolicyDetail, int dbOperation);
    }
}
