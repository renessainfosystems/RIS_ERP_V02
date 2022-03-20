using Auth.DataAccess.Attendance;
using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public class AttendanceCalendarRepository:IAttendanceCalendarRepository
    {
        protected AttendanceCalendarDataAccess _attendanceCalendarDataAccess { get; set; }

        //Data access initialize
        public AttendanceCalendarRepository(AttendanceCalendarDataAccess attendanceCalendarDataAccess)
        {
            _attendanceCalendarDataAccess = attendanceCalendarDataAccess;
        }

        public async Task<dynamic> GetAllAttendanceCalendar()
        {
            return await _attendanceCalendarDataAccess.GetAllAttendanceCalendar();
        }

        public async Task<dynamic> GetAttendanceCalendarById(int attendance_callendar_id)
        {
            return await _attendanceCalendarDataAccess.GetAttendanceCalendarById(attendance_callendar_id);
        }

        public async Task<dynamic> IUD_Attendance_Calendar(AttendanceCalendar attendanceCalendar, int dbOperation = 0)
        {
            return await _attendanceCalendarDataAccess.IUD_AttendanceCalendar(attendanceCalendar,dbOperation);
        }

        public async Task<dynamic> GetAllActiveAttendanceCalendar()
        {
            return await _attendanceCalendarDataAccess.GetAllActiveAttendanceCalendar();
        }
    }
}
