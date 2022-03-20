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
    public class AttendanceCalendarController : ControllerBase
    {
        //Intialize
        #region Constructor
        private IAttendanceCalendarRepository _attendanceCalendarRepository;

        public AttendanceCalendarController(
            IAttendanceCalendarRepository attendanceCalendarRepository
            )
        {

            _attendanceCalendarRepository = attendanceCalendarRepository;
        }

        #endregion

        [HttpPost]
        public async Task<dynamic> Create([FromBody] AttendanceCalendar attendanceCalendar)

        {
            return await _attendanceCalendarRepository.IUD_Attendance_Calendar(attendanceCalendar, (int)GlobalEnumList.DBOperation.Create);
        }


        [HttpPost]
        public async Task<dynamic> Update(AttendanceCalendar attendanceCalendar)
        {

            return await _attendanceCalendarRepository.IUD_Attendance_Calendar(attendanceCalendar, (int)GlobalEnumList.DBOperation.Update);
        }
   
        [HttpPost]
        public async Task<dynamic> Delete(AttendanceCalendar attendanceCalendar)
        {
            return await _attendanceCalendarRepository.IUD_Attendance_Calendar(attendanceCalendar, (int)GlobalEnumList.DBOperation.Delete);

        }

        [HttpGet]
        public async Task<dynamic> GetAllAttendanceCalendar()
        {

            return await _attendanceCalendarRepository.GetAllAttendanceCalendar();
        }

        [HttpGet]
        public async Task<dynamic> GetAttendanceCalendarById(int attendance_callendar_id)
        {

            return await _attendanceCalendarRepository.GetAttendanceCalendarById(attendance_callendar_id);
        }
        [HttpGet]
        public async Task<dynamic> GetAllActiveAttendanceCalendar()
        {

            return await _attendanceCalendarRepository.GetAllActiveAttendanceCalendar();
        }
    
    }
}
