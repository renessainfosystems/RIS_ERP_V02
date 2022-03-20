using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Model.Attendance.ViewModel
{
    public class LeaveHeadViewModel
    {
        public int LeaveHeadId { get; set; }
        public string HeadName { get; set; }
        public string LeaveHeadShortName { get; set; }
        public int LeaveTypeIdEnum { get; set; }
        public string LeaveTypeName { get; set; }
        public int RequiredForIdEnum { get; set; }
        public string RequiredFor { get; set; }
        public string NameinLocalLanguage { get; set; }
        public string Remarks { get; set; }

        public static LeaveHeadViewModel ConvertToModel(dynamic leaveHead)
        {
            var model = new LeaveHeadViewModel();
            model.LeaveHeadId = leaveHead.leave_head_id;
            model.HeadName = leaveHead.head_name ?? "";
            model.LeaveHeadShortName = leaveHead.leave_head_short_name ?? "";
            model.LeaveTypeIdEnum = leaveHead.leave_type_id_enum;
            model.LeaveTypeName = EnumDisplay.GetDisplayName((EnumLeaveType)leaveHead.leave_type_id_enum);
            model.RequiredForIdEnum = leaveHead.required_for_id_enum;
            model.RequiredFor = Enum.GetName(typeof(EnumGender), leaveHead.required_for_id_enum);
            model.NameinLocalLanguage = leaveHead.name_in_local_language ?? "";
            model.Remarks = leaveHead.remarks ?? "";

            return model;
        }


    }
    public static class EnumDisplay
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
