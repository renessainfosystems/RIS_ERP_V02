using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class LateEarlyPolicyRepository:ILateEarlyPolicyRepository
    {
        protected LateEarlyPolicyDataAccess _lateEarlyPolicyDataAccess { get; set; }

        //Data access initialize
        public LateEarlyPolicyRepository(LateEarlyPolicyDataAccess lateEarlyPolicyDataAccess)
        {
            _lateEarlyPolicyDataAccess = lateEarlyPolicyDataAccess;
        }

        public async Task<dynamic> GetAllLateEarlyPolicy()
        {
            return await _lateEarlyPolicyDataAccess.GetAllLateEarlyPolicy();
        }

        public async Task<dynamic> GetLateEarlyPolicyById(int late_early_policy_id)
        {
            return await _lateEarlyPolicyDataAccess.GetLateEarlyPolicyById(late_early_policy_id);
        }

        public async Task<dynamic> GetLateEarlyPolicyDetailsById(int late_early_policy_id)
        {
            return await _lateEarlyPolicyDataAccess.GetLateEarlyPolicyDetailsById(late_early_policy_id);
        }

        public async Task<dynamic> GetLateEarlyPolicyCode()
        {
            return await _lateEarlyPolicyDataAccess.GetLateEarlyPolicyCode();
        }

        public async Task<dynamic> IUD_LateEarlyPolicy(LateEarlyPolicy lateEarlyPolicy, int dbOperation)
        {
            return await _lateEarlyPolicyDataAccess.IUD_LateEarlyPolicy(lateEarlyPolicy,dbOperation);
        }

        public async Task<dynamic> IUD_LateEarlyPolicyDetail(LateEarlyPolicyDetail lateEarlyPolicyDetail, int dbOperation)
        {
            return await _lateEarlyPolicyDataAccess.IUD_LateEarlyPolicyDetail(lateEarlyPolicyDetail, dbOperation);
        }

        public async Task<dynamic> GetAllLateEarlyPolicyForDP()
        {
            return await _lateEarlyPolicyDataAccess.GetAllLateEarlyPolicyForDP();
        }
    }
}
