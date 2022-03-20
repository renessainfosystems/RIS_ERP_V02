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
    public class AbsenteeismPolicyController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAbsenteeismPolicyRepository _absenteeismPolicyRepository;
        public AbsenteeismPolicyController(IAbsenteeismPolicyRepository absenteeismPolicyRepository)
        {
            _absenteeismPolicyRepository = absenteeismPolicyRepository;
        }
        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromBody] AbsenteeismPolicy absenteeismPolicy)

        {
            return await _absenteeismPolicyRepository.IUD_Absenteeism_Policy(absenteeismPolicy, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(AbsenteeismPolicy absenteeismPolicy)
        {

            return await _absenteeismPolicyRepository.IUD_Absenteeism_Policy(absenteeismPolicy, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Approve(AbsenteeismPolicy absenteeismPolicy)
        {

            return await _absenteeismPolicyRepository.IUD_Absenteeism_Policy(absenteeismPolicy, (int)GlobalEnumList.DBOperation.Approve);
        }
        [HttpPost]
        public async Task<dynamic> Delete(AbsenteeismPolicy absenteeismPolicy)
        {
            return await _absenteeismPolicyRepository.IUD_Absenteeism_Policy(absenteeismPolicy, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllAbsenteeismPolicy()
        {

            return await _absenteeismPolicyRepository.GetAllAbsenteeismPolicy();
        }
        [HttpGet]
        public async Task<dynamic> GetAbsenteeismPolicyById(int absenteeism_policy_id)
        {

            return await _absenteeismPolicyRepository.GetAbsenteeismPolicyById(absenteeism_policy_id);

        }

        [HttpGet]
        public async Task<dynamic> GetAbsenteeismPolicyCode()
        {

            return await _absenteeismPolicyRepository.GetAbsenteeismPolicyCode();

        }
    }
}
