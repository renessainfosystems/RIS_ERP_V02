using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeLeaveLedger
    {
        public EmployeeLeaveLedger()
        {
            employee_leave_ledger_id = 0;
            employee_id = 0;
            leave_policy_id = 0;
            acs_id = 0;
            leave_head_id = 0;
            total_leave_days = 0.0;
            total_leave_min = 0;
            applied_days = 0.0;
            applied_min = 0;
            cancel_days = 0.0;
            cancel_min = 0;
            enjoy_days = 0.0;
            enjoy_min = 0;
            leave_balance_days = 0.0;
            leave_balance_min = 0;
            eligible_leave_days = 0.0;
            eligible_leave_min = 0;
            no_of_carry_year = 0;
            is_active = true;
        }

        public int? employee_leave_ledger_id { get; set; }
        public long? employee_id { get; set; }
        public int? leave_policy_id { get; set; }
        public int? acs_id { get; set; }
        public int? leave_head_id { get; set; }
        public double? total_leave_days { get; set; }
        public int? total_leave_min { get; set; }
        public double? applied_days { get; set; }
        public int? applied_min { get; set; }
        public double? cancel_days { get; set; }
        public int? cancel_min { get; set; }
        public double? enjoy_days { get; set; }
        public int? enjoy_min { get; set; }
        public double? leave_balance_days { get; set; }
        public int? leave_balance_min { get; set; }
        public double? eligible_leave_days { get; set; }
        public int? eligible_leave_min { get; set; }
        public int? no_of_carry_year { get; set; }
        public bool? is_active { get; set; }
    }
}
