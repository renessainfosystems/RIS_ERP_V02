using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class LeavePolicy
    {
        //public LeavePolicy()
        //{
        //    leave_policy_id = 0;
        //    leave_policy_name = "";
        //    code = "";
        //    default_leave_balance_min = 0;
        //    leave_head_id = 0;
        //    default_leave_balance_day = 0;
        //    max_enjoyable_limit_min = 0;
        //    max_carry_leave_limit_min = 0;
        //    attachment_required_for_min = 0;
        //    purpose_required_for_min = 0;
        //    max_carry_year = 0;
        //    area_required_for_min = 0;
        //    responsible_person_required_for_min = 0;
        //    notice_period = 0;
        //    notice_required_for_min = 0;
        //    earn_day_count = 0;
        //    encash_leave_balance_limit_min = 0;
        //    encash_fixed_amount = 0;
        //    salary_head_id = 0;
        //    activation_days = 0;
        //    encash_amount_percent = 0;
        //    is_active = true;
        //    remarks = "";
        //    is_proportionate = false;

        //}
        public int leave_policy_id { get; set; }
        public string? leave_policy_name { get; set; }
        public string? code { get; set; }
        public string? remarks { get; set; }
        public bool? is_proportionate { get; set; }
        public bool? is_active { get; set; }
        public int? leave_head_id { get; set; }
        public decimal? default_leave_balance_day { get; set; }
        public int? default_leave_balance_min { get; set; }
        public int? max_enjoyable_limit_min { get; set; }
        public int? max_carry_leave_limit_min { get; set; }
        public int? max_carry_year { get; set; }
        public bool? is_hourly { get; set; }
        public bool? is_attachment_required { get; set; }
        public int? attachment_required_for_min { get; set; }
        public bool? is_allow_sandwich { get; set; }
        public bool? is_sandwich_dayoff { get; set; }
        public bool? is_sandwich_holiday { get; set; }
        public bool? is_sandwich_uneven { get; set; }
        public bool? is_prefix { get; set; }
        public bool? is_prefix_dayoff { get; set; }
        public bool? is_prefix_holiday { get; set; }
        public bool? is_prefix_uneven { get; set; }
        public bool? is_sufix { get; set; }
        public bool? is_sufix_dayoff { get; set; }
        public bool? is_sufix_holiday { get; set; }
        public bool? is_sufix_uneven { get; set; }
        public bool? is_required_purpose { get; set; }
        public int? purpose_required_for_min { get; set; }
        public bool? is_leave_area_required { get; set; }
        public int? area_required_for_min { get; set; }
        public bool? is_responsible_person_required { get; set; }
        public int? responsible_person_required_for_min { get; set; }
        public bool? is_negetive_balance { get; set; }
        public int? notice_period { get; set; }
        public int? notice_required_for_min { get; set; }
        public int? earn_day_count { get; set; }
        public bool? is_earn_dayoff { get; set; }
        public bool? is_earn_holiday { get; set; }
        public bool? is_earn_uneven { get; set; }
        public bool? is_earn_absent { get; set; }
        public int? encash_leave_balance_limit_min { get; set; }
        public decimal? encash_fixed_amount { get; set; }
        public int? encash_amount_percent { get; set; }
        public bool? is_gross { get; set; }
        public int? salary_head_id { get; set; }
        public int? activation_days { get; set; }
        public bool is_activation_on_joining { get; set; }
        public int? max_negetive_balance_min { get; set; }

    }
}
