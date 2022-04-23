using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeDayoff
    {
        public EmployeeDayoff()
        {
            employee_dayoff_id = 0;
            employee_id = 0;
            week_day = "";
            dayoff_type_id = 0;
            dayoff_alternative_id = 0;
            is_active = true;
        }

        public long? employee_dayoff_id { get; set; }
        public long? employee_id { get; set; }
        public string week_day { get; set; }
        public int? dayoff_type_id { get; set; }
        public int? dayoff_alternative_id { get; set; }
        public bool? is_active { get; set; }
    }
}
