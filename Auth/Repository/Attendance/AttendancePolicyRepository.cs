using Auth.DataAccess.Attendance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AttendancePolicyRepository:IAttendancePolicyRepository
    {
        protected AttendancePolicyDataAccess _attendancePolicyDataAccess { get; set; }

        //Data access initialize
        public AttendancePolicyRepository(AttendancePolicyDataAccess attendancePolicyDataAccess)
        {
            _attendancePolicyDataAccess = attendancePolicyDataAccess;
        }

        public async Task<dynamic> GetAttendancePolicyById(int attendance_policy_id)
        {
            return await _attendancePolicyDataAccess.GetAttendancePolicyById(attendance_policy_id);
        }
    }
}
