using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class OrganogramFilter
    {
        public OrganogramFilter()
        {
            company_group_id = 0;
            company_id = 0;
            location_id = 0;
            department_id = 0;
            position_id = 0;
        }
        public int company_group_id { get; set; }
        public int company_id { get; set; }
        public int location_id { get; set; }
        public int department_id { get; set; }
        public int position_id  { get; set; }
    }
}
