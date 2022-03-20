using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Payroll
{
    public class SalaryHead
    {
        public int salary_head_id { get; set; }
        public string salary_head_name { get; set; }
        public string salary_head_short_name { get; set; }
        public int salary_head_type_id { get; set; }
        public int sorting_priority { get; set; }
        public string name_in_local_language { get; set; }
        public string remarks { get; set; }
    }
}
