using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using static Auth.Utility.Attendance.Enum.GlobalEnumList;

namespace Auth.Model.Attendance.ViewModel
{
    public class AttBenefitPolicyViewModel
    {
        public int AbpId { get; set; }
        public string AbpName { get; set; }
        public int BenefitWorkOnIdEnum { get; set; }
        public int MinimumWorkingHourMin { get; set; }
        public string BenefitTypeName { get; set; }
        public string Benefits { get; set; }
  
        public string ApprovedBy { get; set; }
        public bool IsActive { get; set; }


        public static AttBenefitPolicyViewModel ConvertToModel(dynamic attBenefitPolicy)
        {
            var model = new AttBenefitPolicyViewModel();
            model.AbpId = attBenefitPolicy.abp_id;
            model.AbpName = attBenefitPolicy.abp_name ?? "";
            model.BenefitTypeName = EnumDisplay.GetDisplayName((EnumBenefitTypeOnWork)attBenefitPolicy.benefit_work_on_id_enum);
            model.BenefitWorkOnIdEnum= attBenefitPolicy.benefit_work_on_id_enum;
            model.MinimumWorkingHourMin = attBenefitPolicy.minimum_working_hour_min;
            model.Benefits = attBenefitPolicy.benefit ?? "";
            model.ApprovedBy = attBenefitPolicy.approvedBy ?? "";
            model.IsActive = attBenefitPolicy.is_active ?? false;
            return model;
        }

    }
    public static class BenefitTypeOnWorkDisplay
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            return enumValue.GetType()?
                            .GetMember(enumValue.ToString())?
                            .First()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .Name;
        }
    }
}
