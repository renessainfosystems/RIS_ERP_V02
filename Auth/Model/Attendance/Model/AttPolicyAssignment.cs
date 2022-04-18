using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttPolicyAssignment
    {
        public int? attendance_policy_organogram_id { get; set; }
        public int organogram_detail_id { get; set; }
        public int attendance_policy_id { get; set; }
        public bool is_active { get; set; }
    }
}
