using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Masum
/// Dated: 23/3/2022
/// </summary>

namespace Auth.Model.PIMS.Model
{
    [Table("Employee_Category_Type", Schema = "PIMS")]
    public class EmployeeCategoryType
    {
        [Key]
        public int employee_category_type_id { get; set; }
        public string employee_category_name { get; set; }
        public string remarks { get; set; }
        public long created_user_id { get; set; }       
        public int company_corporate_id { get; set; }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
    }
}
