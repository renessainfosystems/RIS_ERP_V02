using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Model.PIMS.ViewModel
{
    public class EmployeeBenefitPolicyViewModel
    {        
        public EmployeeBenefitPolicyViewModel()
        {
            //Constractor
        }
        public long? EmployeeBenefitPolicyId { get; set; }
        public long? EmployeeId { get; set; }
        public int? AbpId { get; set; }
        public bool  IsActive { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string AbpName { get; set; }
        public int? BenefitWorkOnIdEnum { get; set; }
        public string Benifit { get; set; }

        //Derived Properties
        public string BenefitTypeName
        {
            get
            {      
                return this.GetDisplayName((EnumBenefitTypeOnWork)this.BenefitWorkOnIdEnum);
            }
        }
        public string Activity
        {
            get
            {
                string strActivity = "";
                if (this.IsActive) { strActivity = "Active"; } else { strActivity = "Inactive"; };
                return strActivity;
            }
        }

        private string GetDisplayName(Enum enumValue)
        {
            return enumValue.GetType()?
                            .GetMember(enumValue.ToString())?
                            .First()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .Name;
        }

        public static EmployeeBenefitPolicyViewModel ConvertToModel(dynamic oEmployeeBenefitPolicy)
        {
            var oModel = new EmployeeBenefitPolicyViewModel();
            oModel.EmployeeBenefitPolicyId = oEmployeeBenefitPolicy.employee_benefit_policy_id ?? 0;
            oModel.EmployeeId = oEmployeeBenefitPolicy.employee_id ?? 0;
            oModel.AbpId = oEmployeeBenefitPolicy.abp_id ?? 0;
            oModel.IsActive = oEmployeeBenefitPolicy.is_active ?? true;
            oModel.StartDate = oEmployeeBenefitPolicy.start_date ?? "";
            oModel.EndDate = oEmployeeBenefitPolicy.end_date ?? "";
            oModel.EmployeeCode = oEmployeeBenefitPolicy.employee_code ?? "";
            oModel.EmployeeName = oEmployeeBenefitPolicy.employee_name ?? "";
            oModel.AbpName = oEmployeeBenefitPolicy.abp_name ?? "";
            oModel.BenefitWorkOnIdEnum = oEmployeeBenefitPolicy.benefit_work_on_id_enum ?? 0;
            oModel.Benifit = oEmployeeBenefitPolicy.benifit ?? "";
            return oModel;
        }

    }
}
