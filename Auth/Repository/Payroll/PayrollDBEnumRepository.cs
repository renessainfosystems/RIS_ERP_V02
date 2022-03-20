using Auth.DataAccess.EntityDataAccess;
using Auth.Model.Payroll;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Payroll
{
    public class PayrollDBEnumRepository: IPayrollDBEnumRepository
    {
        IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
        private readonly IEntityDataAccess<SalaryHeadType> _entityDataAccess;

        public PayrollDBEnumRepository(IEntityDataAccess<SalaryHeadType> entityDataAccess)
        {
            _entityDataAccess = entityDataAccess;

        }
        public IEnumerable<dynamic> GetSalaryHeadTypeForDP()
        {
            return _entityDataAccess.GetAll().ToList();
        }
    }
}
