using Auth.Model.Attendance.Model;
using Auth.Repository.Attendance;
using Auth.Utility.Attendance.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AttendanceCalendarSessionController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAttendanceCalendarSessionRepository _attendanceCalendarSessionRepository;

        public AttendanceCalendarSessionController(
            IAttendanceCalendarSessionRepository attendanceCalendarRepository
            )
        {

            _attendanceCalendarSessionRepository = attendanceCalendarRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromBody] AttendanceCalendarSession attendanceCalendarSession)

        {
            return await _attendanceCalendarSessionRepository.IUD_CalendarSession(attendanceCalendarSession, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPut]
        public async Task<dynamic> Update(AttendanceCalendarSession attendanceCalendarSession)
        {

            return await _attendanceCalendarSessionRepository.IUD_CalendarSession(attendanceCalendarSession, (int)GlobalEnumList.DBOperation.Update);
        }
        [HttpPost]
        public async Task<dynamic> AddHolidayForSessionUpdate([FromBody] AttendanceCalendarSessionHoliday attendanceCalendarSessionHoliday)

        {
            return await _attendanceCalendarSessionRepository.IUD_CalendarSessionHoliday(attendanceCalendarSessionHoliday, (int)GlobalEnumList.DBOperation.Create);
        }
        [HttpPost]
        public async Task<dynamic> RemoveHolidayForSessionUpdate([FromBody] AttendanceCalendarSessionHoliday attendanceCalendarSessionHoliday)

        {
            return await _attendanceCalendarSessionRepository.IUD_CalendarSessionHoliday(attendanceCalendarSessionHoliday, (int)GlobalEnumList.DBOperation.Delete);
        }
        [HttpPost]
        public async Task<dynamic> Delete(AttendanceCalendarSession attendanceCalendarSession)
        {
            return await _attendanceCalendarSessionRepository.IUD_CalendarSession(attendanceCalendarSession, (int)GlobalEnumList.DBOperation.Delete);

        }
        
        [HttpPost]
        public async Task<dynamic> CopyCalendarSession(AttendanceCalendarSession attendanceCalendarSession)
        {
            return await _attendanceCalendarSessionRepository.IUD_CalendarSession(attendanceCalendarSession, (int)GlobalEnumList.DBOperation.Copy);

        }

        [HttpGet]
        public async Task<dynamic> GetAllCalendarSessions()
        {

            return await _attendanceCalendarSessionRepository.GetAllCalendarSessions();
        }

        [HttpGet]
        public async Task<dynamic> GetCalendarHolidaySessionById(int acs_id)
        {

            var a= await _attendanceCalendarSessionRepository.GetCalendarHolidaySessionById(acs_id);
            return a;
        }
        [HttpGet]
        public async Task<dynamic> GetAllHolidayByHolidayName(string holiday_name)
        {
         
           return await _attendanceCalendarSessionRepository.GetAllHolidayByName(holiday_name);

           
        }
       
    }
}
