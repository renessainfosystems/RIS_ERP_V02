using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class RosterPolicyRepository: IRosterPolicyRepository
    {
        protected RosterPolicyDataAccess _rosterPolicyDataAccess { get; set; }

        //Data access initialize
        public RosterPolicyRepository(RosterPolicyDataAccess rosterPolicyDataAccess)
        {
            _rosterPolicyDataAccess = rosterPolicyDataAccess;
        }

        public async Task<dynamic> GetAllRosterPolicy()
        {
            return await _rosterPolicyDataAccess.GetAllRosterPolicy();
        }

      
        public async Task<dynamic> GetRosterPolicyById(int roster_policy_id)
        {
            return await _rosterPolicyDataAccess.GetRosterPolicyById(roster_policy_id);
        }

        public async Task<dynamic> GetRosterDetailsById(int roster_policy_id)
        {
            return await _rosterPolicyDataAccess.GetRosterDetailsById(roster_policy_id);
        }

        public async Task<dynamic> IUD_RosterPolicy(RosterPolicy rosterPolicy, int dbOperation)
        {
            return await _rosterPolicyDataAccess.IUD_RosterPolicy(rosterPolicy, dbOperation);
        }

        public async Task<dynamic> IUD_RosterPolicyDetails(RosterDetails rosterDetails, int dbOperation)
        {
            return await _rosterPolicyDataAccess.IUD_RosterPolicyDetails(rosterDetails, dbOperation);
        }

        public async Task<dynamic> GetAllRosterPolicyForDP()
        {
            return await _rosterPolicyDataAccess.GetAllRosterPolicyForDP();
        }
    }
}
