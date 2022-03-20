using Auth.Model.Payroll;
using Auth.Repository.Payroll;
using Auth.Utility.Payroll.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Payroll
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SalaryHeadController : ControllerBase
    {
        //Intialize
        #region Constructor
        private ISalaryHeadRepository _salaryHeadRepository;
        public SalaryHeadController(ISalaryHeadRepository salaryHeadRepository)
        {
            _salaryHeadRepository = salaryHeadRepository;
        }
        #endregion
        [HttpPost]
        public async Task<dynamic> Create([FromBody] SalaryHead salaryHead)

        {
            return await _salaryHeadRepository.IUD_SalaryHead(salaryHead, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(SalaryHead salaryHead)
        {

            return await _salaryHeadRepository.IUD_SalaryHead(salaryHead, (int)GlobalEnumList.DBOperation.Update);
        }

        [HttpPost]
        public async Task<dynamic> Delete(SalaryHead salaryHead)
        {
            return await _salaryHeadRepository.IUD_SalaryHead(salaryHead, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllSalaryHead()
        {

            return await _salaryHeadRepository.GetAllSalaryHead();
        }

      
        [HttpGet]
        public async Task<dynamic> GetSalaryHeadById(int primary_salary_head_id)
        {

            return await _salaryHeadRepository.GetSalaryHeadById(primary_salary_head_id);
        }
        [HttpGet]
        public async Task<dynamic> GetSalaryHeadForDP(int salary_head_type_id)
        {
            return await _salaryHeadRepository.GetSalaryHeadForDP(salary_head_type_id);
        }
    }
}
