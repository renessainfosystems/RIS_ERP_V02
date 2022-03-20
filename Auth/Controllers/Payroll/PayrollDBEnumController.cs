using Auth.Repository.Payroll;
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
    public class PayrollDBEnumController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IPayrollDBEnumRepository _payrollDBEnumepository;

        public PayrollDBEnumController(IPayrollDBEnumRepository payrollDBEnumepository)
        {
            _payrollDBEnumepository = payrollDBEnumepository;
        }

        #endregion

        [HttpGet]
        public dynamic GetSalaryHeadTypeForDP()
        {
            return _payrollDBEnumepository.GetSalaryHeadTypeForDP();

        }
    }
}
