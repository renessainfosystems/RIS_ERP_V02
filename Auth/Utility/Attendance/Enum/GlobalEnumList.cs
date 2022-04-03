using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Utility.Attendance.Enum
{
    public class GlobalEnumList
    {
        #region  ENUM: DBOperation
        public enum DBOperation
        {
            Create = 1,
            Update = 2,
            Delete = 3,
            Approve = 4,
            Copy=5
        }
        #endregion


        #region ENUM: EnumUserType
        public enum EnumHolidayType
        {
            [Display(Name = "Public")]
            Public = 1,
            [Display(Name = "Optional")]
            Optional = 2,
            [Display(Name = "General")]
            General = 3
        }
        public class HolidayType
        {
            public int type_of_holiday_id_enum { get; set; }
            public string type_of_holiday_enum_name { get; set; }
        }
        #endregion

        #region ENUM: EnumLeaveType
        public enum EnumLeaveType
        {
            [Display(Name = "General")]
            General = 1,
            [Display(Name = "Leave Without Pay(LWP)")]
            LeaveWithoutPay = 2,
            [Display(Name = "Earned Leave(EL)")]
            EarnedLeave = 3
        }
        public class LeaveType
        {
            public int leave_type_id_enum { get; set; }
            public string leave_type_enum_name { get; set; }
        }
        #endregion
        #region ENUM: EnumGender
        public enum EnumGender
        {
            [Display(Name = "Male")]
            Male = 1,
            [Display(Name = "Female")]
            Female = 2,
            [Display(Name = "Other")]
            Other = 3,
            [Display(Name = "Both")]
            Both = 4
        }
        public class Gender
        {
            public int required_for_id_enum { get; set; }
            public string required_for_enum_name { get; set; }
        }
        #endregion

        #region ENUM: ShiftType
        public enum EnumShiftType
        {
            [Display(Name = "Fixed Time")]
            Fixed = 1,
            [Display(Name = "Flexible Time")]
            Flexible = 2,
         
        }
        public class ShiftType
        {
            public int shift_type_id_enum { get; set; }
            public string shift_type_enum_name { get; set; }
        }
        #endregion
        #region ENUM: EnumBenefitTypeOnWork
        public enum EnumBenefitTypeOnWork
        {
            [Display(Name = "Time Slot")]
            TimeSlot = 1,
            [Display(Name = "Shift")]
            Shift = 2,
            [Display(Name = "Day Off")]
            DayOff = 3,
            [Display(Name = "Holiday")]
            Holiday = 4,

        }
        public class BenefitTypeOnWork
        {
            public int benefit_work_on_id_enum { get; set; }
            public string benefit_work_on_name_enum { get; set; }
        }
        #endregion


        #region ENUM: EnumLeaveType
        public enum Enumweeks_day
        {
            [Display(Name = "Monday")]
            Monday,
            [Display(Name = "Tuesday")]
            Tuesday,
            [Display(Name = "Wednesday")]
            Wednesday,
            [Display(Name = "Thursday")]
            Thursday,
            [Display(Name = "Friday")]
            Friday,
            [Display(Name = "Saturday")]
            Saturday,
            [Display(Name = "Sunday")]
            Sunday,
            

        }
        public class weeks_day
        {
            public string week_day_id { get; set; }
            public string week_day { get; set; }
        }
        #endregion

    }
}
