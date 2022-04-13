using System;

namespace Auth.Model.Party.ViewModel
{
    public class DealerVerificationViewModel
    {
        public DealerVerificationViewModel()
        {
            //Constractor
        }
        public int DealerVerificationId { get; set; }
        public int DealerInfoId { get; set; }
        public int DepartmentId { get; set; }
        public int EmployeeId { get; set; }
        public string Remarks { get; set; }
        public bool IsVarified { get; set; }
        public DateTime VarifiedDate { get; set; }
        public long VarifiedById { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public long CreatedUserInfoId { get; set; }
        public static DealerVerificationViewModel ConvertToModel(dynamic dealerCredit)
        {
            var model = new DealerVerificationViewModel();
            model.DealerVerificationId = dealerCredit.dealer_credit_info_id ?? 0;
            model.DealerInfoId = dealerCredit.dealer_info_id ?? 0;
            model.DepartmentId = dealerCredit.department_id ?? 0;
            model.EmployeeId = dealerCredit.employee_id ?? 0;
            model.Remarks = dealerCredit.remarks ?? "";
            model.IsVarified = dealerCredit.is_varified ?? false;
            return model;
        }
    }     

}


