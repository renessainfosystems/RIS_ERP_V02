using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RosterPolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IRosterPolicyRepository _rosterPolicyRepository;
        public RosterPolicyController(IRosterPolicyRepository rosterPolicyRepository)
        {
            _rosterPolicyRepository = rosterPolicyRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] RosterPolicy rosterPolicy)

        {
            return await _rosterPolicyRepository.IUD_RosterPolicy(rosterPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(RosterPolicy rosterPolicy)
        {

            return await _rosterPolicyRepository.IUD_RosterPolicy(rosterPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(RosterPolicy rosterPolicy)
        {

            return await _rosterPolicyRepository.IUD_RosterPolicy(rosterPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
      
        [HttpPost]
        public async Task<dynamic> CreateRosterDetails([FromBody] RosterDetails rosterDetails)

        {
            return await _rosterPolicyRepository.IUD_RosterPolicyDetails(rosterDetails, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> DeleteRosterDetails([FromBody] RosterDetails rosterDetails)

        {
            return await _rosterPolicyRepository.IUD_RosterPolicyDetails(rosterDetails, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(RosterPolicy RosterPolicy)
        {
            return await _rosterPolicyRepository.IUD_RosterPolicy(RosterPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllRosterPolicy()
        {

            return await _rosterPolicyRepository.GetAllRosterPolicy();
        }
        
        [HttpGet]
        public async Task<dynamic> GetAllRosterPolicyForDP()
        {

            return await _rosterPolicyRepository.GetAllRosterPolicyForDP();
        }
        [HttpGet]
        public async Task<dynamic> GetRosterPolicyById(int roster_policy_id)
        {

            return await _rosterPolicyRepository.GetRosterPolicyById(roster_policy_id);

        }

        [HttpGet]
        public async Task<dynamic> GetRosterDetailsById(int roster_policy_id)
        {

            return await _rosterPolicyRepository.GetRosterDetailsById(roster_policy_id);

        }
    }
}
