using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class OvertimePolicyRepository:IOvertimePolicyRepository
    {
        protected OvertimePolicyDataAccess _overtimePolicyDataAccess { get; set; }

        //Data access initialize
        public OvertimePolicyRepository(OvertimePolicyDataAccess overtimePolicyDataAccess)
        {
            _overtimePolicyDataAccess = overtimePolicyDataAccess;
        }
        public async Task<dynamic> GetAllOTPolicy()
        {
            return await _overtimePolicyDataAccess.GetAllOTPolicy();
        }
        public async Task<dynamic> GetOTPolicySlabById(int OT_policy_id)
        {
            return await _overtimePolicyDataAccess.GetOTPolicySlabById(OT_policy_id);
        }
        public async Task<dynamic> IUD_OTPolicy(OTPolicy oTPolicy,int dbOperation)
        {
            return await _overtimePolicyDataAccess.IUD_OTPolicy(oTPolicy,dbOperation);
        }
        public async Task<dynamic> IUD_OTPolicySlab(OTPolicySlab otPolicySlab,int dbOperation)
        {
            return await _overtimePolicyDataAccess.IUD_OTPolicySlab(otPolicySlab,dbOperation);
        }

        public async Task<dynamic> OTPolicyActivity(int OT_policy_id)
        {
            return await _overtimePolicyDataAccess.OTPolicyActivity(OT_policy_id);
        }

        public async Task<dynamic> GetAllActiveOTPolicyForDP()
        {
            return await _overtimePolicyDataAccess.GetAllActiveOTPolicyForDP();
        }

        public async Task<dynamic> GetActiveOTPolicyById(int OT_policy_id)
        {
            return await _overtimePolicyDataAccess.GetActiveOTPolicyById(OT_policy_id);
        }
    }
}
