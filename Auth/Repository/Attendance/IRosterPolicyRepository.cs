using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IRosterPolicyRepository
    {
        Task<dynamic> GetAllRosterPolicy();
        Task<dynamic> GetRosterPolicyById(int roster_policy_id);
        Task<dynamic> GetRosterDetailsById(int roster_policy_id);
        Task<dynamic> IUD_RosterPolicy(RosterPolicy rosterPolicy, int dbOperation);
        Task<dynamic> IUD_RosterPolicyDetails(RosterPolicy rosterPolicy, int dbOperation);
        Task<dynamic> GetAllRosterPolicyForDP();
    }
}
