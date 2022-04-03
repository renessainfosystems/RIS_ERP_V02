using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
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

        public async Task<dynamic> GetAllAttendancePolicy()
        {
            return await _attendancePolicyDataAccess.GetAllAttendancePolicy();
        }

        public async Task<dynamic> IUD_AttendancePolicyDayoff(AttendancePolicyDayoff attendancePolicyDayoff, int dbOperation)
        {
            return await _attendancePolicyDataAccess.IUD_AttendancePolicyDayoff(attendancePolicyDayoff, dbOperation);
        }

        public async Task<dynamic> IUD_AttendancePolicyLeave(AttendancePolicyLeave attendancePolicyLeave, int dbOperation)
        {
            return await _attendancePolicyDataAccess.IUD_AttendancePolicyLeave(attendancePolicyLeave, dbOperation);
        }

        public async Task<dynamic> IUD_AttendancePolicyShift(AttendancePolicyShift attendancePolicyShift, int dbOperation)
        {
            return await _attendancePolicyDataAccess.IUD_AttendancePolicyShift(attendancePolicyShift, dbOperation);
        }

        public async Task<dynamic> IUD_AttendancePolicyBenefit(AttendancePolicyBenefit attendancePolicyBenefit, int dbOperation)
        {
            return await _attendancePolicyDataAccess.IUD_AttendancePolicyBenefit(attendancePolicyBenefit, dbOperation);
        }

        public async Task<dynamic> IUD_AttendancePolicy(AttendancePolicy attendancePolicy, int dbOperation)
        {
            return await _attendancePolicyDataAccess.IUD_AttendancePolicy(attendancePolicy, dbOperation);
        }

        public async Task<dynamic> GetAttendancePolicyCode()
        {
            return await _attendancePolicyDataAccess.GetAttendancePolicyCode();
        }
    }
}
