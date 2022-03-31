using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendancePolicyRepository
    {
        Task<dynamic> GetAttendancePolicyById(int attendance_policy_id);
    }
}
