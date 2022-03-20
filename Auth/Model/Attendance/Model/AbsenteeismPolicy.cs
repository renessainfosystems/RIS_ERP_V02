using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AbsenteeismPolicy
    {
		public int absenteeism_policy_id { get; set; }
		public string absenteeism_policy_name { get; set; }
		public string code { get; set; }
		public string remarks { get; set; }
		public bool is_leave_adjustment { get; set; }
		public int salary_head_id { get; set; }
        public int percent_value { get; set; }
		public bool is_gross { get; set; }
		public int basic_salary_head_id { get; set; }
		public bool is_active { get; set; }
	}
}
