using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Auth.Model.PIMS.ViewModel;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeOfficial
    {
        public EmployeeOfficial()
        {
            employee_id = 0;
            organogram_detail_id = 0;
            company_id = 0;
            location_id = 0;
            department_id = 0;
            position_id = 0;
            designation_id = 0;
            job_domicile_id = 0;
            service_type_id = 0;
            confirmation_status_id = 0;
            working_action_id = 0;
            job_location_id = 0;
            date_of_join = "";
            date_of_confirmation = "";
            created_user_id = 0;

        }

        public long? employee_id { get; set; }
        public int? organogram_detail_id { get; set; }
        public int? company_id { get; set; }
        public int? location_id { get; set; }
        public int? department_id { get; set; }
        public int? position_id { get; set; }
        public int? designation_id { get; set; }
        public int? job_domicile_id { get; set; }
        public int? service_type_id { get; set; }
        public int? confirmation_status_id { get; set; }
        public int? working_action_id { get; set; }
        public int? job_location_id { get; set; }
        public string date_of_join { get; set; }
        public string date_of_confirmation { get; set; }
        public int? created_user_id { get; set; }
        public EmployeeAttendancePolicyViewModel EmployeeAttendancePolicyView { get;set;}
    }
}
