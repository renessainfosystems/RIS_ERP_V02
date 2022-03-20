using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class LateEarlyPolicyDetail
    {
        public int lep_detail_id { get; set; }
        public int late_early_policy_id { get; set; }
        public int late_early_type_id_enum { get; set; }
        public bool is_allow_late_early_slab { get; set; }
        public int min_late_early_min { get; set; }
        public int max_late_early_min { get; set; }
        public  byte late_early_days_for { get; set; }
        public bool is_consecutive { get; set; }
        public bool is_leave_adjustment { get; set; }
        public int leave_in_min { get; set; }
        public bool is_leave_as_late_early_min { get; set; }
        public int salary_head_id { get; set; }
        public int percent_value { get; set; }
        public bool is_gross { get; set; }
        public int primary_salary_head_id { get; set; }
        public int deduction_days { get; set; }
        public bool is_deduction_monthly_min { get; set; }
    }
}
