using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAbsenteeismPolicyRepository
    {

        Task<dynamic> GetAllAbsenteeismPolicy();

        Task<dynamic> GetAbsenteeismPolicyById(int absenteeism_policy_id);

        Task<dynamic> GetAbsenteeismPolicyCode();
        Task<dynamic> IUD_Absenteeism_Policy(AbsenteeismPolicy absenteeismPolicy, int dbOperation);
    }
}
