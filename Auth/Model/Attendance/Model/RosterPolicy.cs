using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class RosterPolicy
    {
        public RosterPolicy()
        {

            roster_policy_id = 0;
            roster_policy_name = "";
            code = "";
            roster_cycle = 0;
            shift_id = 0;
            next_shift_id = 0;

        }
        public int roster_policy_id { get; set; }
        public string roster_policy_name { get; set; }
        public string code { get; set; }
        public int roster_cycle { get; set; }
        public int roster_policy_detail_id { get; set; }
        public int shift_id { get; set; }
        public int next_shift_id { get; set; }
    }
}
