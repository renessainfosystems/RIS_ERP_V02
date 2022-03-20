using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Model.Attendance.Model
{
    [Table("Holiday", Schema = "Attendance")]
    public class Holiday
    {
        public Holiday()
        {
            holiday_id = 0;
            holiday_name = "";
            days_of_month = "";
            name_in_local_language = "";
            remarks = "";
        }
        [Key]
        public int holiday_id { get; set; }
        public string holiday_name { get; set; }
        [Required]
        public byte type_of_holiday_id_enum { get; set; }
       
        public string days_of_month { get; set; }

        public string name_in_local_language { get; set; }
        public string remarks { get; set; }
        //public DateTime db_server_date_time { get; set; }
        public long created_user_id { get; set; }
        public int company_group_id { get; set; }
        public int company_corporate_id { get; set; }


    }
}
