using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Model.PIMS.ViewModel
{
    public class EmployeeLeaveLedgerViewModel
    {        
        public EmployeeLeaveLedgerViewModel()
        {
            //Constractor
        }
        public long? EmployeeLeaveLedgerId { get; set; }
        public long? EmployeeId { get; set; }
        public int? LeavePolicyId { get; set; }
        public int? AcsId { get; set; }
        public int? LeaveHeadId { get; set; }
        public decimal? TotalLeaveDays { get; set; }
        public int? TotalLeaveMin { get; set; }
        public decimal? AppliedDays { get; set; }
        public int? AppliedMin { get; set; }
        public decimal? CancelDays { get; set; }
        public int? CancelMin { get; set; }
        public decimal? EnjoyDays { get; set; }
        public int? EnjoyMin { get; set; }
        public decimal? LeaveBalanceDays { get; set; }
        public int? LeaveBalanceMin { get; set; }
        public decimal? EligibleLeaveDays { get; set; }
        public int? EligibleLeaveMin { get; set; }
        public int? NoOfCarryYear { get; set; }
        public bool IsActive { get; set; }
        public string EmployeeCode { get; set; }
        public string LeavePolicyName { get; set; }
        public string LeaveHeadName { get; set; }
        public string LeaveHeadShortName { get; set; }

        //Derived Properties
        public string Activity
        {
            get
            {
                string strActivity = "";
                if (this.IsActive) { strActivity = "Active"; } else { strActivity = "Inactive"; };
                return strActivity;
            }
        }
        public string LeaveHeadWithBalance
        {
            get
            {
                return this.LeaveHeadName + "(" + this.LeaveHeadShortName + ")" + "[" + this.LeaveBalanceDays.ToString() + "]";
            }
        }

        //Mapping object
        public static EmployeeLeaveLedgerViewModel ConvertToModel(dynamic oEmployeeLeaveLedger)
        {
            var oModel = new EmployeeLeaveLedgerViewModel();
            oModel.EmployeeLeaveLedgerId= oEmployeeLeaveLedger.employee_leave_ledger_id ?? 0;
            oModel.EmployeeId = oEmployeeLeaveLedger.employee_id ?? 0;
            oModel.LeavePolicyId = oEmployeeLeaveLedger.leave_policy_id ?? 0;
            oModel.AcsId = oEmployeeLeaveLedger.acs_id ?? 0;
            oModel.LeaveHeadId = oEmployeeLeaveLedger.leave_head_id ?? 0;
            oModel.TotalLeaveDays = oEmployeeLeaveLedger.total_leave_days ?? 0.0;
            oModel.TotalLeaveMin = oEmployeeLeaveLedger.total_leave_min ?? 0;
            oModel.AppliedDays = oEmployeeLeaveLedger.applied_days ?? 0.0;
            oModel.AppliedMin = oEmployeeLeaveLedger.applied_min ?? 0;
            oModel.CancelDays = oEmployeeLeaveLedger.cancel_days ?? 0.0;
            oModel.CancelMin = oEmployeeLeaveLedger.cancel_min ?? 0;
            oModel.EnjoyDays = oEmployeeLeaveLedger.enjoy_days ?? 0.0;
            oModel.EnjoyMin = oEmployeeLeaveLedger.enjoy_min ?? 0;
            oModel.LeaveBalanceDays = oEmployeeLeaveLedger.leave_balance_days ?? 0.0;
            oModel.LeaveBalanceMin = oEmployeeLeaveLedger.leave_balance_min ?? 0;
            oModel.EligibleLeaveDays = oEmployeeLeaveLedger.eligible_leave_days ?? 0.0;
            oModel.EligibleLeaveMin = oEmployeeLeaveLedger.eligible_leave_min ?? 0;
            oModel.NoOfCarryYear = oEmployeeLeaveLedger.no_of_carry_year ?? 0;
            oModel.IsActive = oEmployeeLeaveLedger.is_active ?? true;
            oModel.EmployeeCode = oEmployeeLeaveLedger.employee_code ?? "";
            oModel.LeavePolicyName = oEmployeeLeaveLedger.leave_policy_name ?? "";
            oModel.LeaveHeadName = oEmployeeLeaveLedger.leave_head_name ?? "";
            oModel.LeaveHeadShortName = oEmployeeLeaveLedger.leave_head_short_name ?? "";
            return oModel;
        }

    }
}
