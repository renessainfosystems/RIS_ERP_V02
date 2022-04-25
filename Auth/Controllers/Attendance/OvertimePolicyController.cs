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
        private IOvertimePolicyRepository _repository;
        public OvertimePolicyController(IOvertimePolicyRepository overtimePolicyRepository)
        {
            _repository = overtimePolicyRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] OTPolicy oTPolicy)

        {
            return await _repository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(OTPolicy oTPolicy)
        {

            return await _repository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(OTPolicy oTPolicy)
        {

            return await _repository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> OTPolicyActivity(int OT_policy_id)
        {
            return await _repository.OTPolicyActivity(OT_policy_id);

        }
        [HttpPost]
        public async Task<dynamic> AddOTSlabForOTUpdate([FromBody] OTPolicySlab oTPolicySlab)

        {
            return await _repository.IUD_OTPolicySlab(oTPolicySlab, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveOTSlabForOTUpdate([FromBody] OTPolicySlab oTPolicySlab)

        {
            return await _repository.IUD_OTPolicySlab(oTPolicySlab, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(OTPolicy oTPolicy)
        {
            return await _repository.IUD_OTPolicy(oTPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllOTPolicy()
        {

            return await _repository.GetAllOTPolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveOTPolicyForDP()
        {

            return await _repository.GetAllActiveOTPolicyForDP();
        }
        [HttpGet]
        public async Task<dynamic> GetActiveOTPolicyById(int OT_policy_id)
        {

            return await _repository.GetActiveOTPolicyById(OT_policy_id);

        }

        [HttpGet]
        public async Task<dynamic> GetOTPolicySlabById(int OT_policy_id)
        {

            return await _repository.GetOTPolicySlabById(OT_policy_id);
          
        }
    


    }
}
