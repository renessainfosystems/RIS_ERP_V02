using Auth.Model.Payroll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Payroll
{
   public interface ISalaryHeadRepository
    {
        Task<dynamic> IUD_SalaryHead(SalaryHead salaryHead, int dbOperation);
        Task<dynamic> GetAllSalaryHead();
        Task<dynamic> GetSalaryHeadById(int salary_head_id);
        Task<dynamic> GetSalaryHeadForDP(int salary_head_type_id);
    }
}
