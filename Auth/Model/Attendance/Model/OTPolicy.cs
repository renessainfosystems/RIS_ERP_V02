using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.Model
{
	public class OTPolicy
	{
		public OTPolicy()
        {
			OT_policy_id = 0;
			policy_name = "";
			code = "";
			minimum_OT_min = 0;
			maximum_OT_min = 0;
			OT_reduce_time_min = 0;
			is_active = true;
			remarks = "";
			
		}
		public int OT_policy_id { get; set; }
		public string policy_name { get; set; }
		public string code { get; set; }
        public int minimum_OT_min { get; set; }
		public int maximum_OT_min { get; set; }
		public int OT_reduce_time_min { get; set; }
		public bool is_active {get;set;}
	    public string remarks { get; set; }
		public List<OTPolicySlab> otPolicySlab { get; set; }
	}

	public class OTPolicySlab
	{
		public OTPolicySlab()
		{
			OT_policy_id = 0;
			OT_policy_slab_id = 0;
		    minimum_OT_min = 0;
			maximum_OT_min = 0;
			acheive_OT_min = 0;
			

		}
		public int OT_policy_slab_id { get; set; }
		public int OT_policy_id { get; set; }
        public int minimum_OT_min { get; set; }
		public int maximum_OT_min { get; set; }
		public int acheive_OT_min { get; set; }
		

	}

}
