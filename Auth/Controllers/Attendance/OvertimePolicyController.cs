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
    public class OvertimePolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IOvertimePolicyRepository _overtimePolicyRepository;
        public OvertimePolicyController(IOvertimePolicyRepository overtimePolicyRepository)
        {
            _overtimePolicyRepository = overtimePolicyRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] OTPolicy oTPolicy)

        {
            return await _overtimePolicyRepository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(OTPolicy oTPolicy)
        {

            return await _overtimePolicyRepository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(OTPolicy oTPolicy)
        {

            return await _overtimePolicyRepository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> OTPolicyActivity(int OT_policy_id)
        {
            return await _overtimePolicyRepository.OTPolicyActivity(OT_policy_id);

        }
        [HttpPost]
        public async Task<dynamic> AddOTSlabForOTUpdate([FromBody] OTPolicySlab oTPolicySlab)

        {
            return await _overtimePolicyRepository.IUD_OTPolicySlab(oTPolicySlab, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveOTSlabForOTUpdate([FromBody] OTPolicySlab oTPolicySlab)

        {
            return await _overtimePolicyRepository.IUD_OTPolicySlab(oTPolicySlab, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(OTPolicy oTPolicy)
        {
            return await _overtimePolicyRepository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllOTPolicy()
        {

            return await _overtimePolicyRepository.GetAllOTPolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveOTPolicyForDP()
        {

            return await _overtimePolicyRepository.GetAllActiveOTPolicyForDP();
        }
        [HttpGet]
        public async Task<dynamic> GetActiveOTPolicyById(int OT_policy_id)
        {

            return await _overtimePolicyRepository.GetActiveOTPolicyById(OT_policy_id);

        }

        [HttpGet]
        public async Task<dynamic> GetOTPolicySlabById(int OT_policy_id)
        {

            return await _overtimePolicyRepository.GetOTPolicySlabById(OT_policy_id);
          
        }
    


    }
}
