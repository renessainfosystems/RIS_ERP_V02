using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Auth.Model.PIMS.Model
{
    public class EmployeeAuthentication
    {
        public EmployeeAuthentication()
        {
            employee_authentication_id = 0;
            employee_id = 0;
            card_no = "";
            is_active = true;
        }

        public int? employee_authentication_id { get; set; }
        public long? employee_id { get; set; }
        public string? card_no { get; set; }
        public bool? is_active { get; set; }
    }
}
