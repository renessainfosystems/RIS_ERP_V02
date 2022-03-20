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
    public class LateEarlyPolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ILateEarlyPolicyRepository _lateEarlyPolicyRepository;
        public LateEarlyPolicyController(ILateEarlyPolicyRepository lateEarlyPolicyRepository)
        {
            _lateEarlyPolicyRepository = lateEarlyPolicyRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] LateEarlyPolicy lateEarlyPolicy)

        {
            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicy(lateEarlyPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(LateEarlyPolicy lateEarlyPolicy)
        {

            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicy(lateEarlyPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(LateEarlyPolicy lateEarlyPolicy)
        {

            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicy(lateEarlyPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Delete(LateEarlyPolicy lateEarlyPolicy)
        {
            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicy(lateEarlyPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllLateEarlyPolicy()
        {

            return await _lateEarlyPolicyRepository.GetAllLateEarlyPolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetAllLateEarlyPolicyForDP()
        {

            return await _lateEarlyPolicyRepository.GetAllLateEarlyPolicyForDP();
        }
        [HttpGet]
        public async Task<dynamic> GetLateEarlyPolicyById(int late_early_policy_id)
        {

            return await _lateEarlyPolicyRepository.GetLateEarlyPolicyById(late_early_policy_id);

        }
        [HttpGet]
        public async Task<dynamic> GetLateEarlyPolicyDetailsById(int late_early_policy_id)
        {

            return await _lateEarlyPolicyRepository.GetLateEarlyPolicyDetailsById(late_early_policy_id);

        }
        [HttpGet]
        public async Task<dynamic> GetLateEarlyPolicyCode()
        {

            return await _lateEarlyPolicyRepository.GetLateEarlyPolicyCode();

        }

        [HttpPost]
        public async Task<dynamic> AddLateEarlyDetailsForUpdate([FromBody] LateEarlyPolicyDetail lateEarlyPolicyDetail)

        {
            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicyDetail(lateEarlyPolicyDetail, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveLateEarlyDetailsForUpdate([FromBody] LateEarlyPolicyDetail lateEarlyPolicyDetail)

        {
            return await _lateEarlyPolicyRepository.IUD_LateEarlyPolicyDetail(lateEarlyPolicyDetail, (int)GlobalEnumList.DBOperation.Delete);
        }
    }
}
