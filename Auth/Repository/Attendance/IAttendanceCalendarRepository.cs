using Auth.Model.Attendance.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Repository.Attendance
{
    public interface IAttendanceCalendarRepository
    {
        Task<dynamic> GetAllAttendanceCalendar();
        Task<dynamic> GetAllActiveAttendanceCalendar();
        Task<dynamic> GetAttendanceCalendarById(int attendance_callendar_id);
        Task<dynamic> IUD_Attendance_Calendar(AttendanceCalendar attendanceCalendar, int dbOperation);

    }
}
