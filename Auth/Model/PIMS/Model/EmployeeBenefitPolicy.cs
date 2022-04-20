using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeBenefitPolicy
    {
        public EmployeeBenefitPolicy()
        {
            employee_benefit_policy_id = 0;
            employee_id = 0;
            abp_id =0;
            is_active = true;
            start_date = DateTime.Now;
            end_date = DateTime.Now;
        }

        public int? employee_benefit_policy_id { get; set; }
        public long? employee_id { get; set; }
        public int? abp_id { get; set; }
        public bool? is_active { get; set; }
        public DateTime? start_date { get; set; }
        public DateTime? end_date { get; set; }
    }
}
