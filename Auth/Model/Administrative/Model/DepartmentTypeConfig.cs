using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Jahiud
/// Dated: 23/11/2021
/// </summary>
namespace Auth.Model.Administrative.Model
{
    [Table("Department_Type_Config", Schema = "Administrative")]
    public class DepartmentTypeConfig
    {
        [Key]
        public int department_type_config_id { get; set; }
        public byte department_functionality_enum_id { get; set; }
        public byte department_type_enum_id { get; set; }
        public string display_name { get; set; }        
        public bool is_active { get; set; }
        public int company_corporate_id { get; set; }
    }
}
