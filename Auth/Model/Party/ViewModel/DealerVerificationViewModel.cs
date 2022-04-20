using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerVerificationViewModel
    {
        public DealerVerificationViewModel()
        {
            //Constractor
        }
        public int DealerInfoId { get; set; }
        public string DealerInfoName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Mobile { get; set; }
        public string Remarks { get; set; }
        public bool IsVerified { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public long? VerifiedUserId { get; set; }
        public static DealerVerificationViewModel ConvertToModel(dynamic dealerVerification)
        {
            var model = new DealerVerificationViewModel();
            model.DealerInfoId = dealerVerification.dealer_info_id ?? 0;
            model.DealerInfoName = dealerVerification.dealer_name ?? "";
            model.DepartmentId = dealerVerification.department_id ?? 0;
            model.DepartmentName = dealerVerification.department_name ?? "";
            model.EmployeeId = dealerVerification.employee_id ?? 0;
            model.EmployeeName = dealerVerification.employee_name ?? "";
            model.Mobile = dealerVerification.mobile ?? "";
            model.Remarks = dealerVerification.remarks ?? "";
            model.IsVerified = dealerVerification.is_verified ?? false;
            model.VerifiedDate = dealerVerification.verified_date;
            model.VerifiedUserId = dealerVerification.verified_user_id;
            return model;
        }
    }     

}


