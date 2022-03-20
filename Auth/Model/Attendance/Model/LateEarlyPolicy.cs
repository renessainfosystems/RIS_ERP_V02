using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class LateEarlyPolicy
    {
        public int late_early_policy_id { get; set; }
        public string late_early_policy_name { get; set; }
        public string code { get; set; }
        public string remarks { get; set; }
        public List<LateEarlyPolicyDetail> lateEarlyPolicyDetails { get; set; }
    }
}
