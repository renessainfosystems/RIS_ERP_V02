using Auth.DataAccess.Payroll;
using Auth.Model.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Payroll
{
    public class SalaryHeadRepository:ISalaryHeadRepository
    {
        protected SalaryHeadDataAccess _salaryHeadDataAccess { get; set; }

        //Data access initialize
        public SalaryHeadRepository(SalaryHeadDataAccess salaryHeadDataAccess)
        {
            _salaryHeadDataAccess = salaryHeadDataAccess;
        }
        public async Task<dynamic> GetAllSalaryHead()
        {
            return await _salaryHeadDataAccess.GetAllSalaryHead();
        }
      
        public async Task<dynamic> IUD_SalaryHead(SalaryHead salaryHead, int dbOperation)
        {
            return await _salaryHeadDataAccess.IUD_SalaryHead(salaryHead, dbOperation);
        }

        public async Task<dynamic> GetSalaryHeadById(int salary_head_id)
        {
            return await _salaryHeadDataAccess.GetSalaryHeadById(salary_head_id);
        }

        public async Task<dynamic> GetSalaryHeadForDP(int salary_head_type_id)
        {
            return await _salaryHeadDataAccess.GetSalaryHeadForDP(salary_head_type_id);
        }
    }
}
