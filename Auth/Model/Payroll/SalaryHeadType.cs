using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Payroll
{
    [Table("Salary_Head_Type", Schema = "DBEnum")]
    public class SalaryHeadType
    {
        [Key]
        public byte salary_head_type_id { get; set; }
        public string salary_head_type_name { get; set; }
    }
}
