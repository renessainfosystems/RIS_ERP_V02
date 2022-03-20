using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Created by Adnan
/// Dated: 22/11/2021
/// </summary>

namespace Auth.Model.Administrative.Model
{
    [Table("Department_Type", Schema = "DBEnum")]
    public class DepartmentType
    {
        [Key]
        public byte department_type_id { get; set; }
        [Required]
        public string functionality_name { get; set; }
        [Required]
        public string department_type_name { get; set; }
    }
}
