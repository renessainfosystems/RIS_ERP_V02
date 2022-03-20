using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Model.Attendance.ViewModel
{
    public class OTPolicyViewModel
    {
		public int OTPolicyId { get; set; }
		public string PolicyName { get; set; }
		public string Code { get; set; }
		public int MinimumOTMin { get; set; }
		public int MaximumOTMin { get; set; }
		public int OTReduceTimeMin { get; set; }
		public bool IsActive { get; set; }
		public string Remarks { get; set; }
        public string ApprovedBy { get; set; }
        public static OTPolicyViewModel ConvertToModel(dynamic OTpolicy)
        {
            var model = new OTPolicyViewModel();
            model.OTPolicyId = OTpolicy.OT_policy_id;
            model.PolicyName = OTpolicy.policy_name ?? "";
            model.Code = OTpolicy.code ?? "";
            model.MinimumOTMin = OTpolicy.minimum_OT_min;
            model.MaximumOTMin = OTpolicy.maximum_OT_min;
            model.OTReduceTimeMin = OTpolicy.OT_reduce_time_min;
            model.Remarks = OTpolicy.remarks ?? "";
            model.ApprovedBy = OTpolicy.approvedBy ?? "";
            model.IsActive = OTpolicy.is_active ?? false;
            return model;
        }

    }
}
