using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class LeaveHead
    {
	public int leave_head_id { get; set; }
    public string head_name { get; set; }
    public string leave_head_short_name { get; set; }
    public int leave_type_id_enum { get; set; }
	public int required_for_id_enum { get; set; }
	public string name_in_local_language { get; set; }
	public string remarks { get; set; }
    }
}
