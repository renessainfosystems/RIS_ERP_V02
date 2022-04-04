using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IDBEnumRepository
    {
        Task<dynamic> GetDayOffTypeForDP();
        Task<dynamic> GetDayOffAlternativeForDP();
    }
}
