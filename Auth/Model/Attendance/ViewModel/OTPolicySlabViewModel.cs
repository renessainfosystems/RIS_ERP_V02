using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.ViewModel
{
    public class OTPolicySlabViewModel
    {
		//OT Policy Slab
		public int OTPolicySlabId { get; set; }
		public int OTPolicyId { get; set; }
		public int MinimumOTMin { get; set; }
		public int MaximumOTMin { get; set; }
		public int AcheiveOTMin { get; set; }
        public static OTPolicySlabViewModel ConvertToModel(dynamic OTpolicy)
        {
            var model = new OTPolicySlabViewModel();
            model.OTPolicyId = OTpolicy.OT_policy_id;
            model.OTPolicySlabId = OTpolicy.OT_policy_slab_id;
            model.MinimumOTMin = OTpolicy.minimum_OT_min;
            model.MaximumOTMin = OTpolicy.maximum_OT_min;
            model.AcheiveOTMin = OTpolicy.acheive_OT_min;
            return model;
        }
    }
}
