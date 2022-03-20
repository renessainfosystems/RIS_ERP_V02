using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IOvertimePolicyRepository
    {
        Task<dynamic> GetAllOTPolicy();
        Task<dynamic> GetAllActiveOTPolicyForDP();
        Task<dynamic> GetActiveOTPolicyById(int OT_policy_id);
        Task<dynamic> GetOTPolicySlabById(int OT_policy_id);
        Task<dynamic> OTPolicyActivity(int OT_policy_id);
        Task<dynamic> IUD_OTPolicy(OTPolicy oTPolicy, int dbOperation);
        Task<dynamic> IUD_OTPolicySlab(OTPolicySlab otPolicySlab, int dbOperation);
    }
}
