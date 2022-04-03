using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Controllers.Attendance
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GlobalEnumAttendanceController : ControllerBase
    {
        [HttpGet]
        public IActionResult HolidayTypeEnum()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(EnumHolidayType))
               .Cast<EnumHolidayType>()
               .Select(con => new HolidayType
               {
                   type_of_holiday_id_enum = ((int)con),
                   // show display name
                   type_of_holiday_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumUserTypes);
        }


        [HttpGet]
        public IActionResult LeaveTypeEnum()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(EnumLeaveType))
               .Cast<EnumLeaveType>()
               .Select(con => new LeaveType
               {
                   leave_type_id_enum = ((int)con),
                   // show display name
                   leave_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumUserTypes);
        }
        [HttpGet]
        public IActionResult ShiftTypeEnum()
        {
            var oEnumShiftTypes = Enum.GetValues(typeof(EnumShiftType))
               .Cast<EnumShiftType>()
               .Select(con => new ShiftType
               {
                   shift_type_id_enum = ((int)con),
                   // show display name
                   shift_type_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumShiftTypes);
        }
        [HttpGet]
        public IActionResult GenderEnum()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(EnumGender))
               .Cast<EnumGender>()
               .Select(con => new Gender
               {
                   required_for_id_enum = ((int)con),
                   // show display name
                   required_for_enum_name = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumUserTypes);
        }

        [HttpGet]
        public IActionResult EnumBenefitTypeOnWork()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(EnumBenefitTypeOnWork))
               .Cast<EnumBenefitTypeOnWork>()
               .Select(con => new BenefitTypeOnWork
               {
                   benefit_work_on_id_enum = ((int)con),
                   // show display name
                   benefit_work_on_name_enum = con.GetType()
                            .GetMember(con.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()
                            .GetName()

               });
            return Ok(oEnumUserTypes);
        }


        [HttpGet]
        public IActionResult EnumWeekDays()
        {
            var oEnumUserTypes = Enum.GetValues(typeof(Enumweeks_day))
               .Cast<Enumweeks_day>()
               .Select(con => new weeks_day
               {
                   week_day_id = (con.ToString()),
                   // show display name
                   week_day = con.GetType()
                            .GetMember(con.ToString())
                            .First().GetCustomAttribute<DisplayAttribute>().GetName()

               }); 
            return Ok(oEnumUserTypes);
        }
    }
}
