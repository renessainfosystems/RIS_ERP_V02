using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AbsenteeismPolicyRepository:IAbsenteeismPolicyRepository
    {
        protected AbsenteeismPolicyDataAccess _absenteeismPolicyDataAccess { get; set; }

        //Data access initialize
        public AbsenteeismPolicyRepository(AbsenteeismPolicyDataAccess absenteeismPolicyDataAccess)
        {
            _absenteeismPolicyDataAccess = absenteeismPolicyDataAccess;
        }

        public async Task<dynamic> GetAllAbsenteeismPolicy()
        {
            return await _absenteeismPolicyDataAccess.GetAllAbsenteeismPolicy();
        }

        public async Task<dynamic> GetAbsenteeismPolicyById(int absenteeism_policy_id)
        {
            return await _absenteeismPolicyDataAccess.GetAbsenteeismPolicyById(absenteeism_policy_id);
        }

        public async Task<dynamic> GetAbsenteeismPolicyCode()
        {
            return await _absenteeismPolicyDataAccess.GetAbsenteeismPolicyCode();
        }

        public async Task<dynamic> IUD_Absenteeism_Policy(AbsenteeismPolicy absenteeismPolicy, int dbOperation)
        {
            return await _absenteeismPolicyDataAccess.IUD_Absenteeism_Policy(absenteeismPolicy,dbOperation);
        }

        public async Task<dynamic> GetAllAbsenteeismPolicyForDP()
        {
            return await _absenteeismPolicyDataAccess.GetAllAbsenteeismPolicyForDP();
        }
    }
}
