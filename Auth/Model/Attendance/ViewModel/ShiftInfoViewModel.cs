using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Model.Attendance.ViewModel
{
    public class ShiftInfoViewModel
    {
        public int ShiftId { get; set; }
        public string ShiftName { get; set; }
        public int ShiftTypeIdEnum { get; set; }
        public string ShiftTypeName { get; set; }
        public string DayTime { get; set; }
        public string ShiftTime { get; set; }
        public string Tollerence { get; set; }
        public string OtherInfo { get; set; }
        public string ApprovedBy { get; set; }
        public bool IsActive { get; set; }


        public static ShiftInfoViewModel ConvertToModel(dynamic shiftInfo)
        {
            var model = new ShiftInfoViewModel();
            model.ShiftId = shiftInfo.shift_id;
            model.ShiftName = shiftInfo.shift_name ?? "";
            model.ShiftTypeName = EnumDisplay.GetDisplayName((EnumShiftType)shiftInfo.shift_type_id_enum);
            model.DayTime = shiftInfo.day_time;
            model.ShiftTime = shiftInfo.shift_time;
            model.Tollerence = shiftInfo.tollerence;
            model.OtherInfo = shiftInfo.OtherInfo ?? "";
            model.ApprovedBy = shiftInfo.approvedBy ?? "";
            model.IsActive = shiftInfo.is_active ?? false;
            return model;
        }

   

    }
    public static class ShiftTypeDisplay
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            return enumValue.GetType()?
                            .GetMember(enumValue.ToString())?
                            .First()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .Name;
        }
    }
}
