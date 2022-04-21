using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendancePolicyRepository
    {

        Task<dynamic> GetAllAttendancePolicy();
        Task<dynamic> GetAllActiveAttendancePolicy();
        Task<dynamic> GetAttendancePolicyById(int attendance_policy_id);
        Task<dynamic> IUD_AttendancePolicyDayoff(AttendancePolicyDayoff attendancePolicyDayoff, int dbOperation);
        Task<dynamic> IUD_AttendancePolicyLeave(AttendancePolicyLeave attendancePolicyLeave, int dbOperation);
        Task<dynamic> IUD_AttendancePolicyShift(AttendancePolicyShift attendancePolicyShift, int dbOperation);
        Task<dynamic> IUD_AttendancePolicyBenefit(AttendancePolicyBenefit attendancePolicyBenefit, int dbOperation);
        Task<dynamic> IUD_AttendancePolicy(AttendancePolicy attendancePolicy, int dbOperation);
        Task<dynamic> GetAttendancePolicyCode();
    }
}
