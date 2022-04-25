using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class OvertimePolicyRepository:IOvertimePolicyRepository
    {
        protected OvertimePolicyDataAccess _DataAccess { get; set; }

        //Data access initialize
        public OvertimePolicyRepository(OvertimePolicyDataAccess overtimePolicyDataAccess)
        {
            _DataAccess = overtimePolicyDataAccess;
        }
        public async Task<dynamic> GetAllOTPolicy()
        {
            return await _DataAccess.GetAllOTPolicy();
        }
        public async Task<dynamic> GetOTPolicySlabById(int OT_policy_id)
        {
            return await _DataAccess.GetOTPolicySlabById(OT_policy_id);
        }
        public async Task<dynamic> IUD_OTPolicy(OTPolicy oTPolicy,int dbOperation)
        {
            return await _DataAccess.IUD_OTPolicy(oTPolicy,dbOperation);
        }
        public async Task<dynamic> IUD_OTPolicySlab(OTPolicySlab otPolicySlab,int dbOperation)
        {
            return await _DataAccess.IUD_OTPolicySlab(otPolicySlab,dbOperation);
        }

        public async Task<dynamic> OTPolicyActivity(int OT_policy_id)
        {
            return await _DataAccess.OTPolicyActivity(OT_policy_id);
        }

        public async Task<dynamic> GetAllActiveOTPolicyForDP()
        {
            return await _DataAccess.GetAllActiveOTPolicyForDP();
        }

        public async Task<dynamic> GetActiveOTPolicyById(int OT_policy_id)
        {
            return await _DataAccess.GetActiveOTPolicyById(OT_policy_id);
        }
    }
}
