using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
	public class AttendanceBenefitPolicy
	{
		public int abp_id { get; set; }
		public string abp_name { get; set; }
		public string code { get; set; }
		public string remarks { get; set; }
		public int benefit_work_on_id_enum { get; set; }
		public int minimum_working_hour_min { get; set; }
		public string time_start { get; set; }
		public string time_end { get; set; }
		public int holiday_id { get; set; }
		public int OT_policy_id { get; set; }
		public int leave_head_id { get; set; }
		public int leave_amount { get; set; }
		public int leave_expire_day { get; set; }
		public int salary_head_id { get; set; }
		public decimal fixed_value { get; set; }
		public int percent_value { get; set; }
		public bool is_gross { get; set; }
        public int basic_salary_head_id { get; set; }
	    public bool is_calculate_per_working_hour {get;set;}
        public bool is_effect_on_payroll { get; set; }
		public bool is_active { get; set; }
	
	}
}
