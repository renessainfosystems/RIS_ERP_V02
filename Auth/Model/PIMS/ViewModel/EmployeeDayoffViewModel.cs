using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using static Auth.Utility.PIMS.Enum.GlobalEnumList;

namespace Auth.Model.PIMS.ViewModel
{
    public class EmployeeDayoffViewModel
    {        
        public EmployeeDayoffViewModel()
        {
            //Constractor
        }
        public long? EmployeeDayoffId { get; set;}
        public string WeekDay { get; set; }
        public bool IsActive { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string DayoffTypeName { get; set; }
        public string DayoffAlternativeName { get; set; }

        public string Activity
        {
            get
            {
                string strActivity = "";
                if (this.IsActive) { strActivity = "Active"; } else { strActivity = "Inactive"; };
                return strActivity;
            }
        }
        public string Details
        {
            get
            {
                return this.WeekDay + "[" + this.DayoffTypeName + "]"+"["+this.DayoffAlternativeName+"]"+"["+this.Activity+"]";
            }
        }

        public static EmployeeDayoffViewModel ConvertToModel(dynamic oEmployeeDayoff)
        {         
            var model = new EmployeeDayoffViewModel();
            model.EmployeeDayoffId = oEmployeeDayoff.employee_dayoff_id ?? 0;
            model.WeekDay = oEmployeeDayoff.week_day ?? "";
            model.IsActive = oEmployeeDayoff.is_active ?? true;
            model.EmployeeCode = oEmployeeDayoff.employee_code ?? "";
            model.EmployeeName = oEmployeeDayoff.employee_name ?? "";
            model.DayoffTypeName = oEmployeeDayoff.dayoff_type_name ?? "";          
            model.DayoffAlternativeName = oEmployeeDayoff.dayoff_alternative_name ?? "";
            return model;
        }

    }
}
