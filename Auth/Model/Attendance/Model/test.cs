using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class test
    {
      
        public int shift_id { get; set; }
        public string shift_name { get; set; }
        public string code { get; set; }
        public int shift_type_id_enum { get; set; }
        public string remark { get; set; }
        public int time_zone_id { get; set; }
        public bool is_day_crossing { get; set; }
        public int attendance_count { get; set; }
        public DateTime day_start { get; set; }
    }
}
