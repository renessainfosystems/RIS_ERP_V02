using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    [Table("Shift_Break_Head", Schema = "Attendance")]
    public class ShiftBreak
    {
        public ShiftBreak()
        {   
            shift_break_head_id = 0;
            head_name = "";
            is_active = true;
        }
        [Key]
        public int shift_break_head_id { get; set; }
        public string head_name { get; set; }
        public bool is_active { get; set; }
        public long created_user_id { get; set; }
        public int company_group_id { get; set; }
        public int company_corporate_id { get; set; }
        public int company_id { get; set; }
    }
}
