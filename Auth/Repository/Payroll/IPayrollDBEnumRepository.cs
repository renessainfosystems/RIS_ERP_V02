using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Payroll
{
    public interface IPayrollDBEnumRepository
    {
        IEnumerable<dynamic> GetSalaryHeadTypeForDP();
    }
}
