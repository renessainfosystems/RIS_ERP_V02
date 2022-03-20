using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class ShiftInfo
    {
        public ShiftInfo()
        {
            shift_id = 0;
            shift_name = "";
            code = "";
            shift_type_id_enum = 0;
            OT_policy_id = 0;
            is_allow_half_day = false;
            is_day_crossing = false;
            attendance_benefit_policy_id = 0;
            is_OT_before_shift = false;
            is_OT_after_shift = false;
            remark = "";
            day_start = "00:00";
            day_end = "00:00";
            shift_start = "00:00";
            shift_end = "00:00";
            half_shift_start = "00:00";
            half_shift_end = "00:00";
            report_time = "00:00";
            late_tolerance_min = 0;
            extended_time_min = 0;
            early_tolerance_min = 0;
            working_hour_min = 0;
            half_working_hour_min = 0;
            OT_policy_id = 0;
        }
        public int shift_id { get; set; }
        public string shift_name { get; set; }
        public string code { get; set; }
        public int shift_type_id_enum { get; set; }
        public string remark { get; set; }
        public int time_zone_id { get; set; }
        public bool is_day_crossing { get; set; }
        public int attendance_count { get; set; }
        public string day_start { get; set; }
        public string day_end { get; set; }
        public string shift_start { get; set; }
        public string shift_end { get; set; }
        public bool is_allow_half_day { get; set; }
        public string half_shift_start { get; set; }
        public string half_shift_end { get; set; }
        public string report_time { get; set; }
        public int late_tolerance_min { get; set; }
        public int extended_time_min { get; set; }
        public int early_tolerance_min { get; set; }
        public int working_hour_min { get; set; }
        public int half_working_hour_min { get; set; }
        public int OT_policy_id { get; set; }
        public bool is_OT_before_shift { get; set; }
        public bool is_OT_after_shift { get; set; }
        public int attendance_benefit_policy_id { get; set; }
        public List<ShiftBreakDuration> shiftBreakDurations { get; set; }
    }
}
