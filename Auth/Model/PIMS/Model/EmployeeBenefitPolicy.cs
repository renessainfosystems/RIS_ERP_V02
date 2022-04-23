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
            start_date = "";
            end_date = "";
        }

        public long? employee_benefit_policy_id { get; set; }
        public long? employee_id { get; set; }
        public int? abp_id { get; set; }
        public bool? is_active { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
    }
}
