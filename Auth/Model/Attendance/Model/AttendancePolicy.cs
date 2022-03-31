using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
    public class AttendancePolicy
	{
    public int attendance_policy_id { get; set; }
	public string code { get; set; }
	public string policy_name { get; set; }
	public string remarks { get; set; }
	public int attendance_calendar_id { get; set; }
	public int late_early_policy_id { get; set; }
	public int absenteeism_policy_id { get; set; }
	public int roster_policy_id { get; set; }
	public bool is_random_dayoff { get; set; }
	public int no_of_random_dayoff { get; set; }
	public bool is_allow_benefit_policy { get; set; }
	public List<AttendancePolicyDayoff> attendance_Policy_Dayoffs { get; set; }
    public List<AttendancePolicyBenefit> attendance_Policy_Benefits { get; set; }
	public List<AttendancePolicyLeave> attendance_Policy_Leaves { get; set; }
	public List<AttendancePolicyShift> attendance_Policy_Shifts { get; set; }
	}

}
