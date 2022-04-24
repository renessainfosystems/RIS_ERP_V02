using System;

namespace Auth.Model.Procurement.ViewModel
{
    public class SupplierVerificationViewModel
    {
        public SupplierVerificationViewModel()
        {
            //Constractor
        }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Mobile { get; set; }
        public string Remarks { get; set; }
        public bool IsVerified { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public long? VerifiedUserId { get; set; }
        public static SupplierVerificationViewModel ConvertToModel(dynamic supplierVerification)
        {
            var model = new SupplierVerificationViewModel();
            model.SupplierId = supplierVerification.supplier_id ?? 0;
            model.SupplierName = supplierVerification.supplier_name ?? "";
            model.DepartmentId = supplierVerification.department_id ?? 0;
            model.DepartmentName = supplierVerification.department_name ?? "";
            model.EmployeeId = supplierVerification.employee_id ?? 0;
            model.EmployeeName = supplierVerification.employee_name ?? "";
            model.Mobile = supplierVerification.mobile ?? "";
            model.Remarks = supplierVerification.remarks ?? "";
            model.IsVerified = supplierVerification.is_verified ?? false;
            model.VerifiedDate = supplierVerification.verified_date;
            model.VerifiedUserId = supplierVerification.verified_user_id;
            return model;
        }
    }
}
