using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class ShiftFiltering
    {
        public ShiftFiltering()
        {
          
            shift_name = "";
            
            shift_type_id_enum = 0;
            time_zone_id = 0;
            attendance_count = 0;
             is_allow_half_day = false;
            is_night_shift = false;
            is_inactive = false;
            is_allow_OT = false;
            is_allow_benifit = false;
            shift_start = "00:00";
            shift_end = "00:00";
          
        }
        
        public string shift_name { get; set; }
        public int shift_type_id_enum { get; set; }
        public int time_zone_id { get; set; }
        public bool is_allow_half_day { get; set; }
        public bool is_allow_OT { get; set; }
        public bool is_allow_benifit { get; set; }
        public bool is_night_shift { get; set; }
        public bool is_inactive { get; set; }
        public int attendance_count { get; set; }
        public string shift_start { get; set; }
        public string shift_end { get; set; }
        public bool isAdvanceSearch { get; set; }
    }
}
