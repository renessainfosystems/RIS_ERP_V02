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
        public int DepartmentId { get; set; }
        public int EmployeeId { get; set; }
        public static DealerVerificationViewModel ConvertToModel(dynamic dealerCredit)
        {
            var model = new DealerVerificationViewModel();
            model.DealerInfoId = dealerCredit.dealer_info_id ?? 0;
            model.DepartmentId = dealerCredit.department_id ?? 0;
            model.EmployeeId = dealerCredit.employee_id ?? 0;
            return model;
        }
    }     

}


